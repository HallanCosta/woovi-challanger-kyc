import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Human from '@vladmandic/human'

export type FaceLightLabel = 'Escuro' | 'Boa' | 'Claro'

export type FaceStatus = {
  hasFace: boolean
  confidence?: number
}

export type LightStatus = {
  label: FaceLightLabel
  value: number
}

export type CaptureResult = {
  blob: Blob
  file: File
  previewUrl: string
}

export type UseFaceDetectionOptions = {
  minConfidencePercent?: number
  minBrightnessValue?: number
}

const DEFAULT_RULES = {
  minConfidencePercent: 88,
  minBrightnessValue: 35,
} as const

export function useFaceDetection(options: UseFaceDetectionOptions = {}) {
  const rules = useMemo(() => ({
    minConfidencePercent: options.minConfidencePercent ?? DEFAULT_RULES.minConfidencePercent,
    minBrightnessValue: options.minBrightnessValue ?? DEFAULT_RULES.minBrightnessValue,
  }), [options.minBrightnessValue, options.minConfidencePercent])

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const humanRef = useRef<InstanceType<typeof Human> | null>(null)
  const sampleCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const runningRef = useRef<boolean>(false)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const lastBrightnessRef = useRef<number>(0)
  const lastHasFaceRef = useRef<boolean>(false)
  const lastConfidenceRef = useRef<number | undefined>(undefined)
  const frameCountRef = useRef<number>(0)

  const [isRunning, setIsRunning] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [hasStream, setHasStream] = useState(false)
  const [faceStatus, setFaceStatus] = useState<FaceStatus>({ hasFace: false })
  const [lightStatus, setLightStatus] = useState<LightStatus>({ label: 'Boa', value: 0 })
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  const modelConfig = useMemo(() => ({
    backend: 'webgl',
    modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human/models/',
    face: {
      enabled: true,
      detector: { enabled: true, rotation: true, maxDetected: 1 },
      mesh: { enabled: false },
      iris: { enabled: true },
      emotion: { enabled: false },
      description: { enabled: false },
      antispoof: { enabled: false },
      liveness: { enabled: false },
    },
    body: { enabled: false },
    hand: { enabled: false },
    gesture: { enabled: false },
    object: { enabled: false },
    segmentation: { enabled: false },
  } as const), [])

  const resizeCanvasToVideo = useCallback((canvas: HTMLCanvasElement, video: HTMLVideoElement) => {
    const vw = video.videoWidth || 640
    const vh = video.videoHeight || 480
    if (canvas.width !== vw || canvas.height !== vh) {
      canvas.width = vw
      canvas.height = vh
    }
  }, [])

  const estimateBrightness = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (!sampleCanvasRef.current) {
      sampleCanvasRef.current = document.createElement('canvas')
    }
    const sc = sampleCanvasRef.current
    const targetWidth = 64
    const aspect = video.videoHeight && video.videoWidth ? video.videoHeight / video.videoWidth : 0.75
    sc.width = targetWidth
    sc.height = Math.max(1, Math.round(targetWidth * aspect))
    const ctx = sc.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, sc.width, sc.height)
    const img = ctx.getImageData(0, 0, sc.width, sc.height)
    const data = img.data
    let sum = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const y = 0.2126 * r + 0.7152 * g + 0.0722 * b
      sum += y
    }
    const avg = sum / (sc.width * sc.height)
    lastBrightnessRef.current = avg
    let label: FaceLightLabel = 'Boa'
    if (avg < 50) label = 'Escuro'
    else if (avg > 200) label = 'Claro'
    const rounded = Math.round(avg)
    const changed = label !== lightStatus.label || Math.abs(rounded - lightStatus.value) > 10
    if (changed) setLightStatus({ label, value: rounded })
  }, [lightStatus.label, lightStatus.value])

  const evaluateFaceInsideGuide = useCallback((canvas: HTMLCanvasElement, box?: number[]) => {
    if (!Array.isArray(box) || box.length < 4) return false
    const [bx, by, bw, bh] = box as [number, number, number, number]
    const faceCenterX = bx + bw / 2
    const faceCenterY = by + bh / 2
    const circleCenterX = canvas.width / 2
    const circleCenterY = canvas.height / 2
    const circleRadius = (canvas.width * 0.70) / 2
    const dx = faceCenterX - circleCenterX
    const dy = faceCenterY - circleCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance <= (circleRadius - 6)
  }, [])

  const startDetection = useCallback(async () => {
    if (isRunning) return
    setPhotoUrl(null)

    if (!humanRef.current) {
      const human = new Human(modelConfig)
      humanRef.current = human
      setIsStarting(true)
      await human.load()
      await human.warmup()
    }

    setIsStarting(true)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    mediaStreamRef.current = stream
    video.srcObject = stream
    await video.play()
    setHasStream(true)
    setIsStarting(false)

    const human = humanRef.current!
    resizeCanvasToVideo(canvas, video)
    human.video(video)

    const drawLoop = () => {
      const h = humanRef.current
      const v = videoRef.current
      const c = canvasRef.current
      if (!h || !v || !c) return
      if (!runningRef.current) return

      resizeCanvasToVideo(c, v)
      h.draw.canvas(v, c)
      const interpolated = h.next() as any
      const faces = interpolated?.face as any[] | undefined
      const hasAnyFace = Array.isArray(faces) && faces.length > 0
      let percent: number | undefined
      let centerInside = false
      if (hasAnyFace) {
        const face0: any = faces[0]
        const score = face0?.score ?? face0?.confidence
        if (typeof score === 'number') percent = score <= 1 ? score * 100 : score
        centerInside = evaluateFaceInsideGuide(c, face0?.box)
      }

      let hasFace = (typeof percent === 'number' ? percent >= rules.minConfidencePercent : false) && centerInside
      if (lastBrightnessRef.current < rules.minBrightnessValue) hasFace = false
      lastHasFaceRef.current = hasFace
      if (hasFace !== faceStatus.hasFace || percent !== lastConfidenceRef.current) {
        lastConfidenceRef.current = percent
        setFaceStatus({ hasFace, confidence: percent })
      }

      frameCountRef.current = (frameCountRef.current + 1) % 4
      if (frameCountRef.current === 0) estimateBrightness()

      if (!runningRef.current) return
      rafRef.current = requestAnimationFrame(drawLoop)
    }

    runningRef.current = true
    setIsRunning(true)
    drawLoop()
  }, [estimateBrightness, evaluateFaceInsideGuide, isRunning, modelConfig, resizeCanvasToVideo, rules.minBrightnessValue, rules.minConfidencePercent])

  const stopDetection = useCallback(() => {
    runningRef.current = false
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    const h: any = humanRef.current as any
    if (h && typeof h.video === 'function') h.video(false)
    if (h?.webcam?.stop) h.webcam.stop()

    const currentStream = mediaStreamRef.current
    if (currentStream) currentStream.getTracks().forEach(t => t.stop())
    mediaStreamRef.current = null

    const video = videoRef.current
    if (video) {
      if (typeof video.pause === 'function') video.pause()
      ;(video as any).srcObject = null
      const loadFn = (video as any).load
      if (typeof loadFn === 'function') loadFn.call(video)
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height)

    setIsRunning(false)
    setHasStream(false)
    setIsStarting(false)
    setPhotoUrl(null)
  }, [])

  const capturePhoto = useCallback(async (): Promise<CaptureResult | null> => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !hasStream) return null
    if (!lastHasFaceRef.current) return null
    
    runningRef.current = false
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    resizeCanvasToVideo(canvas, video)
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return resolve(null)
        const file = new File([blob], `selfie-${Date.now()}.jpg`, { type: 'image/jpeg' })
        const previewUrl = URL.createObjectURL(blob)
        setPhotoUrl(previewUrl)
        resolve({ blob, file, previewUrl })
        stopDetection()
      }, 'image/jpeg', 0.95)
    })
  }, [hasStream, resizeCanvasToVideo, stopDetection])

  const clearPhoto = useCallback(() => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoUrl(null)
  }, [photoUrl])

  const retakePhoto = useCallback(async () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoUrl(null)
    setIsStarting(true)
    stopDetection()
    await startDetection()
  }, [photoUrl, startDetection, stopDetection])

  useEffect(() => {
    return () => {
      stopDetection()
    }
  }, [stopDetection])

  return {
    // refs
    videoRef,
    canvasRef,

    // state
    isRunning,
    isStarting,
    hasStream,
    faceStatus,
    lightStatus,
    photoUrl,

    // actions
    startDetection,
    stopDetection,
    capturePhoto,
    clearPhoto,
    retakePhoto,
  }
}


