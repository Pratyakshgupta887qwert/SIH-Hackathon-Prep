import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Mon', present: 85, absent: 15 },
  { name: 'Tue', present: 78, absent: 22 },
  { name: 'Wed', present: 92, absent: 8 },
  { name: 'Thu', present: 88, absent: 12 },
  { name: 'Fri', present: 75, absent: 25 },
]

export function AttendanceChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">Weekly Attendance Overview</CardTitle>
        <CardDescription className="text-muted-foreground">
          Attendance patterns for the current week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" className="text-muted-foreground" />
            <YAxis className="text-muted-foreground" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Bar 
              dataKey="present" 
              fill="hsl(var(--primary))" 
              name="Present"
              radius={[2, 2, 0, 0]} 
            />
            <Bar 
              dataKey="absent" 
              fill="hsl(var(--destructive))" 
              name="Absent"
              radius={[2, 2, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}