"use server"

import { getOpenRouterCompletion, type OpenRouterMessage } from "@/lib/openrouter"

export async function generateMarketingRecommendations(
  category: string,
  budget: number,
  duration: number,
  audience: string,
  platforms: string[],
  productDescription = "",
  productBenefits = "",
) {
  try {
    console.log("Iniciando generación de recomendaciones de marketing")

    // Verificar parámetros de entrada
    if (!category || !budget || !duration || !platforms || platforms.length === 0) {
      console.error("Parámetros de entrada inválidos")
      return generateFallbackData(platforms, budget)
    }

    // Convertir nombres de plataformas a formato más legible para el prompt
    const platformNames = platforms.map((p) => {
      if (p === "googleAds") return "Google Ads"
      if (p === "facebook") return "Facebook"
      if (p === "instagram") return "Instagram"
      if (p === "linkedin") return "LinkedIn"
      if (p === "tiktok") return "TikTok"
      if (p === "email") return "Email Marketing"
      if (p === "influencers") return "Influencers"
      if (p === "youtube") return "YouTube"
      return p
    })

    // Crear un prompt más estructurado y claro
    const prompt = `
      Actúa como un experto en marketing digital y analiza la siguiente campaña:
      
      Categoría de producto: ${category}
      Descripción del producto: ${productDescription}
      Beneficios del producto: ${productBenefits}
      Presupuesto: $${budget}
      Duración: ${duration} días
      Audiencia objetivo: ${audience}
      Plataformas seleccionadas: ${platformNames.join(", ")}
      
      Proporciona:
      1. Una distribución óptima del presupuesto entre las plataformas seleccionadas
      2. ROI estimado para cada plataforma
      3. Métricas esperadas (alcance, clics, conversiones)
      4. 4-5 recomendaciones específicas para maximizar el rendimiento, considerando la descripción y beneficios del producto
      
      IMPORTANTE: Responde ÚNICAMENTE en formato JSON con la siguiente estructura exacta:
      {
        "distribution": [{"platform": "nombre", "percentage": número, "amount": número}],
        "metrics": {"totalReach": número, "totalClicks": número, "totalConversions": número, "averageROI": número},
        "platformMetrics": [{"name": "nombre", "roi": número, "reach": número, "clicks": número, "conversions": número, "cpc": número, "ctr": número, "convRate": número}],
        "recommendations": ["recomendación1", "recomendación2", ...]
      }
      
      No incluyas ningún texto adicional, solo el JSON.
    `

    const messages: OpenRouterMessage[] = [
      {
        role: "system",
        content:
          "Eres un experto en marketing digital que proporciona análisis precisos y recomendaciones basadas en datos. Tus respuestas deben ser ÚNICAMENTE en formato JSON válido, sin texto adicional.",
      },
      { role: "user", content: prompt },
    ]

    try {
      // Intentar obtener la respuesta
      console.log("Solicitando respuesta a OpenRouter...")
      const completion = await getOpenRouterCompletion(messages)
      console.log("Respuesta recibida, procesando...")

      // Si llegamos aquí, tenemos una respuesta en texto
      if (!completion || completion.trim() === "") {
        console.error("La respuesta está vacía")
        return generateFallbackData(platforms, budget)
      }

      // Intentar extraer y parsear el JSON
      try {
        // Primero intentamos parsear directamente
        console.log("Intentando parsear JSON directamente...")
        const jsonData = JSON.parse(completion)
        console.log("JSON parseado correctamente")
        return jsonData
      } catch (parseError) {
        console.error("Error al parsear la respuesta JSON directamente:", parseError)

        // Si falla, intentamos extraer solo la parte JSON
        console.log("Intentando extraer parte JSON...")
        const jsonMatch = completion.match(/\{[\s\S]*\}/)
        if (jsonMatch && jsonMatch[0]) {
          try {
            const jsonData = JSON.parse(jsonMatch[0])
            console.log("JSON extraído y parseado correctamente")
            return jsonData
          } catch (nestedError) {
            console.error("Error al parsear el JSON extraído:", nestedError)
          }
        } else {
          console.error("No se pudo encontrar un objeto JSON en la respuesta")
        }

        // Si todo falla, generamos datos de ejemplo
        console.log("Generando datos de ejemplo como fallback")
        return generateFallbackData(platforms, budget)
      }
    } catch (apiError) {
      console.error("Error al comunicarse con OpenRouter:", apiError)
      return generateFallbackData(platforms, budget)
    }
  } catch (error) {
    console.error("Error general al generar recomendaciones:", error)
    // Generar datos de ejemplo como fallback
    return generateFallbackData(platforms, budget)
  }
}

// Función para generar datos de ejemplo en caso de error
function generateFallbackData(platforms: string[], totalBudget: number) {
  console.log("Generando datos de fallback...")

  // Convertir nombres de plataformas a formato más legible
  const platformNames = platforms.map((p) => {
    if (p === "googleAds") return "Google Ads"
    if (p === "facebook") return "Facebook"
    if (p === "instagram") return "Instagram"
    if (p === "linkedin") return "LinkedIn"
    if (p === "tiktok") return "TikTok"
    if (p === "email") return "Email Marketing"
    if (p === "influencers") return "Influencers"
    if (p === "youtube") return "YouTube"
    return p
  })

  // Si no hay plataformas, usar algunas por defecto
  if (!platformNames.length) {
    platformNames.push("Google Ads", "Facebook", "Instagram")
  }

  // Generar distribución de presupuesto
  const distribution = platformNames.map((platform, index) => {
    // Distribuir el presupuesto de manera equitativa con pequeñas variaciones
    const percentage = Math.round(100 / platformNames.length + (Math.random() * 10 - 5))
    return {
      platform,
      percentage,
      amount: Math.round((percentage / 100) * totalBudget),
    }
  })

  // Ajustar porcentajes para que sumen 100%
  const totalPercentage = distribution.reduce((sum, item) => sum + item.percentage, 0)
  if (totalPercentage !== 100) {
    const diff = 100 - totalPercentage
    distribution[0].percentage += diff
    distribution[0].amount = Math.round((distribution[0].percentage / 100) * totalBudget)
  }

  // Generar métricas de plataforma
  const platformMetrics = platformNames.map((name, index) => {
    const budget = distribution.find((d) => d.platform === name)?.amount || 0
    const roi = (2 + Math.random() * 3).toFixed(1)
    const reach = Math.round(budget * (20 + Math.random() * 10))
    const ctr = (1 + Math.random() * 4).toFixed(1)
    const clicks = Math.round(reach * (Number.parseFloat(ctr) / 100))
    const convRate = (3 + Math.random() * 3).toFixed(1)
    const conversions = Math.round(clicks * (Number.parseFloat(convRate) / 100))

    return {
      name,
      budget,
      roi: Number.parseFloat(roi),
      reach,
      clicks,
      conversions,
      cpc: Number.parseFloat((budget / clicks).toFixed(2)) || 1.0,
      ctr: Number.parseFloat(ctr),
      convRate: Number.parseFloat(convRate),
    }
  })

  // Calcular métricas totales
  const totalReach = platformMetrics.reduce((sum, platform) => sum + platform.reach, 0)
  const totalClicks = platformMetrics.reduce((sum, platform) => sum + platform.clicks, 0)
  const totalConversions = platformMetrics.reduce((sum, platform) => sum + platform.conversions, 0)
  const averageROI = Number.parseFloat(
    (platformMetrics.reduce((sum, platform) => sum + platform.roi, 0) / platformMetrics.length).toFixed(1),
  )

  // Generar recomendaciones genéricas
  const recommendations = [
    "Aumenta el presupuesto en las plataformas con mayor ROI",
    "Segmenta tu audiencia de manera más específica para mejorar la relevancia",
    "Prueba diferentes formatos de anuncios para identificar los más efectivos",
    "Optimiza tus páginas de destino para mejorar la tasa de conversión",
    "Implementa pruebas A/B para refinar continuamente tus campañas",
  ]

  console.log("Datos de fallback generados correctamente")

  return {
    distribution,
    metrics: {
      totalReach,
      totalClicks,
      totalConversions,
      averageROI,
    },
    platformMetrics,
    recommendations,
  }
}

export async function askMarketingQuestion(question: string, context: string) {
  try {
    const messages: OpenRouterMessage[] = [
      { role: "system", content: "Eres un experto en marketing digital que proporciona respuestas claras y útiles." },
      { role: "user", content: `Contexto de mi campaña: ${context}\n\nMi pregunta es: ${question}` },
    ]

    const response = await getOpenRouterCompletion(messages)
    return response
  } catch (error) {
    console.error("Error al hacer la pregunta:", error)
    return "Lo siento, no pude procesar tu pregunta en este momento. Por favor, intenta de nuevo más tarde o reformula tu pregunta."
  }
}


try {
  // Get selected platforms
  const selectedPlatforms = Object.entries(formData.platforms)
    .filter(([_, isSelected]) => isSelected)
    .map(([platform]) => platform)

  if (selectedPlatforms.length === 0) {
    toast({
      title: "Error",
      description: "You must select at least one platform",
      variant: "destructive",
    })
    setIsLoading(false)
    return
  }

  // Show loading toast
  toast({
    title: "Generating simulation",
    description: "This may take a few seconds...",
  })

  console.log("Starting simulation generation with platforms:", selectedPlatforms)

  // Call Server Action to generate recommendations
  const simulationResults = await generateMarketingRecommendations(
    formData.category,
    formData.budget,
    formData.duration,
    formData.audience,
    selectedPlatforms,
    formData.productDescription,
    formData.productBenefits,
  )

  console.log("Simulation results received:", simulationResults ? "Valid data" : "Null data")

  // Verify results
  if (!simulationResults) {
    throw new Error("Could not generate results")
  }

  // Save results in sessionStorage for access from results page
  try {
    const dataToStore = {
      ...formData,
      results: simulationResults,
    }

    sessionStorage.setItem("simulationData", JSON.stringify(dataToStore))
    console.log("Data saved in sessionStorage")

    // Show success toast
    toast({
      title: "Simulation completed",
      description: "Redirecting to results...",
    })

    // Small delay to ensure data is saved before redirecting
    setTimeout(() => {
      router.push("/simulation-results")
    }, 500)
  } catch (storageError) {
    console.error("Error saving to sessionStorage:", storageError)

    // Continue even if there's a sessionStorage error
    toast({
      title: "Warning",
      description: "The simulation was generated but there was a problem saving the data. Results may not display correctly.",
      variant: "destructive",
    })

    // Try to redirect anyway
    setTimeout(() => {
      router.push("/simulation-results")
    }, 500)
  }
} catch (error) {
  console.error("Error generating simulation:", error)
  toast({
    title: "Error",
    description: "There was a problem generating the simulation. Example data will be shown.",
    variant: "destructive",
  })

  // Try to redirect to results with example data
  try {
    // Get selected platforms
    const selectedPlatforms = Object.entries(formData.platforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform)

    console.log("Generating example data for fallback")

    // Generate example data
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

    console.log("Example data generated successfully")

    // Save example data
    try {
      sessionStorage.setItem("simulationData", JSON.stringify(fallbackData))
      console.log("Example data saved in sessionStorage")

      // Redirect to results page
      setTimeout(() => {
        router.push("/simulation-results")
      }, 500)
    } catch (storageError) {
      console.error("Error saving example data to sessionStorage:", storageError)

      // Try to redirect anyway
      setTimeout(() => {
        router.push("/simulation-results")
      }, 500)
    }
  } catch (fallbackError) {
    console.error("Error generating example data:", fallbackError)
    toast({
      title: "Critical error",
      description: "Could not generate the simulation. Please try again later.",
      variant: "destructive",
    })
  }
} finally {
  setIsLoading(false)
}

