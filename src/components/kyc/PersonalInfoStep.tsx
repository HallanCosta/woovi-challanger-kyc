import type { FieldErrors } from "react-hook-form"

import { Input } from "@/components/ui/Input"
import { FormField } from "@/components/ui/FormField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { KeyboardShortcuts } from "@/components/kyc/KeyboardShortcuts"

import { COUNTRIES } from "@/constants/countries"

import type { KYCFormData, PersonalInfo } from "@/lib/validation"

import { formatPhoneNumber, getPhoneFormat } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/useTranslation"

type PersonalInfoStepProps = {
  data: PersonalInfo
  errors: FieldErrors<KYCFormData>
  onChange: (data: Partial<PersonalInfo>) => void
  firstFieldRef?: React.RefObject<HTMLInputElement | null>
}

export function PersonalInfoStep({ data, errors, onChange, firstFieldRef }: PersonalInfoStepProps) {
  const { t } = useTranslation()
  const handlePhoneChange = (value: string) => {
    if (!data.country) return
    const formatted = formatPhoneNumber(value, data.country)
    onChange({ phone: formatted })
  }

  const handleCountryChange = (value: string) => {
    onChange({ country: value, phone: "" })
  }

  const phoneFormat = data.country ? getPhoneFormat(data.country) : null

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{t("personalInformation")}</h2>
          <KeyboardShortcuts />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t("providePersonalDetails")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={t("fullName")} error={errors.personalInfo?.fullName?.message} required className="md:col-span-2">
          <Input
            ref={firstFieldRef}
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder={t("fullNamePlaceholder")}
          />
        </FormField>

        <FormField label={t("email")} error={errors.personalInfo?.email?.message} required>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder={t("emailPlaceholder")}
          />
        </FormField>

        <FormField label={t("country")} error={errors.personalInfo?.country?.message} required>
          <Select value={data.country} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectCountry")} />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label={t("phone")} error={errors.personalInfo?.phone?.message} required>
          <Input
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={phoneFormat?.placeholder || t("phonePlaceholder")}
            maxLength={phoneFormat?.maxLength}
            type="tel"
            disabled={!data.country}
            aria-invalid={!!errors.personalInfo?.phone}
            aria-describedby={!data.country ? t("selectCountryFirst") : undefined}
          />
        </FormField>

        <FormField label={t("dateOfBirth")} error={errors.personalInfo?.dateOfBirth?.message} required>
          <Input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            max={new Date().toISOString().split("T")[0]}
          />
        </FormField>
      </div>
    </div>
  )
}
