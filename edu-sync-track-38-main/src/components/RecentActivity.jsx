import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    student: "Sarah Johnson",
    class: "Computer Science 101",
    time: "2 minutes ago",
    status: "present",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    student: "Michael Chen",
    class: "Mathematics 201",
    time: "5 minutes ago",
    status: "late",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    student: "Emily Davis",
    class: "Physics 301",
    time: "8 minutes ago",
    status: "present",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    student: "James Wilson",
    class: "Chemistry 201",
    time: "12 minutes ago",
    status: "absent",
    avatar: "/placeholder.svg"
  }
]

export function RecentActivity() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success border-success/20'
      case 'late':
        return 'bg-warning/10 text-warning border-warning/20'
      case 'absent':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription className="text-muted-foreground">
          Latest attendance updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt={activity.student} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.student.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.student}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.class} • {activity.time}
                </p>
              </div>
              <Badge 
                variant="outline" 
                className={getStatusColor(activity.status)}
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}