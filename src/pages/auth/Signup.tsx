import { Navigate } from 'react-router-dom';

// Signup is now handled via OTP on the login page (no separate signup needed)
export default function Signup() {
  return <Navigate to="/auth/login" replace />;
}
