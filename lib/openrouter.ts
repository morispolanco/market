export interface OpenRouterMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export interface OpenRouterResponse {
  id: string
  choices: {
    message: {
      role: string
      content: string
    }
    index: number
    finish_reason: string
  }[]
}

export async function getOpenRouterCompletion(
  messages: OpenRouterMessage[],
  model = "mistralai/mistral-7b-instruct:free",
): Promise<string> {
  try {
    // Verificar que la API key existe
    const apiKey = typeof window !== 'undefined' ? localStorage.getItem('openrouter_api_key') : null
    if (!apiKey) {
      console.error("API key de OpenRouter no configurada")
      throw new Error("API key de OpenRouter no configurada")
    }

    console.log("Enviando solicitud a OpenRouter...")

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://marketsim.vercel.app", // Requerido por OpenRouter
        "X-Title": "MarketSim", // Nombre de la aplicación
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 2000, // Limitar la longitud de la respuesta
        temperature: 0.7, // Ajustar creatividad
        stream: false, // No usar streaming para evitar problemas de parsing
      }),
    })

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error en la respuesta de OpenRouter:", errorText)
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`)
    }

    // Intentar obtener el texto de la respuesta
    const responseText = await response.text()

    // Verificar que la respuesta no está vacía
    if (!responseText || responseText.trim() === "") {
      console.error("La respuesta de OpenRouter está vacía")
      throw new Error("La respuesta de OpenRouter está vacía")
    }

    console.log("Respuesta recibida de OpenRouter (primeros 100 caracteres):", responseText.substring(0, 100))

    // Intentar parsear la respuesta como JSON
    try {
      const data = JSON.parse(responseText) as OpenRouterResponse

      // Verificar que la estructura de la respuesta es correcta
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Estructura de respuesta inesperada:", data)
        throw new Error("Estructura de respuesta inesperada")
      }

      const content = data.choices[0].message.content

      // Verificar que el contenido no está vacío
      if (!content || content.trim() === "") {
        console.error("El contenido de la respuesta está vacío")
        throw new Error("El contenido de la respuesta está vacío")
      }

      return content
    } catch (parseError) {
      console.error("Error al parsear la respuesta JSON:", parseError)
      console.error("Respuesta recibida:", responseText)
      throw new Error("Error al parsear la respuesta JSON")
    }
  } catch (error) {
    console.error("Error al obtener respuesta de OpenRouter:", error)
    throw error
  }
}

