import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"

describe("FormField Component", () => {
  it("renders label above input", () => {
    render(
      <FormField label="Email">
        <Input type="email" id="email" />
      </FormField>
    )
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it("shows required indicator when required", () => {
    render(
      <FormField label="Email" required>
        <Input type="email" id="email" />
      </FormField>
    )
    const label = screen.getByText("Email")
    const requiredIndicator = label.parentElement?.querySelector('span[aria-label="required"]')
    expect(requiredIndicator).toBeInTheDocument()
    expect(requiredIndicator).toHaveTextContent("*")
  })

  it("displays error message when error prop is provided", () => {
    render(
      <FormField label="Email" error="This field is required">
        <Input type="email" id="email" />
      </FormField>
    )
    const errorMessage = screen.getByText("This field is required")
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveAttribute("role", "alert")
    expect(errorMessage).toHaveAttribute("aria-live", "polite")
  })

  it("does not show required indicator when not required", () => {
    render(
      <FormField label="Optional Field">
        <Input type="text" id="optional" />
      </FormField>
    )
    const label = screen.getByText("Optional Field")
    const requiredIndicator = label.parentElement?.querySelector('span[aria-label="required"]')
    expect(requiredIndicator).not.toBeInTheDocument()
  })
})

