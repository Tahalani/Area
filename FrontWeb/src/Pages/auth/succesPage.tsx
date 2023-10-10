import React, { useEffect } from 'react';

const AuthSuccess: React.FC = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('VOICI LE TOKEN avant', token);
    if (token) {
      localStorage.setItem('token', token); // Stockez le token dans le localStorage
    }
    console.log('VOICI LE TOKEN apres', localStorage.getItem('token'));
    window.location.href = 'https://are4-51.com:8081/profilPage'; // Redirigez l'utilisateur vers la page d'accueil
  }, []);

  return (
    <div>
      Redirection après l'authentification...
    </div>
  );
}

export default AuthSuccess;
