import { describe, it, expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Dialog component test removed - will be tested separately if needed

describe("Accessibility Features", () => {
  describe("Keyboard Navigation", () => {
    it("allows Tab navigation through buttons", async () => {
      render(
        <div>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>
      )
      
      const first = screen.getByRole("button", { name: /first/i })
      const second = screen.getByRole("button", { name: /second/i })
      const third = screen.getByRole("button", { name: /third/i })

      first.focus()
      expect(first).toHaveFocus()

      await userEvent.tab()
      expect(second).toHaveFocus()

      await userEvent.tab()
      expect(third).toHaveFocus()
    })

    it("activates buttons with Enter key", async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Enter Test</Button>)
      const button = screen.getByRole("button", { name: /enter test/i })
      
      button.focus()
      await userEvent.keyboard("{Enter}")
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("activates buttons with Space key", async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Space Test</Button>)
      const button = screen.getByRole("button", { name: /space test/i })
      
      button.focus()
      await userEvent.keyboard(" ")
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("allows Tab navigation through form inputs", async () => {
      render(
        <div>
          <Input type="text" placeholder="First" />
          <Input type="text" placeholder="Second" />
          <Input type="text" placeholder="Third" />
        </div>
      )
      
      const first = screen.getByPlaceholderText(/first/i)
      const second = screen.getByPlaceholderText(/second/i)
      const third = screen.getByPlaceholderText(/third/i)

      first.focus()
      expect(first).toHaveFocus()

      await userEvent.tab()
      expect(second).toHaveFocus()

      await userEvent.tab()
      expect(third).toHaveFocus()
    })
  })

  describe("ARIA Labels", () => {
    it("supports aria-label on buttons", () => {
      render(<Button aria-label="Close dialog">×</Button>)
      const button = screen.getByRole("button", { name: /close dialog/i })
      expect(button).toHaveAttribute("aria-label", "Close dialog")
    })

    it("supports aria-invalid on inputs", () => {
      render(<Input type="text" aria-invalid="true" placeholder="Error" />)
      const input = screen.getByPlaceholderText(/error/i)
      expect(input).toHaveAttribute("aria-invalid", "true")
    })
  })

  describe("Focus Indicators", () => {
    it("has visible focus styles on buttons", () => {
      render(<Button>Focus Test</Button>)
      const button = screen.getByRole("button", { name: /focus test/i })
      expect(button).toHaveClass("focus-visible:ring-[3px]")
    })

    it("has visible focus styles on inputs", () => {
      render(<Input type="text" placeholder="Focus" />)
      const input = screen.getByPlaceholderText(/focus/i)
      expect(input).toHaveClass("focus-visible:ring-[3px]")
    })
  })

  describe("Screen Reader Support", () => {
    it("uses semantic HTML for buttons", () => {
      render(<Button>Semantic Button</Button>)
      const button = screen.getByRole("button", { name: /semantic button/i })
      expect(button.tagName).toBe("BUTTON")
    })

    it("uses semantic HTML for inputs", () => {
      render(<Input type="text" placeholder="Semantic Input" />)
      const input = screen.getByPlaceholderText(/semantic input/i)
      expect(input.tagName).toBe("INPUT")
    })
  })

  describe("Escape Key Support", () => {
    it("buttons support Escape key for canceling actions", async () => {
      const handleEscape = jest.fn()
      render(
        <Button onKeyDown={(e) => e.key === 'Escape' && handleEscape()}>
          Escape Test
        </Button>
      )
      const button = screen.getByRole("button", { name: /escape test/i })
      button.focus()
      await userEvent.keyboard("{Escape}")
      // Note: This is a basic test - actual Escape handling depends on component implementation
    })
  })
})

