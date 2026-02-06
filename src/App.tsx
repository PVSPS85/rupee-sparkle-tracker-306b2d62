import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import ChatBot from "@/components/ChatBot";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Learning from "./pages/Learning";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper - uses both Supabase auth and local store auth (for demo)
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated: supabaseAuth, isLoading } = useAuth();
  const { isAuthenticated: localAuth } = useAppStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!supabaseAuth && !localAuth) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
}

// Public Route wrapper (redirect to dashboard if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated: supabaseAuth, isLoading } = useAuth();
  const { isAuthenticated: localAuth } = useAppStore();
  
  if (isLoading) return null;
  
  if (supabaseAuth || localAuth) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <PublicRoute><Landing /></PublicRoute>
        } />
        <Route path="/auth/login" element={
          <PublicRoute><Login /></PublicRoute>
        } />
        <Route path="/auth/signup" element={
          <PublicRoute><Signup /></PublicRoute>
        } />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute><Transactions /></ProtectedRoute>
        } />
        <Route path="/budgets" element={
          <ProtectedRoute><Budgets /></ProtectedRoute>
        } />
        <Route path="/learning" element={
          <ProtectedRoute><Learning /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatBot />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
