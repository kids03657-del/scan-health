import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FoodScanSection from '@/components/FoodScanSection';
import DashboardSection from '@/components/DashboardSection';
import CommunitySection from '@/components/CommunitySection';
import GamificationSection from '@/components/GamificationSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [clickTest, setClickTest] = useState(0);

  const handleTestClick = () => {
    console.log('🎯 TEST CLICK WORKING!');
    setClickTest(prev => prev + 1);
    alert(`Button clicked ${clickTest + 1} times!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Test Button - DELETE THIS AFTER TESTING */}
      <div className="fixed top-4 right-4 z-50 bg-red-500 p-4 rounded">
        <Button 
          onClick={handleTestClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold"
        >
          TEST CLICK ({clickTest})
        </Button>
      </div>
      
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
