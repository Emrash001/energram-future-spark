
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

// The super admin email for initial seeding
const SUPER_ADMIN_EMAIL = "yekinirasheed2002@gmail.com";
const INITIAL_ADMINS = [
  "durosarovic@gmail.com",
  "lauretteibekwe@gmail.com"
];

export const useGoogleAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Check for user document in Firestore
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            // User exists, get role
            const userData = userSnap.data();
            setIsAdmin(userData.role === "admin" || userData.role === "super_admin");
            setIsSuperAdmin(userData.role === "super_admin");
          } else {
            // First-time user, create document with appropriate role
            let role = "user";
            
            // Seed initial admins
            if (firebaseUser.email === SUPER_ADMIN_EMAIL) {
              role = "super_admin";
            } else if (INITIAL_ADMINS.includes(firebaseUser.email || "")) {
              role = "admin";
            }
            
            await setDoc(userRef, {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: role,
              createdAt: new Date()
            });
            
            setIsAdmin(role === "admin" || role === "super_admin");
            setIsSuperAdmin(role === "super_admin");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          // Fallback to default values
          setIsAdmin(false);
          setIsSuperAdmin(false);
        }
      } else {
        // User signed out
        setIsAdmin(false);
        setIsSuperAdmin(false);
      }
      
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
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists() && ["admin", "super_admin"].includes(userSnap.data().role)) {
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

  return { user, isLoading, signInWithGoogle, signOut, isAdmin, isSuperAdmin };
};
