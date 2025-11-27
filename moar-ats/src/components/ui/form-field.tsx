import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children?: React.ReactNode
  className?: string
  labelClassName?: string
}

function FormField({
  label,
  required = false,
  error,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  const childId = React.isValidElement<{ id?: string }>(children)
    ? children.props.id
    : undefined

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label
        htmlFor={childId}
        className={cn("text-sm font-medium", labelClassName)}
      >
        {label}
        {required && (
          <span className="text-destructive ml-1" aria-label="required">
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-destructive mt-1" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  )
}

export { FormField }

