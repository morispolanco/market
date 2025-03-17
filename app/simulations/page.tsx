"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Simulations() {
  const [simulations, setSimulations] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Aquí se cargarían las simulaciones guardadas
    // Por ahora, usamos datos de ejemplo
    setSimulations([
      {
        id: 1,
        name: "Campaña Q2 2024",
        category: "ecommerce",
        budget: 5000,
        duration: 30,
        date: "2024-03-15",
        platforms: ["Google Ads", "Facebook", "Instagram"],
        roi: 3.8,
      },
      {
        id: 2,
        name: "Lanzamiento Producto",
        category: "saas",
        budget: 8500,
        duration: 45,
        date: "2024-02-28",
        platforms: ["Google Ads", "LinkedIn", "Email Marketing", "Facebook", "Instagram"],
        roi: 2.9,
      },
      {
        id: 3,
        name: "Campaña Navidad",
        category: "retail",
        budget: 4200,
        duration: 21,
        date: "2023-12-01",
        platforms: ["Facebook", "Instagram", "TikTok"],
        roi: 4.1,
      },
    ])
  }, [])

  const filteredSimulations = simulations.filter((sim) => sim.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
            <Link href="/simulations" className="text-sm font-medium text-primary">
              Simulaciones
            </Link>
            <Link href="/reports" className="text-sm font-medium hover:text-primary">
              Informes
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:text-primary">
              Configuración
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button size="sm" asChild>
              <Link href="/new-simulation">Nueva Simulación</Link>
            </Button>
          </div>
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
          <h1 className="text-2xl font-bold tracking-tight">Simulaciones</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar simulaciones..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link href="/new-simulation">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Simulación
            </Link>
          </Button>
        </div>

        {filteredSimulations.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSimulations.map((simulation) => (
              <Card key={simulation.id}>
                <CardHeader>
                  <CardTitle>{simulation.name}</CardTitle>
                  <CardDescription>Creada el {simulation.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">${simulation.budget}</Badge>
                      <Badge variant="outline">{simulation.duration} días</Badge>
                      <Badge variant="outline">{simulation.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Plataformas:</p>
                      <div className="flex flex-wrap gap-1">
                        {simulation.platforms.map((platform) => (
                          <Badge key={platform} variant="secondary" className="mr-1 mb-1">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">ROI Estimado:</span>
                      <span className="font-medium text-green-600">{simulation.roi}x</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/simulation-results?id=${simulation.id}`}>Ver Resultados</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No se encontraron simulaciones</p>
            <Button asChild>
              <Link href="/new-simulation">Crear Nueva Simulación</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

