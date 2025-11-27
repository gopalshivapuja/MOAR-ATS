import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "@/components/ui/input"

describe("Input Component", () => {
  it("renders input element", () => {
    render(<Input type="text" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("type", "text")
  })

  it("handles user input", async () => {
    render(<Input type="text" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)
    
    await userEvent.type(input, "Hello World")
    expect(input).toHaveValue("Hello World")
  })

  it("is disabled when disabled prop is true", () => {
    render(<Input type="text" disabled placeholder="Disabled" />)
    const input = screen.getByPlaceholderText(/disabled/i)
    expect(input).toBeDisabled()
  })

  it("supports keyboard navigation", async () => {
    render(<Input type="text" placeholder="Focus me" />)
    const input = screen.getByPlaceholderText(/focus me/i)
    
    await userEvent.tab()
    expect(input).toHaveFocus()
  })

  it("shows error state with aria-invalid", () => {
    render(<Input type="text" aria-invalid="true" placeholder="Error" />)
    const input = screen.getByPlaceholderText(/error/i)
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveClass("aria-invalid:border-destructive")
  })

  it("has proper focus styles", () => {
    render(<Input type="text" placeholder="Focus" />)
    const input = screen.getByPlaceholderText(/focus/i)
    expect(input).toHaveClass("focus-visible:border-[#42a5f5]") // Accent color
  })

  it("supports different input types", () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />)
    let input = screen.getByPlaceholderText(/email/i)
    expect(input).toHaveAttribute("type", "email")

    rerender(<Input type="password" placeholder="Password" />)
    input = screen.getByPlaceholderText(/password/i)
    expect(input).toHaveAttribute("type", "password")
  })
})

