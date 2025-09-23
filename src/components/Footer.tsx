import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-wellness rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">NutriTrack</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              AI-powered nutrition tracking that helps you achieve your health goals through 
              smart food recognition and personalized insights.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="text-background hover:bg-background/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background hover:bg-background/10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background hover:bg-background/10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-background hover:bg-background/10">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-background/80 hover:text-background transition-colors">Home</a></li>
              <li><a href="#scan" className="text-background/80 hover:text-background transition-colors">Food Scanner</a></li>
              <li><a href="#dashboard" className="text-background/80 hover:text-background transition-colors">Dashboard</a></li>
              <li><a href="#community" className="text-background/80 hover:text-background transition-colors">Community</a></li>
              <li><a href="#plans" className="text-background/80 hover:text-background transition-colors">Pricing</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Food Database</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-background/80">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">support@nutritrack.com</span>
                </div>
                <div className="flex items-center gap-3 text-background/80">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-background/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-background/80 text-sm mb-3">
                Get nutrition tips and updates delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} NutriTrack. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/60">
              <a href="#" className="hover:text-background transition-colors">Privacy</a>
              <a href="#" className="hover:text-background transition-colors">Terms</a>
              <a href="#" className="hover:text-background transition-colors">Cookies</a>
              <a href="#" className="hover:text-background transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;