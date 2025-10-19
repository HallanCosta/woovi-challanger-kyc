import type { FieldErrors } from "react-hook-form"

import { Input } from "@/components/ui/Input"
import { FormField } from "@/components/ui/FormField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { KeyboardShortcutsTooltip } from "@/components/kyc/KeyboardShortcutsTooltip"

import { COUNTRIES } from "@/constants/countries"

import type { KYCFormData, PersonalInfo } from "@/lib/validation"

import { formatPhoneNumber, getPhoneFormat } from "@/lib/utils"

type PersonalInfoStepProps = {
  data: PersonalInfo
  errors: FieldErrors<KYCFormData>
  onChange: (data: Partial<PersonalInfo>) => void
  firstFieldRef?: React.RefObject<HTMLInputElement | null>
}

export function PersonalInfoStep({ data, errors, onChange, firstFieldRef }: PersonalInfoStepProps) {
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
          <h2 className="text-2xl font-bold">Informações Pessoais</h2>
          <KeyboardShortcutsTooltip />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Forneça seus dados pessoais básicos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Nome Completo" error={errors.personalInfo?.fullName?.message} required className="md:col-span-2">
          <Input
            ref={firstFieldRef}
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Digite seu nome completo"
          />
        </FormField>

        <FormField label="Email" error={errors.personalInfo?.email?.message} required>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="Digite seu email"
          />
        </FormField>

        <FormField label="País" error={errors.personalInfo?.country?.message} required>
          <Select value={data.country} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu país" />
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

        <FormField label="Telefone" error={errors.personalInfo?.phone?.message} required>
          <Input
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={phoneFormat?.placeholder || "Digite seu telefone"}
            maxLength={phoneFormat?.maxLength}
            type="tel"
            disabled={!data.country}
            aria-invalid={!!errors.personalInfo?.phone}
            aria-describedby={!data.country ? "phone-helper" : undefined}
          />
        </FormField>

        <FormField label="Data de Nascimento" error={errors.personalInfo?.dateOfBirth?.message} required>
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
