// pages/api/auth.js
export default function handler(req, res) {
    // Extract tokens or error from query params
    const { access_token, refresh_token, error, type } = req.query;
    
    // If this is a successful auth callback with tokens
    if (access_token && refresh_token) {
      return res.redirect(
        `klick-content://auth-callback?access_token=${access_token}&refresh_token=${refresh_token}&type=${type || 'signup'}`
      );
    }
    
    // If there was an error
    if (error) {
      return res.redirect(`klick-content://auth-callback?error=${error}`);
    }
    
    // Default fallback
    return res.redirect(`klick-content://auth-callback`);
  }
