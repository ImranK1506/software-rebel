import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-7xl font-black mb-4 text-gradient font-mono">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Lost in the void — this page isn't here</p>
        <a href="/" className="text-primary hover:text-primary-glow underline underline-offset-4 transition-colors">
          Return to base
        </a>
      </div>
    </div>
  );
};

export default NotFound;
