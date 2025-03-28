import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-background">
      <div className="text-center bg-card p-10 rounded-xl shadow-lg border border-border/40 transition-all duration-300 hover:shadow-xl hover:border-border">
        <div className="mb-6 relative inline-block">
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 blur-xl rounded-full"></div>
          <h1 className="relative text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-[0_0_0_3px_rgba(var(--primary),0.1)] hover:shadow-[0_0_0_4px_rgba(var(--primary),0.2)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
