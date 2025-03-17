"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3, Download, MessageCircle, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { askMarketingQuestion } from "../actions"
import { useToast } from "@/hooks/use-toast"

export default function SimulationResults() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [simulationData, setSimulationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [askingQuestion, setAskingQuestion] = useState(false)

  useEffect(() => {
    // Recuperar los datos de la simulación de sessionStorage
    const storedData = sessionStorage.getItem("simulationData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setSimulationData(parsedData)
      } catch (error) {
        console.error("Error al parsear los datos de la simulación:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los resultados de la simulación",
          variant: "destructive",
        })
      }
    } else {
      // Si no hay datos, usar datos de ejemplo
      setSimulationData({
        name: "Campaña Q2 2024",
        category: "E-commerce / Retail",
        budget: 5000,
        duration: 30,
        audience:
          "Profesionales de 25-45 años, interesados en tecnología, con ingresos medios-altos, ubicados en zonas urbanas, que compran online regularmente",
        results: {
          metrics: {
            totalReach: 125000,
            totalClicks: 3750,
            totalConversions: 187,
            averageROI: 3.2,
          },
          platformMetrics: [
            {
              name: "Google Ads",
              budget: 1750,
              reach: 45000,
              clicks: 1800,
              conversions: 90,
              roi: 3.8,
              cpc: 0.97,
              ctr: 4.0,
              convRate: 5.0,
            },
            {
              name: "Facebook",
              budget: 1250,
              reach: 38000,
              clicks: 950,
              conversions: 38,
              roi: 2.4,
              cpc: 1.32,
              ctr: 2.5,
              convRate: 4.0,
            },
            {
              name: "Instagram",
              budget: 2000,
              reach: 42000,
              clicks: 1000,
              conversions: 59,
              roi: 3.5,
              cpc: 2.0,
              ctr: 2.38,
              convRate: 5.9,
            },
          ],
          distribution: [
            { platform: "Google Ads", percentage: 35, amount: 1750 },
            { platform: "Facebook", percentage: 25, amount: 1250 },
            { platform: "Instagram", percentage: 40, amount: 2000 },
          ],
          recommendations: [
            "Aumenta el presupuesto en Google Ads en un 20% para maximizar el ROI",
            "Considera reducir la inversión en Facebook y redirigirla a Instagram",
            "Prueba con anuncios de video en Instagram para mejorar el engagement",
            "Segmenta más específicamente por intereses tecnológicos en Google Ads",
          ],
        },
      })
    }
    setLoading(false)
  }, [toast])

  const handleAskQuestion = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setAskingQuestion(true)
    try {
      // Crear un contexto con los datos de la simulación
      const context = `
        Categoría: ${simulationData.category}
        Presupuesto: $${simulationData.budget}
        Duración: ${simulationData.duration} días
        Audiencia: ${simulationData.audience}
        ROI promedio: ${simulationData.results.metrics.averageROI}x
        Plataformas: ${simulationData.results.platformMetrics.map((p) => p.name).join(", ")}
      `

      const response = await askMarketingQuestion(question, context)
      setAnswer(response)
    } catch (error) {
      console.error("Error al hacer la pregunta:", error)
      toast({
        title: "Error",
        description: "No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setAskingQuestion(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Cargando resultados...</h2>
          <p className="text-muted-foreground">Por favor espera mientras procesamos tu simulación</p>
        </div>
      </div>
    )
  }

  if (!simulationData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">No hay datos de simulación disponibles</h2>
          <p className="text-muted-foreground mb-4">Por favor, crea una nueva simulación</p>
          <Button asChild>
            <Link href="/new-simulation">Nueva Simulación</Link>
          </Button>
        </div>
      </div>
    )
  }

  const { results } = simulationData

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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Compartir
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
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{simulationData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{simulationData.category}</Badge>
              <Badge variant="outline">${simulationData.budget}</Badge>
              <Badge variant="outline">{simulationData.duration} días</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="platforms">Plataformas</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
            <TabsTrigger value="ask">Preguntar</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{results.metrics.totalReach.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Personas únicas que verán tus anuncios</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clics Esperados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{results.metrics.totalClicks.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Interacciones directas con tus anuncios</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversiones Proyectadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{results.metrics.totalConversions}</div>
                  <p className="text-xs text-muted-foreground">Acciones completadas (compras, registros, etc.)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ROI Estimado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{results.metrics.averageROI}x</div>
                  <p className="text-xs text-muted-foreground">Retorno sobre la inversión previsto</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Distribución de Presupuesto</CardTitle>
                <CardDescription>Cómo se distribuye tu presupuesto entre las plataformas seleccionadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.distribution.map((platform) => (
                    <div key={platform.platform} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{platform.platform}</div>
                        <div className="text-sm">
                          ${platform.amount} ({platform.percentage}%)
                        </div>
                      </div>
                      <Progress value={platform.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {results.platformMetrics.map((platform) => (
                <Card key={platform.name}>
                  <CardHeader>
                    <CardTitle>{platform.name}</CardTitle>
                    <CardDescription>
                      Presupuesto: $
                      {platform.budget ||
                        (
                          (simulationData.budget *
                            (results.distribution.find((p) => p.platform === platform.name)?.percentage || 0)) /
                          100
                        ).toFixed(0)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Alcance</div>
                          <div className="text-lg font-medium">{platform.reach.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Clics</div>
                          <div className="text-lg font-medium">{platform.clicks.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Conversiones</div>
                          <div className="text-lg font-medium">{platform.conversions}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">ROI</div>
                          <div className="text-lg font-medium">{platform.roi}x</div>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-xs text-muted-foreground">CPC</div>
                            <div className="text-sm font-medium">${platform.cpc}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">CTR</div>
                            <div className="text-sm font-medium">{platform.ctr}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Conv. Rate</div>
                            <div className="text-sm font-medium">{platform.convRate}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas Comparativas</CardTitle>
                <CardDescription>Comparación de rendimiento entre plataformas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">ROI por Plataforma</h3>
                    <div className="space-y-4">
                      {results.platformMetrics.map((platform) => (
                        <div key={platform.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>{platform.name}</div>
                            <div className="font-medium">{platform.roi}x</div>
                          </div>
                          <Progress value={(platform.roi / 5) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Costo por Conversión</h3>
                    <div className="space-y-4">
                      {results.platformMetrics.map((platform) => {
                        const budget =
                          platform.budget ||
                          (simulationData.budget *
                            (results.distribution.find((p) => p.platform === platform.name)?.percentage || 0)) /
                            100
                        return (
                          <div key={platform.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>{platform.name}</div>
                              <div className="font-medium">${(budget / platform.conversions).toFixed(2)}</div>
                            </div>
                            <Progress value={100 - (budget / platform.conversions / 50) * 100} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Alcance por $ Invertido</h3>
                    <div className="space-y-4">
                      {results.platformMetrics.map((platform) => {
                        const budget =
                          platform.budget ||
                          (simulationData.budget *
                            (results.distribution.find((p) => p.platform === platform.name)?.percentage || 0)) /
                            100
                        return (
                          <div key={platform.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>{platform.name}</div>
                              <div className="font-medium">{Math.round(platform.reach / budget)}</div>
                            </div>
                            <Progress value={(platform.reach / budget / 30) * 100} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones Personalizadas</CardTitle>
                <CardDescription>Basadas en los resultados de la simulación y datos del mercado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 border rounded-lg">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                        {index + 1}
                      </div>
                      <div>{recommendation}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Distribución Óptima Recomendada</h3>
                  <div className="space-y-4">
                    {results.distribution.map((platform) => (
                      <div key={platform.platform} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>{platform.platform}</div>
                          <div className="text-sm">
                            ${platform.amount} ({platform.percentage}%)
                          </div>
                        </div>
                        <Progress value={platform.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ask" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preguntar al Experto</CardTitle>
                <CardDescription>Haz preguntas específicas sobre tu estrategia de marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAskQuestion} className="space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Ej: ¿Cómo puedo mejorar mi CTR en Google Ads? ¿Qué tipo de contenido funciona mejor en Instagram para mi audiencia?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={askingQuestion || !question.trim()}>
                    {askingQuestion ? "Consultando..." : "Preguntar"}
                  </Button>
                </form>

                {answer && (
                  <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="font-medium">Respuesta del Experto:</div>
                    </div>
                    <div className="pl-7 whitespace-pre-line">{answer}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

