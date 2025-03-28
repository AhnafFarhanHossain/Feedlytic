"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-card-foreground">
            Profile
          </h1>
        </div>
      </header>
      {/* Main content */}
      <div className="flex items-center justify-center w-full">
        <div className="bg-card mt-20 px-12 py-8 rounded-xl border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md hover:border-border">
          {session ? (
            <div className="max-w-[500px]">
              <div className="flex gap-6 items-center">
                <div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 rounded-full blur transition duration-300"></div>
                    <Image
                      src={session?.user?.image}
                      alt="Profile Picture"
                      width={150}
                      height={150}
                      className="rounded-full select-none relative ring-2 ring-border/40 group-hover:ring-primary/50 transition duration-300"
                  ></Image>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-card-foreground mb-2">
                    {session?.user?.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[500px]">
              <div className="flex gap-6 items-center">
                <div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 rounded-full blur transition duration-300"></div>
                    <Image
                      src={"/dummy-profile.png"}
                      alt="Profile Picture"
                      width={150}
                      height={150}
                      className="rounded-full select-none relative ring-2 ring-border/40 group-hover:ring-primary/50 transition duration-300"
                  ></Image>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-card-foreground mb-2">
                    Anonymous User
                  </h2>
                  <p className="text-muted-foreground">Not Signed In</p>
                  <Link href={"/authentication"}>
                    <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_0_3px_rgba(var(--primary),0.1)] hover:shadow-[0_0_0_4px_rgba(var(--primary),0.2)] mt-4">
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
