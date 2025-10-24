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
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("fullName")}:</span>
              <span className="text-foreground">{data.personalInfo.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("email")}:</span>
              <span className="text-foreground">{data.personalInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("phone")}:</span>
              <span className="text-foreground">{data.personalInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("country")}:</span>
              <span className="text-foreground">{data.personalInfo.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("dateOfBirth")}:</span>
              <span className="text-foreground">{data.personalInfo.dateOfBirth}</span>
            </div>
          </div>
        </section>

        <section className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("address")}</h3>
            <Button type="button" variant="outline" onClick={() => onEditStep(2)}>{t("edit")}</Button>
          </div>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("streetAddress")}:</span>
              <span className="text-foreground">{data.addressInfo.street}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("city")}:</span>
              <span className="text-foreground">{data.addressInfo.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("stateProvince")}:</span>
              <span className="text-foreground">{data.addressInfo.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">{t("postalCode")}:</span>
              <span className="text-foreground">{data.addressInfo.postalCode}</span>
            </div>
          </div>
          {data.addressInfo.addressProof && addressProofUrl && (
            <div className="mt-3">
              <div className="flex justify-between items-start gap-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("addressProof")}:</div>
                <div className="flex-shrink-0">
                  {data.addressInfo.addressProof.type.startsWith('image/') ? (
                    <img
                      src={addressProofUrl}
                      alt="Comprovante de endereço"
                      className="h-32 w-auto rounded border object-cover"
                    />
                  ) : (
                    <div>
                      <object data={addressProofUrl} type={data.addressInfo.addressProof.type} className="h-32 w-48 rounded border">
                        <a href={addressProofUrl} target="_blank" rel="noreferrer" className="underline">{t("openDocument")}</a>
                      </object>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("identity")}</h3>
            <Button type="button" variant="outline" onClick={() => onEditStep(3)}>{t("edit")}</Button>
          </div>
          <div className="mt-2 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-muted-foreground">{t("idType")}:</span>
                <span className="text-foreground">{data.identityInfo.idType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-muted-foreground">{t("idNumber")}:</span>
                <span className="text-foreground">{data.identityInfo.idNumber}</span>
              </div>
            </div>
            {(data.identityInfo.idFront || data.identityInfo.idBack) && (
              <div className="flex justify-between items-start gap-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("identityDocuments")}:</div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {data.identityInfo.idFront && (
                    <img
                      src={URL.createObjectURL(data.identityInfo.idFront)}
                      alt="ID Front"
                      className="h-24 w-auto rounded border object-cover"
                    />
                  )}
                  {data.identityInfo.idBack && (
                    <img
                      src={URL.createObjectURL(data.identityInfo.idBack)}
                      alt="ID Back"
                      className="h-24 w-auto rounded border object-cover"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("selfie")}</h3>
            <Button type="button" variant="outline" onClick={() => onEditStep(4)}>{t("edit")}</Button>
          </div>
          <div className="mt-2">
            {data.selfieInfo.selfie ? (
              <div className="flex justify-between items-start gap-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("selfie")}:</div>
                <div className="flex-shrink-0">
                  <img
                    src={URL.createObjectURL(data.selfieInfo.selfie)}
                    alt="Selfie"
                    className="h-24 w-24 rounded-full border object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <div className="text-sm font-semibold text-muted-foreground">{t("selfie")}:</div>
                <div className="text-sm text-muted-foreground">{t("selfieReady")}</div>
              </div>
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


