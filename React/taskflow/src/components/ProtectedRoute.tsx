import { Navigate, useLocation } from 'react-router-dom'; 
//import { useAuth } from '../features/auth/AuthContext';
import {useSelector} from "react-redux";
import type {RootState} from "../store.ts";
  
interface Props { children: React.ReactNode; } 
  
export default function ProtectedRoute({ children }: Props) { 
  //const { state } = useAuth();
  const location = useLocation();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />; 
  } 
  
  return <>{children}</>; 
} 
