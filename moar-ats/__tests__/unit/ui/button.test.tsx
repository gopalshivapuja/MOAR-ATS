import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@/components/ui/button"

describe("Button Component", () => {
  it("renders button with default variant", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-[#1e3a5f]") // Primary color
  })

  it("renders button with secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole("button", { name: /secondary/i })
    expect(button).toHaveClass("bg-[#0d47a1]") // Secondary color
  })

  it("renders button with outline variant", () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole("button", { name: /outline/i })
    expect(button).toHaveClass("border-2", "border-[#1e3a5f]")
  })

  it("handles click events", async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole("button", { name: /disabled/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:opacity-50", "disabled:cursor-not-allowed")
  })

  it("supports keyboard navigation with Enter", async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Keyboard</Button>)
    const button = screen.getByRole("button", { name: /keyboard/i })
    
    button.focus()
    expect(button).toHaveFocus()
    
    await userEvent.keyboard("{Enter}")
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("supports keyboard navigation with Space", async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Space Test</Button>)
    const button = screen.getByRole("button", { name: /space test/i })
    
    button.focus()
    expect(button).toHaveFocus()
    
    await userEvent.keyboard(" ")
    expect(handleClick).toHaveBeenCalled()
  })

  it("has proper ARIA attributes", () => {
    render(<Button aria-label="Custom label">Button</Button>)
    const button = screen.getByRole("button", { name: /custom label/i })
    expect(button).toHaveAttribute("aria-label", "Custom label")
  })

  it("renders different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    let button = screen.getByRole("button", { name: /small/i })
    expect(button).toHaveClass("h-8")

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole("button", { name: /large/i })
    expect(button).toHaveClass("h-10")
  })
})

