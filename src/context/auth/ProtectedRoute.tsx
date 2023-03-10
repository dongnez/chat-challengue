import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/router";


const ProtectedRoute = (props: { children: React.ReactNode}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  

  if (loading) return <div> <h2>Cargando...</h2></div>;
  if(!user) router.push('/login')

  return <>{props.children}</>;
};

export default ProtectedRoute;
