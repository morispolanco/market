import Link from "next/link"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MarketSim</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-primary">
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
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Simulaciones Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 desde el último mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Presupuesto Simulado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,500</div>
              <p className="text-xs text-muted-foreground">+15% desde el último mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2x</div>
              <p className="text-xs text-muted-foreground">+0.5x desde el último mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plataformas Analizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 desde el último mes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Plataforma</CardTitle>
              <CardDescription>ROI promedio por plataforma en las últimas simulaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de rendimiento (en desarrollo)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

