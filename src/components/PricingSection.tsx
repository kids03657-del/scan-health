import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Crown, Zap, Star } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for getting started with nutrition tracking",
      badge: null,
      features: [
        { text: "Basic food recognition", included: true },
        { text: "Manual food logging", included: true },
        { text: "Basic nutrition dashboard", included: true },
        { text: "Water intake tracking", included: true },
        { text: "Community access", included: true },
        { text: "5 food scans per day", included: true },
        { text: "Advanced AI recognition", included: false },
        { text: "Personalized meal plans", included: false },
        { text: "Expert consultations", included: false },
        { text: "Wearable sync", included: false },
        { text: "Barcode scanner", included: false },
        { text: "Priority support", included: false }
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Premium",
      price: 9.99,
      period: "month",
      description: "Advanced features for serious health enthusiasts",
      badge: { text: "Most Popular", color: "primary" },
      features: [
        { text: "Unlimited food recognition", included: true },
        { text: "Advanced AI analysis", included: true },
        { text: "Personalized meal plans", included: true },
        { text: "Detailed nutrition insights", included: true },
        { text: "Wearable device sync", included: true },
        { text: "Barcode scanner", included: true },
        { text: "Recipe recommendations", included: true },
        { text: "Progress analytics", included: true },
        { text: "Goal-based coaching", included: true },
        { text: "Priority support", included: true },
        { text: "Expert consultations", included: false },
        { text: "Custom diet plans", included: false }
      ],
      buttonText: "Start Premium Trial",
      popular: true
    },
    {
      name: "Pro",
      price: 19.99,
      period: "month",
      description: "Complete nutrition solution with expert guidance",
      badge: { text: "Best Value", color: "accent" },
      features: [
        { text: "Everything in Premium", included: true },
        { text: "Monthly expert consultations", included: true },
        { text: "Custom diet plans", included: true },
        { text: "Supplement recommendations", included: true },
        { text: "Advanced health markers", included: true },
        { text: "Meal prep planning", included: true },
        { text: "Family sharing (up to 4)", included: true },
        { text: "White-label reports", included: true },
        { text: "API access", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Early feature access", included: true },
        { text: "Personal nutrition coach", included: true }
      ],
      buttonText: "Go Pro",
      popular: false
    }
  ];

  const annualDiscount = 20; // 20% discount for annual plans

  return (
    <section id="plans" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free and upgrade when you're ready for advanced nutrition tracking
          </p>
          
          <div className="inline-flex items-center gap-4 bg-background p-2 rounded-full">
            <Button variant="ghost" className="rounded-full">
              Monthly
            </Button>
            <Button variant="default" className="rounded-full bg-primary">
              Annual
              <Badge className="ml-2 bg-success text-success-foreground">
                Save {annualDiscount}%
              </Badge>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'border-primary border-2 shadow-lg scale-105' 
                  : 'border-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge 
                    className={`px-4 py-1 ${
                      plan.badge.color === 'primary' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {plan.badge.text}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className={`flex items-center gap-3 ${
                        !feature.included ? 'opacity-50' : ''
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : plan.name === 'Pro'
                        ? 'bg-accent hover:bg-accent/90'
                        : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                  }`}
                  size="lg"
                >
                  {plan.name === 'Pro' && <Crown className="w-4 h-4 mr-2" />}
                  {plan.name === 'Premium' && <Zap className="w-4 h-4 mr-2" />}
                  {plan.name === 'Free' && <Star className="w-4 h-4 mr-2" />}
                  {plan.buttonText}
                </Button>

                {plan.price > 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    7-day free trial • Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
                <p className="text-muted-foreground text-sm">
                  Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
                  Changes take effect at your next billing cycle.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-muted-foreground text-sm">
                  Premium and Pro plans come with a 7-day free trial. 
                  No credit card required to start your free account.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">How accurate is the food recognition?</h4>
                <p className="text-muted-foreground text-sm">
                  Our AI has 98% accuracy on over 50,000 food items and continues to improve 
                  with machine learning algorithms.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
                <p className="text-muted-foreground text-sm">
                  We offer a 30-day money-back guarantee for all paid plans. 
                  Contact support if you're not satisfied.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;