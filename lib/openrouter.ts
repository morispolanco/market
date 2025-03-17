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
    // Verify that the API key exists
    const apiKey = typeof window !== 'undefined' ? localStorage.getItem('openrouter_api_key') : null
    if (!apiKey) {
      console.error("OpenRouter API key not configured")
      throw new Error("OpenRouter API key not configured")
    }

    console.log("Sending request to OpenRouter...")

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://marketsim.vercel.app", // Required by OpenRouter
        "X-Title": "MarketSim", // Application name
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 2000, // Limit response length
        temperature: 0.7, // Adjust creativity
        stream: false, // Don't use streaming to avoid parsing issues
      }),
    })

    // Verify if the response is successful
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error in OpenRouter response:", errorText)
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    // Try to get the response text
    const responseText = await response.text()

    // Verify that the response is not empty
    if (!responseText || responseText.trim() === "") {
      console.error("OpenRouter response is empty")
      throw new Error("OpenRouter response is empty")
    }

    console.log("Response received from OpenRouter (first 100 characters):", responseText.substring(0, 100))

    // Try to parse the response as JSON
    try {
      const data = JSON.parse(responseText) as OpenRouterResponse

      // Verify that the response structure is correct
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Unexpected response structure:", data)
        throw new Error("Unexpected response structure")
      }

      const content = data.choices[0].message.content

      // Verify that the content is not empty
      if (!content || content.trim() === "") {
        console.error("Response content is empty")
        throw new Error("Response content is empty")
      }

      return content
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError)
      console.error("Received response:", responseText)
      throw new Error("Error parsing JSON response"}
    }
  } catch (error) {
    console.error("Error al obtener respuesta de OpenRouter:", error)
    throw error
  }
}

