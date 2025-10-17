"use client"

import { Input } from "@/components/ui/Input"
import { FormField } from "@/components/ui/FormField"
import type { PersonalInfo } from "@/lib/types"

interface PersonalInfoStepProps {
  data: PersonalInfo
  onChange: (data: Partial<PersonalInfo>) => void
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
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
        <FormField label="Nome Completo" required className="md:col-span-2">
          <Input
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Digite seu nome completo"
          />
        </FormField>

        <FormField label="Email" required>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="Digite seu email"
          />
        </FormField>

        <FormField label="Telefone" required>
          <Input
            type="tel"
            value={data.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="Digite seu telefone"
          />
        </FormField>

        <FormField label="Data de Nascimento" required>
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
