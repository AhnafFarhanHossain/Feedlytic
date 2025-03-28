"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-xl shadow-lg border border-border/40 transition-all duration-300 hover:shadow-xl hover:border-border text-center max-w-md w-full">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-primary"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {session ? "Welcome Back!" : "Welcome to Feedlytic"}
          </h2>
          <p className="text-muted-foreground">
            {session
              ? `Signed in as ${session.user.email}`
              : "Please sign in to continue"}
          </p>
        </div>
        {session ? (
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground font-medium rounded-lg hover:bg-destructive/90 transition-all duration-200 shadow-[0_0_0_3px_rgba(var(--destructive),0.1)] hover:shadow-[0_0_0_4px_rgba(var(--destructive),0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                clipRule="evenodd"
              />
            </svg>
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_0_3px_rgba(var(--primary),0.1)] hover:shadow-[0_0_0_4px_rgba(var(--primary),0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 1a9 9 0 00-2.844 17.544c.45.082.614-.195.614-.434 0-.214-.008-.782-.012-1.534-2.512.546-3.042-1.21-3.042-1.21-.41-1.042-1.001-1.318-1.001-1.318-.818-.558.062-.547.062-.547.904.064 1.38.928 1.38.928.803 1.376 2.107.978 2.62.748.082-.582.314-.978.57-1.204-1.997-.228-4.098-.998-4.098-4.442 0-.982.35-1.784.928-2.414-.093-.228-.402-1.143.088-2.382 0 0 .756-.242 2.476.922.718-.2 1.488-.3 2.254-.304.766.004 1.536.104 2.254.304 1.72-1.164 2.476-.922 2.476-.922.49 1.24.182 2.154.088 2.382.578.63.928 1.432.928 2.414 0 3.452-2.104 4.212-4.106 4.436.324.278.612.826.612 1.664 0 1.2-.011 2.168-.011 2.462 0 .24.162.52.618.432A9 9 0 0010 1z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with GitHub
          </button>
        )}
      </div>
    </div>
  );
}
