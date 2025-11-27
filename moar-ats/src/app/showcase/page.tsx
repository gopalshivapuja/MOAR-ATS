"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormField } from "@/components/ui/form-field"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Toaster, toast } from "@/components/ui/sonner"

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Component Showcase</h1>
          <p className="text-muted-foreground">
            Display of all UI components with Trust Navy theme
          </p>
        </div>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>Trust Navy color system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-[#1e3a5f]"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">#1e3a5f</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-[#0d47a1]"></div>
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-muted-foreground">#0d47a1</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-[#42a5f5]"></div>
                <p className="text-sm font-medium">Accent</p>
                <p className="text-xs text-muted-foreground">#42a5f5</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-[#28a745]"></div>
                <p className="text-sm font-medium">Success</p>
                <p className="text-xs text-muted-foreground">#28a745</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Roboto Slab for headings, Roboto for body</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="mb-2">Heading 1 (2.5rem/40px)</h1>
              <h2 className="mb-2">Heading 2 (2rem/32px)</h2>
              <h3 className="mb-2">Heading 3 (1.5rem/24px)</h3>
              <h4 className="mb-2">Heading 4 (1.25rem/20px)</h4>
              <h5 className="mb-2">Heading 5 (1.125rem/18px)</h5>
              <h6 className="mb-2">Heading 6 (1rem/16px)</h6>
              <p className="mb-2">Body text (1rem/16px) - This is regular body text with comfortable line height for reading.</p>
              <small>Small text (0.875rem/14px) - Used for secondary information and captions.</small>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Button hierarchy: Primary, Secondary, Tertiary (Outline)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Tertiary (Outline)</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button variant="default" disabled>Disabled Primary</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Form Inputs</CardTitle>
            <CardDescription>Labels above fields, required indicators, error states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField label="Email Address" required>
              <Input type="email" id="email" placeholder="Enter your email" />
            </FormField>
            <FormField label="Password" required>
              <Input type="password" id="password" placeholder="Enter your password" />
            </FormField>
            <FormField label="Optional Field">
              <Input type="text" id="optional" placeholder="This field is optional" />
            </FormField>
            <FormField label="Field with Error" error="This field is required">
              <Input type="text" id="error" placeholder="Enter text" aria-invalid="true" />
            </FormField>
            <FormField label="Disabled Field">
              <Input type="text" id="disabled" placeholder="Disabled input" disabled />
            </FormField>
          </CardContent>
        </Card>

        {/* Loading States */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>Skeleton screens and spinners</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="mb-4">Spinners</h4>
              <div className="flex gap-4 items-center">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </div>
            <div>
              <h4 className="mb-4">Button with Loading</h4>
              <Button disabled>
                <Spinner size="sm" className="mr-2" />
                Loading...
              </Button>
            </div>
            <div>
              <h4 className="mb-4">Skeleton Screens</h4>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>Card with header, content, and description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is a card component example. Cards are used to group related content.</p>
          </CardContent>
        </Card>

        {/* Dialog/Modal */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog/Modal</CardTitle>
            <CardDescription>Modal dialogs for important interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Example Dialog</DialogTitle>
                  <DialogDescription>
                    This is an example dialog component. Press Escape to close or click outside.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here.</p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Toast/Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Toast notifications using Sonner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => toast.success("Success! This is a success message.")}
              >
                Show Success Toast
              </Button>
              <Button
                variant="destructive"
                onClick={() => toast.error("Error! This is an error message.")}
              >
                Show Error Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast.info("Info: This is an info message.")}
              >
                Show Info Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Responsive Breakpoints */}
        <Card>
          <CardHeader>
            <CardTitle>Responsive Breakpoints</CardTitle>
            <CardDescription>Mobile (max 767px), Tablet (768-1023px), Desktop (min 1024px)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md">
                <p className="font-medium">Mobile</p>
                <p className="text-sm text-muted-foreground">Max 767px</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="font-medium">Tablet</p>
                <p className="text-sm text-muted-foreground">768-1023px</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="font-medium">Desktop</p>
                <p className="text-sm text-muted-foreground">Min 1024px</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>WCAG 2.1 Level AA compliance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>ARIA labels on interactive components</li>
              <li>Keyboard navigation support (Tab, Enter, Space, Escape)</li>
              <li>Focus indicators visible (accent color ring)</li>
              <li>Color contrast ratios meet standards (4.5:1 for text, 3:1 for interactive)</li>
              <li>Screen reader compatible with proper semantic HTML</li>
            </ul>
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-sm">
                <strong>Test keyboard navigation:</strong> Use Tab to navigate through buttons and inputs.
                Press Enter or Space to activate buttons. Press Escape to close dialogs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}

