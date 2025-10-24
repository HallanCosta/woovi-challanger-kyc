import { useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { Camera, CheckCircle, Loader2, RefreshCw, X } from 'lucide-react'
import { Toast, ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { useFaceDetection } from '@/hooks/useFaceDetection'
import { DetectionCanvas } from './DetectionCanvas.tsx'
import { PhotoPreview } from './PhotoPreview.tsx'
import { Tips } from './Tips.tsx'
import { Controls } from './Controls.tsx'
import { useTranslation } from '@/lib/i18n/useTranslation'

export type SelfieCaptureProps = {
  value?: File | null
  onCapture?: (file: File) => void
  onClear: () => void
}

export function SelfieCapture({ value, onCapture, onClear }: SelfieCaptureProps) {
  const { toasts, toast, dismiss } = useToast()
  const { t } = useTranslation()

  const {
    videoRef,
    canvasRef,
    isRunning,
    isStarting,
    hasStream,
    faceStatus,
    lightStatus,
    photoUrl,
    startDetection,
    stopDetection,
    capturePhoto,
    clearPhoto,
    retakePhoto,
  } = useFaceDetection()

  const externalPreviewUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value])

  const handleCapture = async () => {
    const result = await capturePhoto()
    if (!result) {
      return toast({
        title: t('faceDetection.noFaceDetected'),
        description: t('faceDetection.noFaceDescription'),
        variant: 'destructive',
      })
    }
    onCapture?.(result.file)
  }

  const handleDelete = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    clearPhoto()
    onClear()
  }

  const handleRetake = async () => {
    await retakePhoto()
    onClear()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ToastContainer>
        {toasts.map((t) => (
          <Toast 
            key={t.id} 
            id={t.id} 
            title={t.title} 
            description={t.description} 
            variant={t.variant} 
            onDismiss={dismiss} 
          />
        ))}
      </ToastContainer>

      <video ref={videoRef} style={{ display: 'none' }} />

      <div
        className="relative w-full mx-auto overflow-hidden rounded-lg border-2 border-primary bg-black"
        style={{ display: (!photoUrl && !externalPreviewUrl && (hasStream || isStarting)) ? 'block' : 'none' }}
      >
        <DetectionCanvas canvasRef={canvasRef} faceStatus={faceStatus} lightStatus={lightStatus} />

        {isStarting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex items-center gap-2 text-white text-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
              {t('faceDetection.activatingCamera')}
            </div>
          </div>
        )}
      </div>

      {!hasStream && !isRunning && !photoUrl && !isStarting && !externalPreviewUrl && (
        <>
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border-2 border-dashed border-border bg-muted/50 p-8">
            <div className="rounded-full bg-primary/10 p-6">
              <Camera className="h-12 w-12 text-primary" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">{t('faceDetection.selfieCaptureTitle')}</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {t('faceDetection.selfieCaptureDesc')}
              </p>
            </div>

            <Button type="button" onClick={startDetection} disabled={isRunning} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Camera className="mr-2 h-5 w-5" />
              {t('faceDetection.activateCamera')}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground text-center">{t('faceDetection.acceptedFormats')}</div>
        </>
      )}

      {hasStream && !photoUrl && !externalPreviewUrl && (
        <>
          <Controls
            onCancel={stopDetection}
            onCapture={handleCapture}
            canCapture={hasStream}
          />
          <Tips />
        </>
      )}

      {(photoUrl || externalPreviewUrl) && (
        <>
          <PhotoPreview
            src={photoUrl ?? externalPreviewUrl ?? ''}
            label={t('faceDetection.selfieCaptured')}
            icon={<CheckCircle className="h-4 w-4" />}
          />

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleDelete} className="flex-1">
              <X className="mr-2 h-4 w-4" />
              {t('faceDetection.delete')}
            </Button>
            <Button type="button" onClick={handleRetake} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              {t('faceDetection.retakePhoto')}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default SelfieCapture


