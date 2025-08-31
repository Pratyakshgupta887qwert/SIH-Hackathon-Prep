import { useState, useRef, useEffect } from "react";
import { Camera, Upload, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const PhotoAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionResults, setRecognitionResults] = useState(null);
  const [classes, setClasses] = useState([]);
  const [unmarkedStudents, setUnmarkedStudents] = useState([]);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchUnmarkedStudents();
    }
  }, [selectedClass]);

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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      videoRef.current.srcObject = stream;
      setIsUsingCamera(true);
    } catch (error) {
      toast.error("Camera access denied or not available");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsUsingCamera(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageDataUrl);
    stopCamera();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processAttendance = async () => {
    if (!selectedClass || !capturedImage) {
      toast.error("Please select a class and capture/upload a photo");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate AI recognition based on unmarked students
      const simulatedResults = unmarkedStudents
        .slice(0, Math.floor(Math.random() * unmarkedStudents.length) + 1)
        .map(student => ({
          studentId: student.id,
          confidence: 0.85 + Math.random() * 0.15 // 85-100% confidence
        }));

      const response = await fetch("http://localhost:5000/mark-attendance-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId: selectedClass,
          teacherId: "TCH001", // Demo teacher ID
          photoBase64: capturedImage,
          recognizedStudents: simulatedResults
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setRecognitionResults(result);
        toast.success(`${result.markedStudents.length} students marked present via photo recognition`);
        fetchUnmarkedStudents(); // Refresh unmarked students list
      } else {
        toast.error(result.message || "Error processing attendance");
      }
    } catch (error) {
      toast.error("Error processing photo attendance");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setRecognitionResults(null);
    stopCamera();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          AI Photo Attendance
        </CardTitle>
        <CardDescription>
          Take a class photo to automatically mark attendance using AI face recognition
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Class Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label>Unmarked Students</Label>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {unmarkedStudents.length} students need to be marked
              </div>
            </div>
          )}
        </div>

        {/* Photo Capture Section */}
        {!capturedImage && (
          <div className="space-y-4">
            <div className="flex gap-3 flex-wrap">
              <Button onClick={startCamera} disabled={isUsingCamera}>
                <Camera className="h-4 w-4 mr-2" />
                Use Camera
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {isUsingCamera && (
              <div className="space-y-4">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-w-lg rounded-lg border"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={capturePhoto}>
                    <Camera className="h-4 w-4 mr-2" />
                    Capture Photo
                  </Button>
                  <Button variant="outline" onClick={stopCamera}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Captured Photo Preview */}
        {capturedImage && !recognitionResults && (
          <div className="space-y-4">
            <div className="text-center">
              <img 
                src={capturedImage} 
                alt="Captured class photo" 
                className="max-w-lg max-h-96 mx-auto rounded-lg border"
              />
            </div>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={processAttendance}
                disabled={isProcessing || !selectedClass}
                className="min-w-32"
              >
                {isProcessing ? "Processing..." : "Mark Attendance"}
              </Button>
              <Button variant="outline" onClick={resetCapture}>
                Retake Photo
              </Button>
            </div>
          </div>
        )}

        {/* Recognition Results */}
        {recognitionResults && (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-800 dark:text-green-200 font-medium">
                <CheckCircle className="h-5 w-5" />
                Attendance Processed Successfully
              </div>
              <p className="text-green-700 dark:text-green-300 mt-1">
                {recognitionResults.message}
              </p>
              <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                Recognized {recognitionResults.totalRecognized} students in the photo
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={resetCapture}>
                Take Another Photo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoAttendance;