import type { RefObject } from 'react'
import { useTranslation } from '@/lib/i18n/useTranslation'

type DetectionCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  faceStatus: { hasFace: boolean; confidence?: number }
  lightStatus: { label: 'Escuro' | 'Boa' | 'Claro'; value: number }
}

export function DetectionCanvas({ canvasRef, faceStatus, lightStatus }: DetectionCanvasProps) {
  const { t } = useTranslation()
  
  return (
    <div className="relative">
      <canvas ref={canvasRef} style={{ width: '100%', display: 'block' }} className="scale-x-[-1]" />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <mask id="face-mask-live">
              <rect width="100" height="100" fill="white" />
              <circle cx="50" cy="50" r="35" fill="black" />
            </mask>
          </defs>
          <rect width="100" height="100" fill="black" opacity="0.8" mask="url(#face-mask-live)" />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            className={faceStatus.hasFace && lightStatus.label === 'Boa' ? 'stroke-success' : 'stroke-error'}
            strokeWidth="0.6"
            strokeDasharray="2,1"
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white/80 text-xs pointer-events-none">
        {t('faceDetection.placeFaceCenter')}
      </div>

      <div className="absolute right-2 bottom-2 pointer-events-none space-y-1 text-[11px]">
        <div className={`rounded-md px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm ${faceStatus.hasFace ? 'bg-black/60 text-success' : 'bg-black/60 text-error'}`}>
          {faceStatus.hasFace
            ? `${t('faceDetection.faceDetected')}${typeof faceStatus.confidence === 'number' ? ` (${faceStatus.confidence.toFixed(1)}%)` : ''}`
            : t('faceDetection.noFaceDetected')}
        </div>
      </div>
    </div>
  )
}


