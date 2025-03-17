import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

interface PlatformInfoProps {
  title: string
  description: string
  selected: boolean
  onChange: () => void
  isLocked?: boolean
}

export function PlatformInfo({ title, description, selected, onChange, isLocked = false }: PlatformInfoProps) {
  return (
    <Card className={`relative cursor-pointer transition-colors hover:bg-muted/50 ${selected ? 'border-primary' : ''} ${isLocked ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle>{title}</CardTitle>
              {isLocked && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>
            <CardDescription>{description}</CardDescription>
          </div>
          <Switch checked={selected} onCheckedChange={onChange} disabled={isLocked} />
        </div>
      </CardHeader>
    </Card>
  )
}