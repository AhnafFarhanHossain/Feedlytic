"use client";
import useSession from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user.name}!</p>
          <img src={session.user.image} alt="Profile Picture" width={50} />
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      )}
    </div>
  );
};

export default Login;
