// pages/index.js or pages/[[...slug]].js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    if (!router.isReady) return;
    
    // Extract tokens from URL hash (they come after the # in the URL)
    const hashParams = {};
    const hash = window.location.hash.substring(1);
    hash.split('&').forEach(param => {
      const [key, value] = param.split('=');
      hashParams[key] = value;
    });
    
    const { access_token, refresh_token, type } = hashParams;
    
    // Redirect to mobile app with the tokens
    if (access_token && refresh_token) {
      window.location.href = `klick-content://auth-callback?access_token=${access_token}&refresh_token=${refresh_token}&type=${type || 'signup'}`;
    } else if (router.query.error) {
      window.location.href = `klick-content://auth-callback?error=${router.query.error}`;
    } else {
      window.location.href = 'klick-content://auth-callback';
    }
  }, [router.isReady]);
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Redirecting to app...</h1>
      <p>If you're not automatically redirected, please return to the app manually.</p>
    </div>
  );
}