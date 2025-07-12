import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignUpDetails from "./pages/SignUpDetails";
import SubjectSelection from "./pages/SubjectSelection";
import Dashboard from "./pages/Dashboard";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/details" element={<SignUpDetails />} />
            <Route path="/subjects" element={<SubjectSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subject/:subjectId" element={<Dashboard />} />
            <Route path="/lesson/:subjectId/:lessonId" element={<Lesson />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/index" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
