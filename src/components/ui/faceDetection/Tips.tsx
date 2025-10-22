import { CheckCircle } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/useTranslation'

export function Tips() {
  const { t } = useTranslation()
  
  return (
    <div className="rounded-lg border border-border bg-muted/50 p-4">
      <h4 className="mb-3 text-sm font-semibold">{t('faceDetection.tipsTitle')}</h4>
      <ul className="space-y-2 text-xs text-muted-foreground">
        <li className="flex items-start gap-2">
          <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
          <span>{t('faceDetection.tipFaceCentered')}</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
          <span>{t('faceDetection.tipGoodLighting')}</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
          <span>{t('faceDetection.tipRemoveAccessories')}</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
          <span>{t('faceDetection.tipLookAtCamera')}</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-success" />
          <span>{t('faceDetection.tipNoPhotosOrVideos')}</span>
        </li>
      </ul>
    </div>
  )
}


