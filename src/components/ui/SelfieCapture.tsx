import { useRef, useEffect, useState, useMemo } from 'react';
import Human from '@vladmandic/human';
import { Button } from '@/components/ui/Button';
import { Camera, X, CheckCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { Toast, ToastContainer } from '@/components/ui/Toast';

type SelfieCaptureProps = {
  value?: File | null
  onCapture?: (file: File) => void
  onClear: () => void
}

export function SelfieCapture({ value, onCapture, onClear }: SelfieCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const humanRef = useRef<InstanceType<typeof Human> | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [hasStream, setHasStream] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const externalPreviewUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value])
  const [uiFaceStatus, setUiFaceStatus] = useState<{ hasFace: boolean; confidence?: number }>({ hasFace: false });
  const lastConfidenceRef = useRef<number | undefined>(undefined);
  const sampleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCountRef = useRef<number>(0);
  const [uiLightStatus, setUiLightStatus] = useState<{ label: 'Escuro' | 'Boa' | 'Claro'; value: number }>({ label: 'Boa', value: 0 });
  const lastBrightnessRef = useRef<number>(0);
  const lastHasFaceRef = useRef<boolean>(false);
  const { toasts, toast, dismiss } = useToast();

  // Removido o desenho da label no canvas; usamos UI fora do canvas agora

  // Regras de validação para aceitar a selfie (limiares e exigências)
  const FACE_VALIDATION_RULES = {
    minConfidencePercent: 88,  // confiança mínima do detector de rosto
    minBrightnessValue: 35,    // brilho médio mínimo (0..255) para considerar ambiente aceitável
  } as const;

  function resizeCanvasToVideo(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
  }

  // configuração do Human (reusada entre inícios)
  const config = {
      backend: 'webgl',
      modelBasePath: 'https://cdn.jsdelivr.net/npm/@vladmandic/human/models/',
      // configurações vindas do arquivo atual
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
    } as const;

  // inicia detecção sob demanda
  const startDetection = async () => {
    if (isRunning) return;
    // remove prévia anterior
    setPhotoDataUrl(null);
    // cria/garante instância
    if (!humanRef.current) {
      const human = new Human(config);
      humanRef.current = human;
      setIsStarting(true);
      await human.load();
      await human.warmup();
    }

    // webcam
    setIsStarting(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (!videoRef.current || !canvasRef.current) return;
    mediaStreamRef.current = stream;
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
    setHasStream(true);
    setIsStarting(false);

    const human = humanRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    resizeCanvasToVideo(canvas, video);
    human.video(video);

    // cria canvas de amostragem para medir brilho
    if (!sampleCanvasRef.current) {
      sampleCanvasRef.current = document.createElement('canvas');
    }

    const drawLoop = () => {
      if (!humanRef.current || !videoRef.current || !canvasRef.current) return;
      const h = humanRef.current;
      const v = videoRef.current;
      const c = canvasRef.current;

      if (!runningRef.current) return;
      resizeCanvasToVideo(c, v);
      h.draw.canvas(v, c);
      const interpolated = h.next();
      const faces = (interpolated as any).face as any[] | undefined;
      const hasAnyFace = Array.isArray(faces) && faces.length > 0;
      let percent: number | undefined;
      let centerInsideCircle = false;
      if (hasAnyFace) {
        const face0: any = faces?.[0];
        const score = face0?.score ?? face0?.confidence;
        if (typeof score === 'number') percent = score <= 1 ? score * 100 : score;

        // Verifica se o centro do rosto está dentro do círculo de guia (70% da largura, centralizado)
        const box = face0?.box as number[] | undefined;
        if (Array.isArray(box) && box.length >= 4) {
          const [bx, by, bw, bh] = box as [number, number, number, number];
          const faceCenterX = bx + bw / 2;
          const faceCenterY = by + bh / 2;
          const circleCenterX = c.width / 2;
          const circleCenterY = c.height / 2;
          const circleRadius = (c.width * 0.70) / 2; // 70% da largura
          const dx = faceCenterX - circleCenterX;
          const dy = faceCenterY - circleCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          // margem para não encostar na borda
          centerInsideCircle = distance <= (circleRadius - 6);
        }
      }
      // Only consider a valid detection above thresholds and inside the guide circle
      let hasFace = (typeof percent === 'number' ? percent >= FACE_VALIDATION_RULES.minConfidencePercent : false) && centerInsideCircle;
      // Se ambiente muito escuro, invalida detecção
      if (lastBrightnessRef.current < FACE_VALIDATION_RULES.minBrightnessValue) hasFace = false;
      lastHasFaceRef.current = hasFace;
      if (hasFace !== uiFaceStatus.hasFace || percent !== lastConfidenceRef.current) {
        lastConfidenceRef.current = percent;
        setUiFaceStatus({ hasFace, confidence: percent });
      }

      // estimativa de brilho a cada 4 frames para reduzir custo
      frameCountRef.current = (frameCountRef.current + 1) % 4;
      if (frameCountRef.current === 0 && sampleCanvasRef.current && videoRef.current) {
        const sc = sampleCanvasRef.current;
        const targetWidth = 64;
        const aspect = videoRef.current.videoHeight && videoRef.current.videoWidth ? videoRef.current.videoHeight / videoRef.current.videoWidth : (canvas.height / Math.max(1, canvas.width));
        sc.width = targetWidth;
        sc.height = Math.max(1, Math.round(targetWidth * aspect));
        const sctx = sc.getContext('2d');
        if (sctx) {
          sctx.drawImage(videoRef.current, 0, 0, sc.width, sc.height);
          const img = sctx.getImageData(0, 0, sc.width, sc.height);
          const data = img.data;
          let sum = 0;
          for (let i = 0; i < data.length; i += 4) {
            // luminância perceptual
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            sum += y;
          }
          const avg = sum / (sc.width * sc.height);
          lastBrightnessRef.current = avg;
          // thresholds simples (Escuro < 50)
          let label: 'Escuro' | 'Boa' | 'Claro' = 'Boa';
          if (avg < 50) label = 'Escuro';
          else if (avg > 200) label = 'Claro';
          // atualiza somente se mudar muito
          if (label !== uiLightStatus.label || Math.abs(avg - uiLightStatus.value) > 10) {
            setUiLightStatus({ label, value: Math.round(avg) });
          }
        }
      }
      if (!runningRef.current) return;
      rafRef.current = requestAnimationFrame(drawLoop);
    };

    runningRef.current = true;
    setIsRunning(true);
    drawLoop();
  };

  // para/cancela detecção e webcam
  const stopDetection = () => {
    // sinaliza parada
    runningRef.current = false;

    // cancela RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // tenta parar loop interno do Human
    try {
      const h: any = humanRef.current as any;
      if (h && typeof h.video === 'function') h.video(false);
      if (h?.webcam?.stop) h.webcam.stop();
    } catch {}

    // para todas as tracks (armazenadas e do elemento)
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    const elementStream = videoRef.current?.srcObject as MediaStream | null;
    elementStream?.getTracks().forEach((t) => t.stop());

    if (videoRef.current) {
      try { videoRef.current.pause(); } catch {}
      videoRef.current.srcObject = null;
      try { (videoRef.current as any).load?.(); } catch {}
    }

    // limpa canvas
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    setIsRunning(false);
    setHasStream(false);
  };

  // captura foto do canvas atual e mostra prévia (sem overlay) e desliga a câmera
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !hasStream) return;
    if (!lastHasFaceRef.current) {
      return toast({
        title: 'Nenhum rosto detectado',
        description: 'Posicione o rosto no centro e tente capturar a foto novamente.',
        variant: 'destructive',
      });
    }

    // parar o loop para evitar desenhar a legenda por cima
    runningRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    resizeCanvasToVideo(canvas, video);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // resetar transform e desenhar desinvertido
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // gerar arquivo real e repassar ao formulário
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `selfie-${Date.now()}.jpg`, { type: 'image/jpeg' })
      setPhotoDataUrl(URL.createObjectURL(blob));
      onCapture?.(file)
    }, 'image/jpeg', 0.95)

    // desliga a câmera e processamento
    stopDetection();
  };

  const deletePhoto = () => {
    if (photoDataUrl) {
      try { URL.revokeObjectURL(photoDataUrl); } catch {}
    }
    setPhotoDataUrl(null);
    onClear();
  };

  const retakePhoto = async () => {
    if (photoDataUrl) {
      URL.revokeObjectURL(photoDataUrl)
    }
    setPhotoDataUrl(null)
    onClear()
    setIsStarting(true)
    stopDetection()
    await startDetection()
  };

  // cleanup ao desmontar
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  // Mantido por compatibilidade, não utilizado após migrar para <Button />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ToastContainer>
        {toasts.map((t) => (
          <Toast key={t.id} id={t.id} title={t.title} description={t.description} variant={t.variant} onDismiss={dismiss} />
        ))}
      </ToastContainer>
      <video ref={videoRef} style={{ display: 'none' }} />

      {/* Container do vídeo/canvas fica SEMPRE montado; só alternamos a visibilidade */}
      <div
        className="relative w-full mx-auto overflow-hidden rounded-lg border-2 border-primary bg-black"
        style={{ display: (hasStream || isStarting) ? 'block' : 'none' }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', display: 'block' }} className="scale-x-[-1]" />

        {/* Overlay com máscara: escurece fora do círculo (80%) e mostra borda vermelha */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <mask id="face-mask-live">
                <rect width="100" height="100" fill="white" />
                {/* recorte central em formato de círculo com 70% do diâmetro */}
                <circle cx="50" cy="50" r="35" fill="black" />
              </mask>
            </defs>
            {/* escurece tudo que está FORA do círculo */}
            <rect width="100" height="100" fill="black" opacity="0.8" mask="url(#face-mask-live)" />
            {/* borda guia */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              className={uiFaceStatus.hasFace && uiLightStatus.label === 'Boa' ? 'stroke-success' : 'stroke-error'}
              strokeWidth="0.6"
              strokeDasharray="2,1"
              opacity="0.9"
            />
          </svg>
        </div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/80 text-xs pointer-events-none">
          Posicione seu rosto no centro
        </div>
        {isStarting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex items-center gap-2 text-white text-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
              Ativando câmera...
            </div>
          </div>
        )}
        {/* Status de detecção fora do canvas, canto inferior direito */}
        <div className="absolute right-2 bottom-2 pointer-events-none space-y-1 text-[11px]">
          <div className={`rounded-md px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm ${uiFaceStatus.hasFace ? 'bg-black/60 text-success' : 'bg-black/60 text-error'}`}>
            {uiFaceStatus.hasFace
              ? `Rosto detectado${typeof uiFaceStatus.confidence === 'number' ? ` (${uiFaceStatus.confidence.toFixed(1)}%)` : ''}`
              : 'Nenhum rosto detectado'}
          </div>
          {/* <div className="rounded-md px-2 py-1 bg-black/50 text-white/80">
            Iluminação: <span className={uiLightStatus.label === 'Boa' ? 'text-success' : 'text-warning'}>{uiLightStatus.label}</span> ({uiLightStatus.value})
          </div> */}
        </div>
      </div>

      {!hasStream && !isRunning && !photoDataUrl && !value && !isStarting && (
        <>
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border-2 border-dashed border-border bg-muted/50 p-8">
            <div className="rounded-full bg-primary/10 p-6">
              <Camera className="h-12 w-12 text-primary" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Captura de Selfie</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Vamos verificar sua identidade através de uma selfie ao vivo com detecção facial
              </p>
            </div>

            <Button type="button" onClick={startDetection} disabled={isRunning} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Camera className="mr-2 h-5 w-5" />
              Ativar Câmera
            </Button>
          </div>
          <div className="text-xs text-muted-foreground text-center">Aceitos: JPG, PNG. Tamanho máx.: 5MB.</div>
        </>
      )}
      {hasStream && (
        <>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={stopDetection} className="flex-1">
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button type="button" onClick={capturePhoto} disabled={!hasStream} className="flex-1 bg-primary text-primary-foreground">
              <Camera className="mr-2 h-4 w-4" />
              Capturar Foto
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h4 className="mb-3 text-sm font-semibold">Dicas para uma boa selfie:</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
                <span>Rosto totalmente visível e centralizado</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
                <span>Boa iluminação, evite sombras</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
                <span>Remova óculos escuros ou bonés</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
                <span>Olhe diretamente para a câmera</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
                <span>Não use fotos ou vídeos</span>
              </li>
            </ul>
          </div>
        </>
      )}

      {(photoDataUrl || externalPreviewUrl) && (
        <>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-success bg-muted">
            <img src={photoDataUrl ?? externalPreviewUrl ?? ''} alt="Selfie capturada" className="h-full w-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-md bg-success/90 px-3 py-1.5 text-xs font-medium text-white">
              <CheckCircle className="h-4 w-4" />
              Selfie capturada com sucesso
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={deletePhoto} className="flex-1">
              <X className="mr-2 h-4 w-4" />
              Excluir
            </Button>
            <Button type="button" onClick={retakePhoto} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tirar nova foto
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
