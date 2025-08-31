import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import TeacherLogin from "./pages/TeacherLogin"
import { Layout } from "@/components/Layout"
import Index from "./pages/Index"
import ClassSchedule from "./pages/ClassSchedule";
import ClassSchedulingForm from "./pages/ClassSchedulingForm"
import NotFound from "./pages/NotFound"
import { AuthProvider, useAuth } from "./components/AuthContext"
import Student from "./pages/Students"
import PhotoAttendance from "./pages/PhotoAttendance"
import QRAttendance from "./pages/QRAttendance"
// import AnalyticsCharts from "./pages/AnalyticsChart";

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<TeacherLogin />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Index />} />
              <Route path="/classes" element={<ClassSchedule />} />
              <Route path="/schedule" element={<ClassSchedulingForm />} />
              <Route path="/students" element={<Student />} />
              <Route path="/photo-attendance" element={<PhotoAttendance />} />
              <Route path="/qr-attendance" element={<QRAttendance />} />
              <Route path="*" element={<NotFound />} />
              {/* <Route path="/analytics" element={<AnalyticsChart />} /> */}
              
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App