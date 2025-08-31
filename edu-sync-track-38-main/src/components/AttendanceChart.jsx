import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { useState, useEffect } from 'react'

export function AttendanceChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  const fetchWeeklyData = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/stats");
      const stats = await response.json();
      
      const chartData = stats.weeklyStats?.map(stat => ({
        name: stat.day,
        present: stat.present,
        absent: stat.total - stat.present,
        rate: stat.rate
      })) || [];
      
      setData(chartData);
    } catch (error) {
      console.error("Error fetching weekly data:", error);
      // Fallback data
      setData([
        { name: 'Mon', present: 0, absent: 5 },
        { name: 'Tue', present: 0, absent: 5 },
        { name: 'Wed', present: 0, absent: 5 },
        { name: 'Thu', present: 0, absent: 5 },
        { name: 'Fri', present: 0, absent: 5 },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-foreground">Weekly Attendance Overview</CardTitle>
        <CardDescription className="text-muted-foreground">
          {loading ? "Loading attendance data..." : "Attendance patterns for the current week"}
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