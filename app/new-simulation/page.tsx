"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BarChart3, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { generateMarketingRecommendations } from "../actions"
import { useToast } from "@/hooks/use-toast"
import { PlatformInfo } from "./platform-info"

export default function NewSimulation() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    productDescription: "",
    productBenefits: "",
    budget: 5000,
    duration: 30,
    audience: "",
    platforms: {
      googleAds: true,
      facebook: true,
      instagram: true,
      linkedin: false,
      tiktok: false,
      email: false,
      influencers: false,
      youtube: false,
    },
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePlatformChange = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: !prev.platforms[platform],
      },
    }))
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Obtener las plataformas seleccionadas
      const selectedPlatforms = Object.entries(formData.platforms)
        .filter(([_, isSelected]) => isSelected)
        .map(([platform]) => platform)

      if (selectedPlatforms.length === 0) {
        toast({
          title: "Error",
          description: "Debes seleccionar al menos una plataforma",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Mostrar toast de carga
      toast({
        title: "Generando simulación",
        description: "Esto puede tardar unos segundos...",
      })

      console.log("Iniciando generación de simulación con plataformas:", selectedPlatforms)

      // Llamar al Server Action para generar recomendaciones
      const simulationResults = await generateMarketingRecommendations(
        formData.category,
        formData.budget,
        formData.duration,
        formData.audience,
        selectedPlatforms,
        formData.productDescription,
        formData.productBenefits,
      )

      console.log("Resultados de simulación recibidos:", simulationResults ? "Datos válidos" : "Datos nulos")

      // Verificar que tenemos resultados
      if (!simulationResults) {
        throw new Error("No se pudieron generar resultados")
      }

      // Guardar los resultados en sessionStorage para acceder desde la página de resultados
      try {
        const dataToStore = {
          ...formData,
          results: simulationResults,
        }

        sessionStorage.setItem("simulationData", JSON.stringify(dataToStore))
        console.log("Datos guardados en sessionStorage")

        // Mostrar toast de éxito
        toast({
          title: "Simulación completada",
          description: "Redirigiendo a los resultados...",
        })

        // Pequeño retraso para asegurar que los datos se guarden antes de redirigir
        setTimeout(() => {
          router.push("/simulation-results")
        }, 500)
      } catch (storageError) {
        console.error("Error al guardar en sessionStorage:", storageError)

        // Continuar aunque haya error en sessionStorage
        toast({
          title: "Advertencia",
          description:
            "Se generó la simulación pero hubo un problema al guardar los datos. Los resultados podrían no mostrarse correctamente.",
          variant: "destructive",
        })

        // Intentar redirigir de todos modos
        setTimeout(() => {
          router.push("/simulation-results")
        }, 500)
      }
    } catch (error) {
      console.error("Error al generar la simulación:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar la simulación. Se mostrarán datos de ejemplo.",
        variant: "destructive",
      })

      // Intentar redirigir a resultados con datos de ejemplo
      try {
        // Obtener las plataformas seleccionadas
        const selectedPlatforms = Object.entries(formData.platforms)
          .filter(([_, isSelected]) => isSelected)
          .map(([platform]) => platform)

        console.log("Generando datos de ejemplo para fallback")

        // Generar datos de ejemplo
        const fallbackData = {
          ...formData,
          results: await generateMarketingRecommendations(
            formData.category,
            formData.budget,
            formData.duration,
            formData.audience,
            selectedPlatforms,
            formData.productDescription,
            formData.productBenefits,
          ),
        }

        console.log("Datos de ejemplo generados correctamente")

        // Guardar los datos de ejemplo
        try {
          sessionStorage.setItem("simulationData", JSON.stringify(fallbackData))
          console.log("Datos de ejemplo guardados en sessionStorage")

          // Redirigir a la página de resultados
          setTimeout(() => {
            router.push("/simulation-results")
          }, 500)
        } catch (storageError) {
          console.error("Error al guardar datos de ejemplo en sessionStorage:", storageError)

          // Intentar redirigir de todos modos
          setTimeout(() => {
            router.push("/simulation-results")
          }, 500)
        }
      } catch (fallbackError) {
        console.error("Error al generar datos de ejemplo:", fallbackError)
        toast({
          title: "Error crítico",
          description: "No se pudo generar la simulación. Por favor, inténtalo de nuevo más tarde.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
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
          <h1 className="text-2xl font-bold tracking-tight">Nueva Simulación</h1>
        </div>

        <div className="flex flex-wrap mb-8 gap-2">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <span className="ml-2 text-sm font-medium">Producto</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <span className="ml-2 text-sm font-medium">Descripción</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium">Presupuesto</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              4
            </div>
            <span className="ml-2 text-sm font-medium">Audiencia</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 5 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              5
            </div>
            <span className="ml-2 text-sm font-medium">Plataformas</span>
          </div>
        </div>

        {step === 1 && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Definir tu producto</CardTitle>
              <CardDescription>Selecciona la categoría que mejor represente tu producto o servicio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la simulación</Label>
                <Input
                  id="name"
                  placeholder="Ej: Campaña Q2 2024"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría de producto</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce / Retail</SelectItem>
                    <SelectItem value="saas">Software / SaaS</SelectItem>
                    <SelectItem value="education">Educación / Cursos</SelectItem>
                    <SelectItem value="finance">Finanzas / Seguros</SelectItem>
                    <SelectItem value="health">Salud / Bienestar</SelectItem>
                    <SelectItem value="travel">Viajes / Turismo</SelectItem>
                    <SelectItem value="realestate">Inmobiliaria</SelectItem>
                    <SelectItem value="food">Alimentación / Restaurantes</SelectItem>
                    <SelectItem value="entertainment">Entretenimiento / Media</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 flex justify-end">
                <Button onClick={nextStep} disabled={!formData.name || !formData.category}>
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Descripción del producto</CardTitle>
              <CardDescription>Describe tu producto o servicio y sus principales beneficios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="productDescription">¿Qué es tu producto o servicio?</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Describe brevemente qué es tu producto o servicio, para qué sirve y cómo funciona.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="productDescription"
                  placeholder="Ej: Nuestra aplicación móvil permite a los usuarios realizar seguimiento de sus hábitos diarios y establecer metas personales..."
                  className="min-h-[100px]"
                  value={formData.productDescription}
                  onChange={(e) => handleChange("productDescription", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="productBenefits">¿Cuáles son los principales beneficios?</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Enumera los beneficios clave que tu producto o servicio ofrece a los usuarios. ¿Qué problemas
                          resuelve?
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="productBenefits"
                  placeholder="Ej: 1. Ahorra tiempo al automatizar tareas repetitivas. 2. Reduce costos operativos en un 30%. 3. Mejora la productividad del equipo..."
                  className="min-h-[100px]"
                  value={formData.productBenefits}
                  onChange={(e) => handleChange("productBenefits", e.target.value)}
                />
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Atrás
                </Button>
                <Button onClick={nextStep} disabled={!formData.productDescription || !formData.productBenefits}>
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Establecer tu presupuesto</CardTitle>
              <CardDescription>Indica la cantidad que planeas invertir y el plazo de tu campaña</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="budget">Presupuesto total</Label>
                  <div className="text-2xl font-bold">${formData.budget.toLocaleString()}</div>
                </div>
                <Slider
                  id="budget"
                  min={100}
                  max={1000}
                  step={50}
                  value={[formData.budget]}
                  onValueChange={(value) => handleChange("budget", value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$100</span>
                  <span>$1,000</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="duration">Duración de la campaña</Label>
                  <div className="text-lg font-medium">{formData.duration} días</div>
                </div>
                <Slider
                  id="duration"
                  min={2}
                  max={30}
                  step={1}
                  value={[formData.duration]}
                  onValueChange={(value) => handleChange("duration", value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>2 días</span>
                  <span>30 días</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Atrás
                </Button>
                <Button onClick={nextStep}>Continuar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Describir tu audiencia objetivo</CardTitle>
              <CardDescription>Cuanto más específica sea tu descripción, mejores serán los resultados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="audience">Descripción de la audiencia</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Incluye datos demográficos (edad, género, ubicación), intereses, comportamientos de compra y
                          cualquier otra información relevante.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id="audience"
                  placeholder="Ej: Profesionales de 25-45 años, interesados en tecnología, con ingresos medios-altos, ubicados en zonas urbanas, que compran online regularmente..."
                  className="min-h-[150px]"
                  value={formData.audience}
                  onChange={(e) => handleChange("audience", e.target.value)}
                />
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Atrás
                </Button>
                <Button onClick={nextStep} disabled={!formData.audience}>
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Seleccionar plataformas</CardTitle>
              <CardDescription>Elige las plataformas que deseas incluir en tu simulación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(formData.platforms).map(([platform, isSelected]) => (
                  <div
                    key={platform}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${isSelected ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                    onClick={() => handlePlatformChange(platform)}
                  >
                    <div className="font-medium">
                      {platform === "googleAds" ? "Google Ads" :
                       platform === "facebook" ? "Facebook" :
                       platform === "instagram" ? "Instagram" :
                       platform === "linkedin" ? "LinkedIn" :
                       platform === "tiktok" ? "TikTok" :
                       platform === "email" ? "Email Marketing" :
                       platform === "influencers" ? "Influencers" :
                       platform === "youtube" ? "YouTube" :
                       platform}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Atrás
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Generando..." : "Generar simulación"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

