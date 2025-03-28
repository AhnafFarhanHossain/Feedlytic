const About = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <header className="bg-card shadow-md border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            About Feedlytic
          </h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-card p-8 rounded-xl shadow-lg border border-border/40 transition-all duration-300 hover:shadow-xl hover:border-border space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"/>
              </svg>
              About Us
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Feedlytic is a comprehensive platform designed to streamline the
              management of client feedback. Our mission is to provide actionable
              insights that enhance service quality and engagement. This project is
              created by Ahnaf Farhan Hossain, a senior Frontend Developer and
              Designer at TechShabaka, a leading web-dev agency in Bangladesh.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
              </svg>
              How to use Feedlytic
            </h3>
            <div className="bg-muted/50 p-6 rounded-lg border border-border/40">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Feedlytic uses Supabase as its database and backend to store and edit
                data for the app. The user can connect their SaaS or any desired
                application with this app's Supabase URL -{" "}
                <code className="px-2 py-1 bg-primary/10 text-primary rounded font-mono text-sm">
                  https://zklzsjtbtlmmefzjquzm.supabase.co
                </code>{" "}
                and then collect feedbacks/testimonials via any form or survey. This
                app uses real-time data collection thus the user can easily manage the
                feedbacks instantly after the data has been input into the database.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4-9v2h8v-2H8zm0-4v2h8V9H8zm2-4v2h4V5h-4z"/>
              </svg>
              Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Real-time feedback collection",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M5.636 12.707l1.828 1.829L8.88 13.12 7.05 11.293l1.414-1.414 1.829 1.828 1.414-1.414L9.88 8.464l1.414-1.414 1.829 1.828 1.414-1.414L12.707 5.636a2 2 0 0 0-2.828 0L5.636 9.878a2 2 0 0 0 0 2.829z"/>
                    </svg>
                  )
                },
                {
                  title: "Sentiment analysis",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0zm1-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                  )
                },
                {
                  title: "Customizable reporting",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm2 2h12v2H6V7zm0 4h12v2H6v-2zm0 4h8v2H6v-2z"/>
                    </svg>
                  )
                },
                {
                  title: "User-friendly dashboard",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm0 8v-6h8v6H3zM13 9V3h8v6h-8z"/>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border/40 transition-colors duration-200 hover:bg-muted/70">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <span className="text-foreground font-medium">{feature.title}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"/>
              </svg>
              Contact Us
            </h3>
            <p className="text-muted-foreground">
              For inquiries, please reach out to us at{" "}
              <a
                href="mailto:ahnaffarhanhossain@gmail.com"
                className="text-blue-500 underline"
              >
                ahnaffarhanhossain@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
