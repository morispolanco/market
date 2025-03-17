import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface PlatformInfoProps {
  title: string
  description: string
  selected: boolean
  onChange: () => void
}

export function PlatformInfo({ title, description, selected, onChange }: PlatformInfoProps) {
  return (
    <Card className={`relative cursor-pointer transition-colors hover:bg-muted/50 ${selected ? 'border-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Switch checked={selected} onCheckedChange={onChange} />
        </div>
      </CardHeader>
    </Card>
  )
}