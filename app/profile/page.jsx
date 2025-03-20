"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>
        </div>
      </header>
      {/* Main content */}
      <div className="flex items-center justify-center w-full">
        <div className="bg-gray-100 mt-20 px-12 py-8 rounded shadow-md">
          {session ? (
            <div className="max-w-[500px]">
              <div className="flex gap-6 items-center">
                <div>
                  <Image
                    src={session?.user?.image}
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full select-none"
                  ></Image>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    {session?.user?.name}
                  </h2>
                  <p className="text-gray-600">{session?.user?.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[500px]">
              <div className="flex gap-6 items-center">
                <div>
                  <Image
                    src={"/dummy-profile.png"}
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full select-none"
                  ></Image>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    Anonymous User
                  </h2>
                  <p className="text-gray-600">Not Signed In</p>
                  <Link href={"/authentication"}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded font-bold cursor-pointer mt-4">
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
