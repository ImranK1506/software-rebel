import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "hello@softwarerebel.com",
      href: "mailto:hello@softwarerebel.com"
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
      href: "https://github.com/softwarerebel"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/softwarerebel"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      href: "https://twitter.com/softwarerebel"
    }
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
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="rebel-card">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Start a Conversation
              </h3>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="Aretoo"
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Detoo"
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="r2d2@example.com"
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Project Type
                  </label>
                  <Input 
                    placeholder="Web App, E-commerce, Dashboard, etc."
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Project Details
                  </label>
                  <Textarea 
                    placeholder="Tell me about your vision, timeline, and any specific requirements..."
                    rows={6}
                    className="bg-secondary border-border focus:border-primary resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-glow text-primary-foreground glow-on-hover"
                >
                  Send Message
                </Button>
              </form>
            </Card>
            
            {/* Contact Info */}
            <div className="space-y-8">
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
                    <span className="text-primary font-semibold">Open to freelance:</span> Currently accepting new projects for Q1 2024. 
                    Let's build something extraordinary together.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;