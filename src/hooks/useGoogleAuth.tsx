
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

// Super Admin email with absolute authority
const SUPER_ADMIN_EMAIL = "yekinirasheed2002@gmail.com";

// List of all admin emails (including super admin)
const ADMIN_EMAILS = [
  SUPER_ADMIN_EMAIL,
  "durosarovic@gmail.com",
  "lauretteibekwe@gmail.com"
];

export const useGoogleAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      toast({
        title: "Signed in successfully",
        description: `Welcome, ${result.user.displayName}!`,
        variant: "default"
      });
      
      // If admin user, redirect to admin dashboard
      if (result.user.email && ADMIN_EMAILS.includes(result.user.email)) {
        navigate("/admin");
      } else {
        // For regular users, redirect to home or return to previous page
        const origin = location.state?.from || "/";
        navigate(origin);
      }
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Could not sign in with Google",
        variant: "destructive"
      });
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
        variant: "default"
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not sign out",
        variant: "destructive"
      });
    }
  };

  // Role-based access control
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);
  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;

  return { user, isLoading, signInWithGoogle, signOut, isAdmin, isSuperAdmin };
};
