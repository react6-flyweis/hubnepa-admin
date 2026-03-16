import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldAlert } from "lucide-react"
import { useState, type ComponentType } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
const partnerLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberDevice: z.boolean().optional(),
})

type PartnerLoginFormValues = z.infer<typeof partnerLoginSchema>
type PartnerLoginFieldName = Exclude<
  keyof PartnerLoginFormValues,
  "rememberDevice"
>

type PartnerLoginFieldConfig = {
  name: PartnerLoginFieldName
  label: string
  placeholder: string
  icon: ComponentType<{ className?: string }>
}

const partnerLoginFields: PartnerLoginFieldConfig[] = [
  {
    name: "email",
    label: "Email Address",
    placeholder: "admin@hubnepa.com",
    icon: Mail,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "••••••••",
    icon: Lock,
  },
]

function LoginInputField({
  field,
  values,
  isPasswordVisible,
  onTogglePasswordVisibility,
}: {
  field: PartnerLoginFieldConfig
  values: ReturnType<typeof useForm<PartnerLoginFormValues>>
  isPasswordVisible: boolean
  onTogglePasswordVisibility: () => void
}) {
  const Icon = field.icon
  const error = values.formState.errors[field.name]?.message
  const isPasswordField = field.name === "password"

  return (
    <Field>
      <div className="mb-1">
        <FieldLabel
          htmlFor={field.name}
          className="text-sm font-medium text-[#D6DCEE]"
        >
          {field.label}
        </FieldLabel>
      </div>

      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#66708A]" />

        <Input
          id={field.name}
          type={
            isPasswordField
              ? isPasswordVisible
                ? "text"
                : "password"
              : "email"
          }
          placeholder={field.placeholder}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 rounded border-0 bg-[#020618] pl-12 text-[15px] text-[#EEF3FF] placeholder:text-[#4D5772]",
            isPasswordField ? "pr-12" : "pr-4"
          )}
          {...values.register(field.name)}
        />

        {isPasswordField ? (
          <button
            type="button"
            onClick={onTogglePasswordVisibility}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[#66708A] transition-colors hover:text-[#C5CCDF]"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        ) : null}
      </div>

      {typeof error === "string" ? (
        <FieldError className="mt-2 text-xs text-[#FF7A7A]">{error}</FieldError>
      ) : null}
    </Field>
  )
}

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const values = useForm<PartnerLoginFormValues>({
    resolver: zodResolver(partnerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberDevice: false,
    },
  })

  function onSubmit(data: PartnerLoginFormValues) {
    // TODO: handle authentication logic here (API call, token storage, etc.)
    values.reset(data)

    // redirect to dashboard on successful login
    navigate("/dashboard", { replace: true })
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((currentState) => !currentState)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020618] px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center justify-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl border-[#1D293D] bg-[#0F172B] text-secondary">
          <ShieldAlert className="size-8" />
        </div>

        <Card className="bg-[#0F172B] text-white">
          <CardHeader className="text-center">
            <h1 className="font-display text-3xl">Admin Acess</h1>
            <p className="max-w-sm text-center">
              Enter your secure credentials to access the control panel
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={values.handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              {partnerLoginFields.map((field) => (
                <LoginInputField
                  key={field.name}
                  field={field}
                  values={values}
                  isPasswordVisible={isPasswordVisible}
                  onTogglePasswordVisibility={togglePasswordVisibility}
                />
              ))}

              <Button
                type="submit"
                className="mt-2 h-11 w-full rounded-md bg-secondary text-base font-semibold text-white hover:bg-[#e06a0a]"
              >
                Sign In
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-[#8B96AE]">
              Protected area. Unauthorized access is prohibited and monitored.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
