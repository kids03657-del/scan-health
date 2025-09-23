import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Sparkles, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-nutrition.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-wellness/10">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Nutrition Tracking
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Take a Picture of Your 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-wellness"> Meal</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Get instant nutrition analysis, personalized diet plans, and track your health goals with our AI-powered food recognition technology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                <Camera className="w-5 h-5 mr-2" />
                Try Food Scan Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 hover:bg-muted">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-muted-foreground">Foods Recognized</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-wellness">98%</div>
                <div className="text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">10K+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="NutriTrack App Interface"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-wellness rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;