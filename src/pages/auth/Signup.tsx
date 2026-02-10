import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    // OTP-based auth handles both login and signup, redirect to login
    navigate('/auth/login', { replace: true });
  }, [navigate]);

  return null;
}
