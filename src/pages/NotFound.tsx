const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="mb-4 font-mono text-7xl font-black text-gradient">404</h1>
      <p className="mb-6 text-xl text-muted-foreground">Lost in the void — this page isn't here</p>
      <a
        href="/"
        className="text-primary underline underline-offset-4 transition-colors hover:text-primary-glow"
      >
        Return to base
      </a>
    </div>
  </main>
);

export default NotFound;
