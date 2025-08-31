import { useState, useEffect } from "react";
import { QrCode, RefreshCw, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const QRAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [qrSession, setQrSession] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [classes, setClasses] = useState([]);
  const [unmarkedStudents, setUnmarkedStudents] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchUnmarkedStudents();
    }
  }, [selectedClass]);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setQrCode("");
            setQrSession(null);
            toast.info("QR code has expired");
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:5000/classes");
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      toast.error("Error fetching classes");
    }
  };

  const fetchUnmarkedStudents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/class/${selectedClass}/unmarked-students`);
      const data = await response.json();
      setUnmarkedStudents(data.unmarkedStudents);
    } catch (error) {
      toast.error("Error fetching student data");
    }
  };

  const generateQR = async () => {
    if (!selectedClass) {
      toast.error("Please select a class first");
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch("http://localhost:5000/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId: selectedClass,
          teacherId: "TCH001" // Demo teacher ID
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setQrCode(result.qrCode);
        setQrSession(result);
        setTimeLeft(10); // 10 seconds expiry
        toast.success("QR code generated successfully");
      } else {
        toast.error("Error generating QR code");
      }
    } catch (error) {
      toast.error("Error generating QR code");
    } finally {
      setIsGenerating(false);
    }
  };

  const refreshQR = () => {
    setQrCode("");
    setQrSession(null);
    setTimeLeft(0);
    generateQR();
  };

  const formatTime = (seconds) => {
    return `${seconds}s`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code Attendance</h1>
          <p className="text-muted-foreground mt-1">
            Generate QR codes for students to scan and mark attendance
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Generation Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Generate QR Code
            </CardTitle>
            <CardDescription>
              Select a class and generate a QR code for attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="class-select">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} - {cls.instructor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedClass && (
              <div className="space-y-2">
                <Label>Class Information</Label>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {unmarkedStudents.length} students need to mark attendance
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={generateQR}
                disabled={!selectedClass || isGenerating || timeLeft > 0}
                className="flex-1"
              >
                {isGenerating ? "Generating..." : "Generate QR Code"}
              </Button>
              
              {qrCode && timeLeft > 0 && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={refreshQR}
                  title="Refresh QR Code"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>QR Code</span>
              {timeLeft > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(timeLeft)}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Students scan this code to mark their attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {qrCode ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={qrCode} 
                    alt="Attendance QR Code" 
                    className="w-64 h-64 border rounded-lg"
                  />
                </div>
                
                {timeLeft > 0 ? (
                  <div className="text-center">
                    <div className="text-sm text-green-600 dark:text-green-400">
                      QR code is active
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Expires in {formatTime(timeLeft)}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-sm text-red-600 dark:text-red-400">
                      QR code has expired
                    </div>
                    <Button 
                      size="sm" 
                      onClick={generateQR}
                      className="mt-2"
                    >
                      Generate New Code
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <QrCode className="h-16 w-16 mb-4 opacity-50" />
                <p>No QR code generated yet</p>
                <p className="text-sm">Select a class and click "Generate QR Code"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions for Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <div className="font-medium">Open Student App</div>
                <div className="text-sm text-muted-foreground">
                  Launch the attendance app on your mobile device
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <div className="font-medium">Scan QR Code</div>
                <div className="text-sm text-muted-foreground">
                  Point your camera at the QR code displayed above
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <div className="font-medium">Verify Identity</div>
                <div className="text-sm text-muted-foreground">
                  Complete face or biometric verification as prompted
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRAttendance;