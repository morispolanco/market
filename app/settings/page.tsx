"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Key, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function Settings() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")

  useEffect(() => {
    // Recuperar la API key de localStorage
    const storedApiKey = localStorage.getItem("openrouter_api_key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const handleSaveApiKey = () => {
    // Guardar la API key en localStorage
    localStorage.setItem("openrouter_api_key", apiKey)

    toast({
      title: "API Key guardada",
      description: "Tu API Key de OpenRouter ha sido guardada correctamente",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MarketSim</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/simulations" className="text-sm font-medium hover:text-primary">
              Simulaciones
            </Link>
            <Link href="/reports" className="text-sm font-medium hover:text-primary">
              Informes
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:text-primary">
              Configuración
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Configuración de API</CardTitle>
            <CardDescription>
              Configura tu API Key de OpenRouter para utilizar las funciones avanzadas de MarketSim
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Key de OpenRouter
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Ingresa tu API Key de OpenRouter"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Puedes obtener tu API Key en{" "}
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  openrouter.ai/keys
                </a>
              </p>
            </div>

            <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
              <Save className="mr-2 h-4 w-4" />
              Guardar API Key
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

