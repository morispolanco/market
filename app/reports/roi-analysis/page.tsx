import Link from "next/link"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ROIAnalysis() {
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
            <Link href="/reports" className="text-sm font-medium text-primary">
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
            <Link href="/reports">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Informes
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Análisis de ROI</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen General</CardTitle>
              <CardDescription>Métricas clave de rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">ROI Promedio</div>
                  <div className="text-2xl font-bold">3.2x</div>
                  <div className="text-xs text-muted-foreground">+0.5x vs mes anterior</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Inversión Total</div>
                  <div className="text-2xl font-bold">$24,500</div>
                  <div className="text-xs text-muted-foreground">+15% vs mes anterior</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Ingresos</div>
                  <div className="text-2xl font-bold">$78,400</div>
                  <div className="text-xs text-muted-foreground">+22% vs mes anterior</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Beneficio Neto</div>
                  <div className="text-2xl font-bold">$53,900</div>
                  <div className="text-xs text-muted-foreground">+25% vs mes anterior</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ROI por Plataforma</CardTitle>
                <CardDescription>Rendimiento por canal de marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Google Ads</div>
                      <div className="text-green-600">4.2x</div>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Instagram</div>
                      <div className="text-green-600">3.8x</div>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Facebook</div>
                      <div className="text-green-600">3.5x</div>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-amber-600">2.4x</div>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias de ROI</CardTitle>
                <CardDescription>Evolución mensual del ROI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Gráfico de tendencias (en desarrollo)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Segmentación por Industria</CardTitle>
                <CardDescription>ROI por sector de mercado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>Tecnología</div>
                      <div className="text-green-600">4.5x</div>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>E-commerce</div>
                      <div className="text-green-600">3.8x</div>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>Servicios</div>
                      <div className="text-amber-600">2.9x</div>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segmentación por Audiencia</CardTitle>
                <CardDescription>ROI por grupo demográfico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>25-34 años</div>
                      <div className="text-green-600">4.2x</div>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>35-44 años</div>
                      <div className="text-green-600">3.6x</div>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>45-54 años</div>
                      <div className="text-amber-600">2.8x</div>
                    </div>
                    <Progress value={56} className="h-2" />
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