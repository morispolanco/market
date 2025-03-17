import Link from "next/link"
import { ArrowLeft, BarChart3, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Reports() {
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
          <h1 className="text-2xl font-bold tracking-tight">Informes</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Informe de Rendimiento</CardTitle>
              <CardDescription>Análisis comparativo de todas tus simulaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Este informe muestra el rendimiento comparativo de todas tus simulaciones de marketing.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/reports/roi-analysis">Ver Análisis Completo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análisis de ROI</CardTitle>
              <CardDescription>Evaluación detallada del retorno de inversión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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

                <div>
                  <h3 className="text-lg font-medium mb-4">ROI por Plataforma</h3>
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
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Segmentación por Industria</h3>
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
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Segmentación por Audiencia</h3>
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
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link href="/reports/roi-analysis">Ver Análisis Completo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Mercado</CardTitle>
              <CardDescription>Análisis de tendencias y oportunidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Este informe identifica tendencias emergentes y oportunidades en el mercado digital.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/reports/roi-analysis">Ver Análisis Completo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informes Personalizados</CardTitle>
            <CardDescription>Esta función estará disponible próximamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-center text-muted-foreground max-w-2xl mb-4">
                Estamos trabajando en una función que te permitirá crear informes personalizados según tus necesidades
                específicas. Podrás seleccionar métricas, plataformas y períodos de tiempo para generar informes a
                medida.
              </p>
              <Button disabled>Próximamente</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

