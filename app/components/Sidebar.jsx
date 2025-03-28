"use client";
import { useState, cloneElement, useEffect } from "react";
import { usePathname } from "next/navigation"; // new import
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: (
      // Updated minimalist Home icon (house)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-600 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V13H9v8a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z"
        />
      </svg>
    ),
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      // Updated minimalist Dashboard icon (grid)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-600 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h4v4H4zM4 14h4v4H4zM14 6h4v4h-4zM14 14h4v4h-4z"
        />
      </svg>
    ),
  },
  {
    name: "Feedbacks",
    href: "/feedbacks",
    icon: (
      // Updated minimalist Feedbacks icon (chat bubble)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-600 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 8h10M7 12h4m-4 4h10M5 20l-1 2h16l-1-2M5 4h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        />
      </svg>
    ),
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: (
      // Updated minimalist Analytics icon (chart)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-600 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h4v10H3zM10 6h4v14h-4zM17 2h4v18h-4z"
        />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/settings",
    icon: (
      // Updated minimalist Settings icon (cog)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-gray-600 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <path d="M2.21232 14.0601C1.91928 12.6755 1.93115 11.2743 2.21316 9.94038C3.32308 10.0711 4.29187 9.7035 4.60865 8.93871C4.92544 8.17392 4.50032 7.22896 3.62307 6.53655C4.3669 5.3939 5.34931 4.39471 6.53554 3.62289C7.228 4.50059 8.17324 4.92601 8.93822 4.60914C9.7032 4.29227 10.0708 3.32308 9.93979 2.21281C11.3243 1.91977 12.7255 1.93164 14.0595 2.21364C13.9288 3.32356 14.2964 4.29235 15.0612 4.60914C15.8259 4.92593 16.7709 4.5008 17.4633 3.62356C18.606 4.36739 19.6052 5.3498 20.377 6.53602C19.4993 7.22849 19.0739 8.17373 19.3907 8.93871C19.7076 9.70369 20.6768 10.0713 21.7871 9.94028C22.0801 11.3248 22.0682 12.726 21.7862 14.06C20.6763 13.9293 19.7075 14.2969 19.3907 15.0616C19.0739 15.8264 19.4991 16.7714 20.3763 17.4638C19.6325 18.6064 18.6501 19.6056 17.4638 20.3775C16.7714 19.4998 15.8261 19.0743 15.0612 19.3912C14.2962 19.7081 13.9286 20.6773 14.0596 21.7875C12.675 22.0806 11.2738 22.0687 9.93989 21.7867C10.0706 20.6768 9.70301 19.708 8.93822 19.3912C8.17343 19.0744 7.22848 19.4995 6.53606 20.3768C5.39341 19.633 4.39422 18.6506 3.62241 17.4643C4.5001 16.7719 4.92552 15.8266 4.60865 15.0616C4.29179 14.2967 3.32259 13.9291 2.21232 14.0601ZM3.99975 12.2104C5.09956 12.5148 6.00718 13.2117 6.45641 14.2963C6.90564 15.3808 6.75667 16.5154 6.19421 17.5083C6.29077 17.61 6.38998 17.7092 6.49173 17.8056C7.4846 17.2432 8.61912 17.0943 9.70359 17.5435C10.7881 17.9927 11.485 18.9002 11.7894 19.9999C11.9295 20.0037 12.0697 20.0038 12.2099 20.0001C12.5143 18.9003 13.2112 17.9927 14.2958 17.5435C15.3803 17.0942 16.5149 17.2432 17.5078 17.8057C17.6096 17.7091 17.7087 17.6099 17.8051 17.5081C17.2427 16.5153 17.0938 15.3807 17.543 14.2963C17.9922 13.2118 18.8997 12.5149 19.9994 12.2105C20.0032 12.0704 20.0033 11.9301 19.9996 11.7899C18.8998 11.4856 17.9922 10.7886 17.543 9.70407C17.0937 8.61953 17.2427 7.48494 17.8052 6.49204C17.7086 6.39031 17.6094 6.2912 17.5076 6.19479C16.5148 6.75717 15.3803 6.9061 14.2958 6.4569C13.2113 6.0077 12.5144 5.10016 12.21 4.00044C12.0699 3.99666 11.9297 3.99659 11.7894 4.00024C11.4851 5.10005 10.7881 6.00767 9.70359 6.4569C8.61904 6.90613 7.48446 6.75715 6.49155 6.1947C6.38982 6.29126 6.29071 6.39047 6.19431 6.49222C6.75668 7.48509 6.90561 8.61961 6.45641 9.70407C6.00721 10.7885 5.09967 11.4855 3.99995 11.7899C3.99617 11.93 3.9961 12.0702 3.99975 12.2104ZM11.9997 15.0002C10.3428 15.0002 8.99969 13.657 8.99969 12.0002C8.99969 10.3433 10.3428 9.00018 11.9997 9.00018C13.6565 9.00018 14.9997 10.3433 14.9997 12.0002C14.9997 13.657 13.6565 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"></path>
      </svg>
    ),
  },
];

const footerNavItems = [
  {
    name: "About Feedlytic",
    href: "about",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-gray-600 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <path d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z"></path>
      </svg>
    ),
  },
  {
    name: "Sign In/Out",
    href: "authentication",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-gray-600 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <path d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"></path>
      </svg>
    ),
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // get current path
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && document.documentElement.classList.contains('dark');

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Increase icon size when sidebar is collapsed on larger screens
  const renderIcon = (icon) =>
    // Use responsive classes: w-6 h-6 on smaller devices and w-8 h-8 on md and above when sidebar is collapsed
    cloneElement(icon, {
      className: `${icon.props.className} ${!isOpen ? "w-5 h-5" : ""}`,
    });

  return (
    <>
      {/* Overlay for small screens when sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="max-[400px]:fixed max-[400px]:inset-0 max-[400px]:z-40 max-[400px]:bg-black max-[400px]:opacity-50"
        />
      )}
      <div
        className={`${
          isOpen ? "w-56 md:w-64" : "w-16 md:w-20"
        } px-2 sm:px-4 py-4 bg-sidebar dark:bg-gray-800/95 min-h-screen flex flex-col justify-between border-r border-sidebar-border transition-all duration-300 shadow-md hover:shadow-lg 
				${
          isOpen
            ? "max-[400px]:w-full max-[400px]:fixed max-[400px]:inset-0 max-[400px]:z-50 max-[400px]:overflow-hidden"
            : ""
        }`}
      >
        {/* Sidebar Header with Logo shown when expanded */}
        <div className="flex items-center justify-between mb-6 relative">
          {isOpen && (
            <div className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-primary"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"/>
              </svg>
              <span className="text-xl font-semibold text-foreground">Feedlytic</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white dark:bg-gray-700 rounded shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {isOpen ? (
              // Collapse Icon: Chevron Double Left
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <path d="M5 5H13V19H5V5ZM19 19H15V5H19V19ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM7 12L11 8.5V15.5L7 12Z"></path>
              </svg>
            ) : (
              // Expand Icon: Chevron Double Right
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <path d="M5 5H13V19H5V5ZM19 19H15V5H19V19ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4ZM11 12L7 8.5V15.5L11 12Z"></path>
              </svg>
            )}
          </button>
        </div>
        {/* ...existing Navigation Links and Footer... */}
        <nav className="flex flex-col flex-1">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${pathname === item.href ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-white font-medium" : "hover:bg-muted dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"}`}
              >
                {renderIcon(item.icon)}
                {isOpen && (
                  <span className="ml-3 text-sm font-medium transition-colors duration-200">{item.name}</span>
                )}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 my-4"></div>
          <div className="flex flex-col space-y-4">
            {footerNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-lg transition-all duration-200 hover:bg-muted dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {renderIcon(item.icon)}
                {isOpen && (
                  <span className="ml-3 text-sm font-medium transition-colors duration-200">{item.name}</span>
                )}
              </Link>
            ))}
            <div className="flex justify-center items-center px-3 py-2">
              <ThemeToggle />
            </div>
          </div>
        </nav>
        <Link href="/profile">
          {isOpen ? (
            <div className="flex flex-col items-center mt-4">
              <Image
                src={session?.user?.image || "/dummy-profile.png"}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-sm text-gray-700 mt-2">
                {session?.user?.name || "Guest"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <Image
                src={session?.user?.image || "/dummy-profile.png"}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />{" "}
            </div>
          )}
        </Link>
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Feedlytic
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
