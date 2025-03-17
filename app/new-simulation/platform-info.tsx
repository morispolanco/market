import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PlatformInfo() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Plataformas de Marketing</CardTitle>
        <CardDescription>Selecciona las plataformas que deseas incluir en tu campaña</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Google Ads</AccordionTrigger>
            <AccordionContent>
              <p>Red de búsqueda y display para anuncios altamente segmentados con intención de compra.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Facebook</AccordionTrigger>
            <AccordionContent>
              <p>Plataforma social para anuncios en feed, stories y marketplace.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Instagram</AccordionTrigger>
            <AccordionContent>
              <p>Plataforma visual para anuncios en feed, stories y reels.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>LinkedIn</AccordionTrigger>
            <AccordionContent>
              <p>Red profesional para anuncios B2B y contenido corporativo.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>TikTok</AccordionTrigger>
            <AccordionContent>
              <p>Plataforma de videos cortos para contenido viral y engagement con audiencia joven.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Email Marketing</AccordionTrigger>
            <AccordionContent>
              <p>Canal directo para newsletters y campañas personalizadas.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Influencers</AccordionTrigger>
            <AccordionContent>
              <p>Colaboraciones con creadores de contenido para mayor alcance y credibilidad.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>YouTube</AccordionTrigger>
            <AccordionContent>
              <p>Plataforma de video para anuncios y contenido de marca.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

