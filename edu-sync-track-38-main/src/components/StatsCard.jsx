import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCard({ title, value, change, changeType = 'neutral', icon: Icon }) {
  const changeColor = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground'
  }[changeType]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className={`text-xs ${changeColor} mt-1`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )
}