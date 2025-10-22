import type { ReactNode } from 'react'

type PhotoPreviewProps = {
  src: string
  label?: string
  icon?: ReactNode
}

export function PhotoPreview({ src, label, icon }: PhotoPreviewProps) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-success bg-muted">
      <img src={src} alt="Selfie capturada" className="h-full w-full object-cover" />
      {label && (
        <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-md bg-success/90 px-3 py-1.5 text-xs font-medium text-white">
          {icon}
          {label}
        </div>
      )}
    </div>
  )
}


