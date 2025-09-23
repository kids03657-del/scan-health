import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Droplets, Flame, Award } from 'lucide-react';

const DashboardSection = () => {
  const todayStats = {
    caloriesConsumed: 1450,
    caloriesTarget: 2000,
    proteinConsumed: 85,
    proteinTarget: 120,
    waterIntake: 6,
    waterTarget: 8,
    steps: 8500,
    stepsTarget: 10000
  };

  const weeklyProgress = [
    { day: 'Mon', calories: 1800, target: 2000 },
    { day: 'Tue', calories: 2100, target: 2000 },
    { day: 'Wed', calories: 1650, target: 2000 },
    { day: 'Thu', calories: 1900, target: 2000 },
    { day: 'Fri', calories: 2200, target: 2000 },
    { day: 'Sat', calories: 1750, target: 2000 },
    { day: 'Sun', calories: 1450, target: 2000 }
  ];

  const nutritionBalance = {
    carbs: 45,
    protein: 25,
    fats: 30
  };

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Nutrition Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your daily intake, monitor progress, and achieve your health goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calories */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Calories</span>
                    <span className="text-sm text-muted-foreground">
                      {todayStats.caloriesConsumed} / {todayStats.caloriesTarget}
                    </span>
                  </div>
                  <Progress 
                    value={(todayStats.caloriesConsumed / todayStats.caloriesTarget) * 100} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Consumed</span>
                    <span>{todayStats.caloriesTarget - todayStats.caloriesConsumed} remaining</span>
                  </div>
                </div>

                {/* Protein */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Protein</span>
                    <span className="text-sm text-muted-foreground">
                      {todayStats.proteinConsumed}g / {todayStats.proteinTarget}g
                    </span>
                  </div>
                  <Progress 
                    value={(todayStats.proteinConsumed / todayStats.proteinTarget) * 100} 
                    className="h-3"
                  />
                </div>

                {/* Water Intake */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-accent" />
                      Water Intake
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {todayStats.waterIntake} / {todayStats.waterTarget} glasses
                    </span>
                  </div>
                  <Progress 
                    value={(todayStats.waterIntake / todayStats.waterTarget) * 100} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Weekly Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-wellness" />
                  Weekly Calorie Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{day.calories} cal</span>
                          <span className="text-muted-foreground">Target: {day.target}</span>
                        </div>
                        <Progress 
                          value={(day.calories / day.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="font-medium">Calories Burned</span>
                  </div>
                  <span className="font-bold text-primary">420</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-wellness/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-wellness" />
                    <span className="font-medium">Steps</span>
                  </div>
                  <span className="font-bold text-wellness">{todayStats.steps.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span className="font-medium">Streak</span>
                  </div>
                  <span className="font-bold text-accent">7 days</span>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carbohydrates</span>
                      <span>{nutritionBalance.carbs}%</span>
                    </div>
                    <Progress value={nutritionBalance.carbs} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Protein</span>
                      <span>{nutritionBalance.protein}%</span>
                    </div>
                    <Progress value={nutritionBalance.protein} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fats</span>
                      <span>{nutritionBalance.fats}%</span>
                    </div>
                    <Progress value={nutritionBalance.fats} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      Balanced Diet
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Great macronutrient distribution!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Health Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Weight Loss: -2.5kg</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-wellness/5 rounded-lg">
                  <div className="w-2 h-2 bg-wellness rounded-full"></div>
                  <span className="text-sm">Muscle Gain: +1.2kg</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-accent/5 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Hydration Goal: 95%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;