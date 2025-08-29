import { StatsCard } from "@/components/StatsCard";
import { AttendanceChart } from "@/components/AttendanceChart";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, Calendar, CheckCircle, AlertTriangle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage attendance across all classes
          </p>
        </div>
        <div className="flex gap-3">
          
          {/* <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Class
          </Button> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Today's Attendance"
          value="89.4%"
          change="+2.1% from yesterday"
          changeType="positive"
          icon={CheckCircle}
        />
        <StatsCard
          title="Active Classes"
          value="23"
          change="3 classes today"
          changeType="neutral"
          icon={Calendar}
        />
        <StatsCard
          title="At Risk Students"
          value="18"
          change="-3 from last week"
          changeType="positive"
          icon={AlertTriangle}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <AttendanceChart />
        
        <RecentActivity />
      </div>

      {/* Quick Actions */}
      <Card>
        {/* <CardHeader> */}
          {/* <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent> */}
          {/* <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <QrCode className="h-6 w-6" />
              <span className="text-sm">Start QR Attendance</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">View All Students</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Class Schedule</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="text-sm">At-Risk Report</span>
            </Button>
          </div> */}
        {/* </CardContent> */}
      </Card>
    </div>
  );
};

export default Index;