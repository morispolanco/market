import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings">Configurar API</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/new-simulation">Nueva Simulación</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bienvenido a MarketSim</h1>
              <p className="text-muted-foreground">Simula, analiza y optimiza tus estrategias de marketing digital</p>
            </div>
            <Button asChild>
              <Link href="/new-simulation">Nueva Simulación</Link>
            </Button>
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full lg:col-span-2">
              <CardHeader>
                <CardTitle>Simulaciones Recientes</CardTitle>
                <CardDescription>Tus últimas 5 simulaciones de marketing digital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                    <div>Nombre</div>
                    <div>Presupuesto</div>
                    <div>Plataformas</div>
                    <div>ROI Est.</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">Campaña Q2 2024</div>
                    <div>$5,000</div>
                    <div>4</div>
                    <div className="font-medium text-green-600">3.8x</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">Lanzamiento Producto</div>
                    <div>$8,500</div>
                    <div>5</div>
                    <div className="font-medium text-green-600">2.9x</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">Campaña Navidad</div>
                    <div>$4,200</div>
                    <div>3</div>
                    <div className="font-medium text-green-600">4.1x</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">Promoción Verano</div>
                    <div>$3,800</div>
                    <div>3</div>
                    <div className="font-medium text-green-600">3.5x</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 text-sm">
                    <div className="font-medium">Webinar Tech</div>
                    <div>$3,000</div>
                    <div>2</div>
                    <div className="font-medium text-amber-600">2.1x</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Plataformas Recomendadas</CardTitle>
                <CardDescription>Basado en tus simulaciones anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Google Ads</div>
                    <div className="text-sm text-green-600">4.2x ROI</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Instagram</div>
                    <div className="text-sm text-green-600">3.8x ROI</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Email Marketing</div>
                    <div className="text-sm text-green-600">5.1x ROI</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-amber-600">2.4x ROI</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">TikTok</div>
                    <div className="text-sm text-amber-600">2.2x ROI</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

