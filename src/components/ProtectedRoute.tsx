
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsAuthorized(false);
      } else if (adminOnly && user.email === "yekinirasheed2002@gmail.com") {
        setIsAuthorized(true);
      } else if (!adminOnly) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [adminOnly]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-tech-500 border-r-tech-300 border-b-tech-200 border-l-tech-100 rounded-full animate-spin mx-auto"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
