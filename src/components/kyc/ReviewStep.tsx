import type { KYCFormData } from "@/components/kyc/validations/kycSchema"
import { useEffect, useMemo } from "react"
import { Button } from "@/components/ui/Button"
import { FormField } from "@/components/ui/FormField"
import { KeyboardShortcuts } from "@/components/kyc/KeyboardShortcuts"
import { useTranslation } from "@/lib/i18n/useTranslation"

type ReviewStepProps = {
  data: KYCFormData
  onEditStep: (step: number) => void
  termsAccepted: boolean
  onTermsChange: (accepted: boolean) => void
  termsError?: string
}

export function ReviewStep({ data, onEditStep, termsAccepted, onTermsChange, termsError }: ReviewStepProps) {
  const { t } = useTranslation()

  const addressProofUrl = useMemo(() => {
    const file = data.addressInfo.addressProof
    if (!file) return null
    return URL.createObjectURL(file)
  }, [data.addressInfo.addressProof])

  useEffect(() => {
    return () => {
      if (addressProofUrl) URL.revokeObjectURL(addressProofUrl)
    }
  }, [addressProofUrl])

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{t("reviewAndSubmit")}</h2>
          <KeyboardShortcuts />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t("reviewSummaryHint")}</p>
      </div>

      <div className="space-y-4">
        <section className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("personalInfo")}</h3>
            <Button type="button" variant="outline" onClick={() => onEditStep(1)}>{t("edit")}</Button>
          </div>
          <ul className="mt-2 text-sm text-muted-foreground">
            <li><span className="font-semibold">{t("fullName")}:</span> {data.personalInfo.fullName}</li>
            <li><span className="font-semibold">{t("email")}:</span> {data.personalInfo.email}</li>
            <li><span className="font-semibold">{t("phone")}:</span> {data.personalInfo.phone}</li>
            <li><span className="font-semibold">{t("country")}:</span> {data.personalInfo.country}</li>
            <li><span className="font-semibold">{t("dateOfBirth")}:</span> {data.personalInfo.dateOfBirth}</li>
          </ul>
        </section>

        <section className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("address")}</h3>
            <Button type="button" variant="outline" onClick={() => onEditStep(2)}>{t("edit")}</Button>
          </div>
          <ul className="mt-2 text-sm text-muted-foreground">
            <li><span className="font-semibold">{t("streetAddress")}:</span> {data.addressInfo.street}</li>
            <li><span className="font-semibold">{t("city")}:</span> {data.addressInfo.city}</li>
            <li><span className="font-semibold">{t("stateProvince")}:</span> {data.addressInfo.state}</li>
            <li><span className="font-semibold">{t("postalCode")}:</span> {data.addressInfo.postalCode}</li>
          </ul>
          {data.addressInfo.addressProof && addressProofUrl && (
            <div className="mt-3">
              <div className="text-sm font-semibold mb-1">{t("addressProof")}</div>
              {data.addressInfo.addressProof.type.startsWith('image/') ? (
                <img
                  src={addressProofUrl}
                  alt="Comprovante de endereço"
                  className="h-40 w-auto rounded border object-cover"
                />
              ) : (
                <div>
                  <object data={addressProofUrl} type={data.addressInfo.addressProof.type} className="h-40 w-full rounded border">
                    <a href={addressProofUrl} target="_blank" rel="noreferrer" className="underline">{t("openDocument")}</a>
                  </object>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("identity")}</h3>
            <Button type="button" variant="outline" onClick={() => onEditStep(3)}>{t("edit")}</Button>
          </div>
          <div className="mt-2 flex items-start gap-3">
            <div className="flex items-center gap-3">
              {data.identityInfo.idFront && (
                <img
                  src={URL.createObjectURL(data.identityInfo.idFront)}
                  alt="ID Front"
                  className="h-28 w-auto rounded border object-cover"
                />
              )}
              {data.identityInfo.idBack && (
                <img
                  src={URL.createObjectURL(data.identityInfo.idBack)}
                  alt="ID Back"
                  className="h-28 w-auto rounded border object-cover"
                />
              )}
            </div>
            <ul className="text-sm text-muted-foreground">
              <li><span className="font-semibold">{t("idType")}:</span> {data.identityInfo.idType}</li>
              <li><span className="font-semibold">{t("idNumber")}:</span> {data.identityInfo.idNumber}</li>
            </ul>
          </div>
        </section>

        <section className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("selfie")}</h3>
            <Button type="button" variant="outline" onClick={() => onEditStep(4)}>{t("edit")}</Button>
          </div>
          <div className="mt-2">
            {data.selfieInfo.selfie ? (
              <img
                src={URL.createObjectURL(data.selfieInfo.selfie)}
                alt="Selfie"
                className="h-32 w-32 rounded-full border object-cover"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{t("selfieReady")}</p>
            )}
          </div>
        </section>

        <FormField label={t("termsAndConditions")} error={termsError} required>
          <label className="flex items-start gap-2 text-sm mt-2">
            <input type="checkbox" checked={termsAccepted} onChange={(e) => onTermsChange(e.target.checked)} />
            <span className="text-muted-foreground">
              {t("acceptTermsLabel")} <a className="underline" href="#" target="_blank" rel="noreferrer">{t("termsLink")}</a>
            </span>
          </label>
        </FormField>
      </div>
    </div>
  )
}


