import type { FieldErrors } from "react-hook-form"

import { Input } from "@/components/ui/Input"
import { FormField } from "@/components/ui/FormField"
import { FileUpload } from "@/components/ui/FileUpload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { KeyboardShortcuts } from "@/components/kyc/KeyboardShortcuts"

import type { IdentityInfo, KYCFormData } from "@/components/kyc/validations/kycSchema"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { formatCPF, getCPFMask } from "@/lib/utils"

type IdentityStepProps = {
  data: IdentityInfo
  errors: FieldErrors<KYCFormData>
  onChange: (data: Partial<IdentityInfo>) => void
  firstFieldRef?: React.RefObject<HTMLInputElement | null>
}

export function IdentityStep({ data, errors, onChange, firstFieldRef }: IdentityStepProps) {
  const { t } = useTranslation()
  
  const needsBackSide = data.idType === 'drivers-license' || data.idType === 'rg'
  
  const handleIdNumberChange = (value: string) => {
    const formatted = formatCPF(value)
    onChange({ idNumber: formatted })
  }
  
  const cpfMask = getCPFMask()

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{t("identityVerification")}</h2>
          <KeyboardShortcuts />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t("provideIdentityDetails")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={t("idType")} error={errors.identityInfo?.idType?.message} required>
          <Select value={data.idType} onValueChange={(val) => onChange({ idType: val as IdentityInfo['idType'] })}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectIdType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">{t("passport")}</SelectItem>
              <SelectItem value="drivers-license">{t("driversLicense")}</SelectItem>
              <SelectItem value="rg">{t("rg")}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label={t("idNumber") + " / CPF"} error={errors.identityInfo?.idNumber?.message} required>
          <Input
            ref={firstFieldRef}
            value={data.idNumber}
            onChange={(e) => handleIdNumberChange(e.target.value)}
            placeholder={cpfMask.placeholder}
            maxLength={cpfMask.maxLength}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </FormField>

        <FormField 
          label={t("idFrontUpload")} 
          error={errors.identityInfo?.idFront?.message} 
          required 
          className={needsBackSide ? "" : "md:col-span-2"}
        >
          <FileUpload
            accept="image/jpeg,image/png"
            maxSizeMB={5}
            onFileSelect={(file) => onChange({ idFront: file })}
            helperText={t("fileConstraintsIdentity")}
            value={data.idFront}
          />
        </FormField>

        {needsBackSide && (
          <FormField label={t("idBackUpload")} error={errors.identityInfo?.idBack?.message} required>
            <FileUpload
              accept="image/jpeg,image/png"
              maxSizeMB={5}
              onFileSelect={(file) => onChange({ idBack: file })}
              helperText={t("idBackNote")}
              value={data.idBack}
            />
          </FormField>
        )}
      </div>
    </div>
  )
}


