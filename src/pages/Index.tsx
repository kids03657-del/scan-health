import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FoodScanSection from '@/components/FoodScanSection';
import DashboardSection from '@/components/DashboardSection';
import GamificationSection from '@/components/GamificationSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FoodScanSection />
      <DashboardSection />
      <GamificationSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
