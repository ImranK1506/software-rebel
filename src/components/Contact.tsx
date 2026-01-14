import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "imran@softwarerebel.com",
      href: "mailto:imran@softwarerebel.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+31637336418",
      href: "tel:+31637336418"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Amsterdam, The Netherlands",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/ImranK1506"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/imran-khan-se/"
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-section text-gradient mb-6">
              Let's Build Something Rebellious
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to break some conventions? Let's discuss your next project 
              and create something that stands out from the crowd.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-8">
              <Card className="rebel-card">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Get In Touch
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a 
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="text-primary group-hover:text-primary-glow transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-medium text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
              
              <Card className="rebel-card">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Follow the Rebellion
                </h3>
                
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all glow-on-hover"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-semibold">Open to freelance:</span> Currently accepting new projects for Q2 2026.
                    Let's build something extraordinary together.
                  </p>
                </div>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;