import { StatsCard } from "@/components/StatsCard";
import { AttendanceChart } from "@/components/AttendanceChart";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, Calendar, CheckCircle, AlertTriangle, QrCode, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/stats");
      const data = await response.json();
      setDashboardStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };
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
          <Button onClick={() => navigate("/photo-attendance")}>
            <Camera className="h-4 w-4 mr-2" />
            Photo Attendance
          </Button>
          <Button variant="outline" onClick={() => navigate("/qr-attendance")}>
            <QrCode className="h-4 w-4 mr-2" />
            QR Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={loading ? "..." : dashboardStats?.totalStudents.toString() || "0"}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Today's Attendance"
          value={loading ? "..." : `${dashboardStats?.todayAttendanceRate || 0}%`}
          change={loading ? "..." : `${dashboardStats?.todayAttendance || 0} students present`}
          changeType={dashboardStats?.todayAttendanceRate > 80 ? "positive" : "negative"}
          icon={CheckCircle}
        />
        <StatsCard
          title="Active Classes"
          value={loading ? "..." : dashboardStats?.totalClasses.toString() || "0"}
          change="3 classes today"
          changeType="neutral"
          icon={Calendar}
        />
        <StatsCard
          title="At Risk Students"
          value={loading ? "..." : dashboardStats?.atRiskStudentsCount.toString() || "0"}
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
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Common attendance management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => navigate("/photo-attendance")}
            >
              <Camera className="h-6 w-6" />
              <span className="text-sm">Photo Attendance</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => navigate("/qr-attendance")}
            >
              <QrCode className="h-6 w-6" />
              <span className="text-sm">QR Attendance</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => navigate("/students")}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">View All Students</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => navigate("/classes")}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Class Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;