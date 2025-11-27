import * as React from "react"
import { beforeAll, describe, it, expect } from "@jest/globals"
import { render } from "@testing-library/react"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster, toast } from "@/components/ui/sonner"

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
})

describe("Sonner Toast integration", () => {
  it("re-exports toast helper functions", () => {
    expect(typeof toast).toBe("function")
    expect(typeof toast.success).toBe("function")
  })

  it("renders Toaster safely inside ThemeProvider", () => {
    expect(() =>
      render(
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Toaster />
        </ThemeProvider>
      )
    ).not.toThrow()
  })
})

