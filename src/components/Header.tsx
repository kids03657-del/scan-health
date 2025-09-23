import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Leaf, User, Bell } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-wellness rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">NutriTrack</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#scan" className="text-foreground hover:text-primary transition-colors">Food Scan</a>
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors">Community</a>
            <a href="#plans" className="text-foreground hover:text-primary transition-colors">Plans</a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                console.log('🔔 Bell clicked');
                alert('Notifications feature coming soon!');
              }}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                console.log('👤 User clicked');
                alert('Profile feature coming soon!');
              }}
            >
              <User className="w-5 h-5" />
            </Button>
            <AuthModal>
              <Button 
                variant="default" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => console.log('🚀 Get Started clicked')}
              >
                Get Started
              </Button>
            </AuthModal>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#home" className="block py-2 text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#scan" className="block py-2 text-foreground hover:text-primary transition-colors">Food Scan</a>
            <a href="#dashboard" className="block py-2 text-foreground hover:text-primary transition-colors">Dashboard</a>
            <a href="#community" className="block py-2 text-foreground hover:text-primary transition-colors">Community</a>
            <a href="#plans" className="block py-2 text-foreground hover:text-primary transition-colors">Plans</a>
            <div className="pt-4 space-y-2">
              <AuthModal>
                <Button variant="outline" className="w-full">Sign In</Button>
              </AuthModal>
              <AuthModal>
                <Button variant="default" className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
              </AuthModal>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;