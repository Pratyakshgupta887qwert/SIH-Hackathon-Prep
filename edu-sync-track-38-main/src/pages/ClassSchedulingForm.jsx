import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, BookOpen, Building, Users, MapPin } from "lucide-react";
import { useAuth } from "@/components/AuthContext"; // ✅ import AuthContext

const ClassSchedulingForm = () => {
  const { classes, setClasses } = useAuth(); // ✅ get global classes state

  const [formData, setFormData] = useState({
    department: "",
    course: "",
    year: "",
    subject: "",
    academicBlock: "",
    lectureTime: "",
    topic: "",
    roomNumber: "",
  });

  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Mathematics",
    "Physics",
    "Chemistry",
  ];

  const courses = [
    "Bachelor of Technology",
    "Master of Technology",
    "Bachelor of Science",
    "Master of Science",
    "Bachelor of Business Administration",
    "Master of Business Administration",
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const subjects = [
    "Data Structures",
    "Algorithms",
    "Database Management",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Machine Learning",
    "Artificial Intelligence",
  ];

  // ✅ FIX: use backticks for template literals
  const academicBlocks = Array.from({ length: 12 }, (_, i) => `AB-${i + 1}`);

  const timeSlots = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const missingFields = Object.entries(formData).filter(([_, value]) => !value);
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // ✅ Add class to global state
    setClasses([...classes, { id: Date.now(), ...formData }]);

    toast({
      title: "Class Scheduled Successfully!",
      description: `${formData.subject} scheduled at ${formData.lectureTime} in ${formData.roomNumber}`,
    });

    // Reset form
    setFormData({
      department: "",
      course: "",
      year: "",
      subject: "",
      academicBlock: "",
      lectureTime: "",
      topic: "",
      roomNumber: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-elegant border-0">
          <CardHeader className="bg-gradient-primary rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-6 w-6" />
              Schedule New Class
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Fill in the details below to schedule your lecture
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Academic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Building className="h-4 w-4 text-primary" /> Department
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => updateFormData("department", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <BookOpen className="h-4 w-4 text-primary" /> Course
                  </Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => updateFormData("course", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Users className="h-4 w-4 text-primary" /> Year
                  </Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) => updateFormData("year", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Subject</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => updateFormData("subject", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-6 text-primary">Schedule Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Building className="h-4 w-4 text-accent" /> Academic Block
                    </Label>
                    <Select
                      value={formData.academicBlock}
                      onValueChange={(value) => updateFormData("academicBlock", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Academic Block" />
                      </SelectTrigger>
                      <SelectContent>
                        {academicBlocks.map((block) => (
                          <SelectItem key={block} value={block}>
                            {block}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="h-4 w-4 text-accent" /> Lecture Time
                    </Label>
                    <Select
                      value={formData.lectureTime}
                      onValueChange={(value) => updateFormData("lectureTime", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select Time Slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="h-4 w-4 text-accent" /> Room Number
                    </Label>
                    <Input
                      placeholder="e.g., AB-1-101"
                      value={formData.roomNumber}
                      onChange={(e) => updateFormData("roomNumber", e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Topic of Lecture</Label>
                    <Input
                      placeholder="e.g., Introduction to Binary Trees"
                      value={formData.topic}
                      onChange={(e) => updateFormData("topic", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity px-12 py-3 text-lg font-semibold shadow-elegant"
                >
                  Schedule Class
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassSchedulingForm;
