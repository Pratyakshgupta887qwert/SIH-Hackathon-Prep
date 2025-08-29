import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, TrendingUp, Users, Bell, QrCode } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const StudentDashboard = () => {
  // Mock data - in real app this would come from API
  const student = {
    name: "Alex Johnson",
    id: "CS2021001",
    semester: "Fall 2024",
    program: "Computer Science",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  };

  const attendanceStats = {
    overall: 92,
    present: 46,
    total: 50,
    streak: 5
  };

  const todaysSchedule = [
    { time: "09:00 AM", subject: "Data Structures", room: "CS-201", status: "upcoming" },
    { time: "11:00 AM", subject: "Computer Networks", room: "CS-301", status: "current" },
    { time: "02:00 PM", subject: "Software Engineering", room: "CS-205", status: "upcoming" },
    { time: "04:00 PM", subject: "Database Systems", room: "CS-401", status: "upcoming" }
  ];

  const recentActivity = [
    { subject: "Data Structures", date: "Today", status: "present", time: "09:00 AM" },
    { subject: "Computer Networks", date: "Yesterday", status: "present", time: "11:00 AM" },
    { subject: "Software Engineering", date: "Yesterday", status: "absent", time: "02:00 PM" },
    { subject: "Database Systems", date: "2 days ago", status: "present", time: "04:00 PM" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-success text-success-foreground';
      case 'absent': return 'bg-destructive text-destructive-foreground';
      case 'current': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 shadow-md">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{student.name}</h1>
                <p className="text-sm text-muted-foreground">{student.id} • {student.program}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
            <NavLink to={'/'}><Button variant="outline" size="sm" className="gap-2">
                <QrCode className="h-4 w-4" />
                Scan QR
              </Button></NavLink>
              <NavLink to={'/scan'}><Button variant="outline" size="sm" className="gap-2">
                <QrCode className="h-4 w-4" />
                Scan QR
              </Button></NavLink>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-card shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{attendanceStats.overall}%</p>
                      <p className="text-sm text-muted-foreground">Overall Attendance</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={attendanceStats.overall} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              {/* hello */}

              <Card className="bg-gradient-card shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-full">
                      <Users className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{attendanceStats.present}/{attendanceStats.total}</p>
                      <p className="text-sm text-muted-foreground">Classes Attended</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-warning/10 rounded-full">
                      <Calendar className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{attendanceStats.streak}</p>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysSchedule.map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">{class_.time}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{class_.subject}</p>
                          <p className="text-sm text-muted-foreground">Room {class_.room}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(class_.status)}>
                        {class_.status === 'current' ? 'In Progress' : 'Upcoming'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Activity */}
          <div>
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'present' ? 'bg-success' : 'bg-destructive'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{activity.subject}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{activity.date}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          activity.status === 'present' 
                            ? 'border-success text-success' 
                            : 'border-destructive text-destructive'
                        }`}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;