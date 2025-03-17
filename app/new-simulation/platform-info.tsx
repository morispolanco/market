import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PlatformInfo() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Información sobre plataformas</CardTitle>
        <CardDescription>Características, supuestos y condiciones de cada plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Google Ads</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Red de búsqueda, display, shopping y YouTube.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>CPC promedio: $1-3 (varía por industria)</li>
                  <li>CTR promedio: 1.5-3% en búsqueda, 0.5-1% en display</li>
                  <li>Tasa de conversión: 3-5% en búsqueda, 0.5-1% en display</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> Intención de compra alta, tráfico cualificado, productos/servicios
                  específicos.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Requiere palabras clave relevantes, anuncios bien optimizados y
                  páginas de destino con buena experiencia de usuario.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Facebook</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Anuncios en feed, stories, marketplace y grupos.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>CPC promedio: $0.50-$1.50</li>
                  <li>CTR promedio: 0.9%</li>
                  <li>Tasa de conversión: 1-2%</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> Construcción de marca, generación de leads, productos de consumo.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Segmentación demográfica y por intereses muy precisa, pero menor
                  intención de compra que en búsqueda.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Instagram</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Plataforma visual con anuncios en feed, stories y reels.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>CPC promedio: $0.70-$1.80</li>
                  <li>CTR promedio: 0.7%</li>
                  <li>Engagement rate: 1-3%</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> Productos visuales, moda, belleza, viajes, estilo de vida.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Requiere contenido visual de alta calidad, audiencia principalmente
                  joven (18-34 años).
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>LinkedIn</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Red profesional con anuncios en feed, InMail y contenido
                  patrocinado.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>CPC promedio: $5-$7 (más alto que otras plataformas)</li>
                  <li>CTR promedio: 0.4-0.6%</li>
                  <li>Tasa de conversión: 2-3% para B2B</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> B2B, servicios profesionales, educación superior, reclutamiento.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Costo más alto pero audiencia de mayor calidad para B2B,
                  segmentación por cargo, industria y tamaño de empresa.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>TikTok</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Plataforma de videos cortos con anuncios in-feed,
                  branded hashtag challenges y efectos de marca.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>CPC promedio: $0.50-$1.20</li>
                  <li>CTR promedio: 1-3%</li>
                  <li>Engagement rate: 3-5% (más alto que otras plataformas)</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> Marcas dirigidas a Gen Z y millennials jóvenes, productos virales,
                  contenido entretenido.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Requiere contenido auténtico y creativo, formato vertical,
                  tendencias cambiantes rápidamente.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Email Marketing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Comunicación directa con suscriptores, newsletters,
                  campañas automatizadas.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tasa de apertura promedio: 15-25%</li>
                  <li>CTR promedio: 2-5%</li>
                  <li>ROI promedio: 4.2x (uno de los más altos en marketing digital)</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> Retención de clientes, ventas recurrentes, educación de clientes,
                  promociones.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Requiere lista de suscriptores propia, cumplimiento de normativas
                  (GDPR, CAN-SPAM), contenido relevante y personalizado.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Influencers</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Colaboraciones con creadores de contenido, menciones de
                  producto, reviews, unboxings.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Engagement rate: 1-5% (varía según tamaño del influencer)</li>
                  <li>Costo: $10-$1,000+ por cada 1,000 seguidores (varía enormemente)</li>
                  <li>Tasa de conversión: 1-3%</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> Construcción de confianza, productos nuevos, demostraciones de uso,
                  nichos específicos.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Selección cuidadosa de influencers alineados con la marca, contratos
                  claros, medición de resultados más compleja.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>YouTube</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p>
                  <strong>Características principales:</strong> Anuncios pre-roll, mid-roll, bumper ads y masthead.
                </p>
                <p>
                  <strong>Métricas clave:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>CPV (costo por visualización) promedio: $0.10-$0.30</li>
                  <li>Tasa de visualización completa: 15-30%</li>
                  <li>Tiempo promedio de retención: 3-4 minutos</li>
                </ul>
                <p>
                  <strong>Mejor para:</strong> Explicaciones detalladas de productos, tutoriales, storytelling de marca,
                  contenido educativo.
                </p>
                <p>
                  <strong>Consideraciones:</strong> Requiere producción de video de calidad, posibilidad de omitir
                  anuncios después de 5 segundos, segmentación por intereses y comportamientos.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

