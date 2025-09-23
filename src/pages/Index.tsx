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
      {/* Test Button - PROPER POSITIONING */}
      <div className="fixed top-20 left-4 z-[9999] bg-yellow-400 p-2 rounded border-4 border-red-500">
        <Button 
          onClick={handleTestClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 text-lg"
          style={{ minHeight: '50px', minWidth: '200px' }}
        >
          🔥 CLICK TEST ({clickTest}) 🔥
        </Button>
        <p className="text-black text-sm mt-1">Click me to test!</p>
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
