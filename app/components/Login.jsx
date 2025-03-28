"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl shadow-md border border-border/40 w-full max-w-md mx-auto">
      {session ? (
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-md">
            <img 
              src={session.user.image} 
              alt="Profile Picture" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Welcome, {session.user.name}!
          </h2>
          <p className="text-muted-foreground text-center">
            You're now signed in to your Feedlytic account.
          </p>
          <button 
            onClick={() => signOut()} 
            className="mt-4 w-full bg-destructive/90 hover:bg-destructive text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-destructive/50 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6 w-full">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-primary">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Feedlytic</h2>
            <p className="text-muted-foreground">Sign in to access your dashboard and manage feedback</p>
          </div>
          <button 
            onClick={() => signIn("github")} 
            className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign in with GitHub
          </button>
        </div>
      )}
    </div>
  );
}
export default Login;
