import type { FieldErrors } from "react-hook-form"

import { FormField } from "@/components/ui/FormField"
import { SelfieCapture } from "@/components/ui/faceDetection/SelfieCapture"
import { KeyboardShortcuts } from "@/components/kyc/KeyboardShortcuts"

import type { KYCFormData, SelfieInfo } from "@/components/kyc/validations/kycSchema"
import { useTranslation } from "@/lib/i18n/useTranslation"

type SelfieStepProps = {
  data: SelfieInfo
  errors: FieldErrors<KYCFormData>
  onChange: (data: Partial<SelfieInfo>) => void
}

export function SelfieStep({ data, errors, onChange }: SelfieStepProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{t("selfieVerification")}</h2>
          <KeyboardShortcuts />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t("selfieInstructions")}</p>
      </div>

      <div className="grid gap-6">
        <FormField label={t("selfieUpload")} error={errors.selfieInfo?.selfie?.message} required>
          <SelfieCapture
            value={data.selfie ?? null}
            onCapture={(file) => onChange({ selfie: file })}
            onClear={() => onChange({ selfie: null })}
          />
        </FormField>
      </div>
    </div>
  )
}


