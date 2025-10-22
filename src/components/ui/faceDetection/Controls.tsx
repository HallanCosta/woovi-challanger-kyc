import { Button } from '@/components/ui/Button'
import { Camera, X } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/useTranslation'

type ControlsProps = {
  onCancel: () => void
  onCapture: () => void
  canCapture?: boolean
}

export function Controls({ onCancel, onCapture, canCapture = true }: ControlsProps) {
  const { t } = useTranslation()
  
  return (
    <div className="flex gap-2">
      <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
        <X className="mr-2 h-4 w-4" />
        {t('faceDetection.cancel')}
      </Button>
      <Button type="button" onClick={onCapture} disabled={!canCapture} className="flex-1 bg-primary text-primary-foreground">
        <Camera className="mr-2 h-4 w-4" />
        {t('faceDetection.capturePhoto')}
      </Button>
    </div>
  )
}


