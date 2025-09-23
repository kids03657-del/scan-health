import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FoodScanSection from '@/components/FoodScanSection';
import DashboardSection from '@/components/DashboardSection';
import CommunitySection from '@/components/CommunitySection';
import GamificationSection from '@/components/GamificationSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FoodScanSection />
      <DashboardSection />
      <CommunitySection />
      <GamificationSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
