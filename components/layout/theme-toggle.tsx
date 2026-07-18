"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-transform duration-[var(--duration-base)] ease-[var(--ease-luxe)] dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-luxe)] dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export { ThemeToggle }
