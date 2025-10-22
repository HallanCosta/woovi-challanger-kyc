import type { FieldErrors } from "react-hook-form"

import { Input } from "@/components/ui/Input"
import { FormField } from "@/components/ui/FormField"
import { FileUpload } from "@/components/ui/FileUpload"
import { KeyboardShortcuts } from "@/components/kyc/KeyboardShortcuts"

import type { AddressInfo, KYCFormData } from "@/components/kyc/validations/kycSchema"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { formatPostalCode, getPostalCodeFormat } from "@/lib/utils"

type AddressStepProps = {
  data: AddressInfo
  errors: FieldErrors<KYCFormData>
  onChange: (data: Partial<AddressInfo>) => void
  firstFieldRef?: React.RefObject<HTMLInputElement | null>
  country?: string
}

export function AddressStep({ data, errors, onChange, firstFieldRef, country }: AddressStepProps) {
  const { t } = useTranslation()

  const handlePostalCodeChange = (value: string) => {
    if (!country) {
      onChange({ postalCode: value })
      return
    }
    const formatted = formatPostalCode(value, country)
    onChange({ postalCode: formatted })
  }

  const postalCodeFormat = country ? getPostalCodeFormat(country) : null

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{t("addressVerification")}</h2>
          <KeyboardShortcuts />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t("provideAddressDetails")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={t("streetAddress")} error={errors.addressInfo?.street?.message} required className="md:col-span-2">
          <Input
            ref={firstFieldRef}
            value={data.street}
            onChange={(e) => onChange({ street: e.target.value })}
            placeholder={t("streetAddressPlaceholder")}
          />
        </FormField>

        <FormField label={t("city")} error={errors.addressInfo?.city?.message} required>
          <Input
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder={t("cityPlaceholder")}
          />
        </FormField>

        <FormField label={t("stateProvince")} error={errors.addressInfo?.state?.message} required>
          <Input
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            placeholder={t("stateProvincePlaceholder")}
          />
        </FormField>

        <FormField label={t("postalCode")} error={errors.addressInfo?.postalCode?.message} required>
          <Input
            value={data.postalCode}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            placeholder={postalCodeFormat?.placeholder || t("postalCodePlaceholder")}
            maxLength={postalCodeFormat?.maxLength}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </FormField>

        <FormField label={t("addressProof")} error={errors.addressInfo?.addressProof?.message} required className="md:col-span-2">
          <FileUpload
            accept=".pdf,image/jpeg,image/png"
            maxSizeMB={5}
            onFileSelect={(file) => onChange({ addressProof: file })}
            helperText={t("fileConstraintsAddress")}
            value={data.addressProof}
          />
        </FormField>
      </div>
    </div>
  )
}


