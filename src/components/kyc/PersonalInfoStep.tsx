"use client"

import { Input } from "@/components/ui/Input"
import { FormField } from "@/components/ui/FormField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { COUNTRIES } from "@/constants/countries"
import type { PersonalInfo, ValidationErrors } from "@/lib/types"

interface PersonalInfoStepProps {
  data: PersonalInfo
  errors: ValidationErrors
  onChange: (data: Partial<PersonalInfo>) => void
}

export function PersonalInfoStep({ data, errors, onChange }: PersonalInfoStepProps) {
  const handlePhoneChange = (value: string) => {
    onChange({ phone: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Informações Pessoais</h2>
        <p className="mt-2 text-sm text-muted-foreground">Forneça seus dados pessoais básicos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Nome Completo" error={errors.fullName} required className="md:col-span-2">
          <Input
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Digite seu nome completo"
          />
        </FormField>

        <FormField label="Email" error={errors.email} required>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="Digite seu email"
          />
        </FormField>

        <FormField label="País" error={errors.country} required>
          <Select value={data.country} onValueChange={(value) => onChange({ country: value })}>
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

        <FormField label="Telefone" error={errors.phone} required>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="Digite seu telefone"
          />
        </FormField>

        <FormField label="Data de Nascimento" error={errors.dateOfBirth} required>
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
