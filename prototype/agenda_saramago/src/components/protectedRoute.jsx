import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_id'); // ou a sua lógica de autenticação

  if (!isAuthenticated) {
    // Usuário não está logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  return children; // Usuário está logado, renderize o componente protegido
};

export default ProtectedRoute;
