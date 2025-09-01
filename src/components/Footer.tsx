const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold text-gradient font-mono mb-2">
                &lt;softwarerebel /&gt;
              </div>
              <p className="text-muted-foreground text-sm">
                Breaking conventions, building the future
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm mb-1">
                © {new Date().getFullYear()} Software Rebel. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                Crafted with React, TypeScript & rebellious spirit
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;