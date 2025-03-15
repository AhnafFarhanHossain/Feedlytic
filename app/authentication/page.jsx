"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        {session ? (
          <>
            <p className="mb-4">
              Signed in as <strong>{session.user.email}</strong>
            </p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">Not signed in</p>
            <button
              onClick={() => signIn("github")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Sign in with GitHub
            </button>
          </>
        )}
      </div>
    </div>
  );
}
