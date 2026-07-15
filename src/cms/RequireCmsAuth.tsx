import { Navigate, useLocation } from 'react-router-dom';
import { useCmsAuth } from './useCmsAuth';

const RequireCmsAuth = ({ children }: { children: React.ReactNode }) => {
  const { session, isAdmin, loading } = useCmsAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-gray-400">
        Loading...
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/cms/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireCmsAuth;
