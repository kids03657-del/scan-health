import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Droplets, Flame, Award, Edit3, Save, X } from 'lucide-react';

const DashboardSection = () => {
  const [quickStats, setQuickStats] = useState({
    caloriesBurned: 420,
    steps: 8500,
    streak: 7
  });
  
  const [healthGoals, setHealthGoals] = useState({
    weightLoss: 2.5,
    muscleGain: 1.2,
    hydrationGoal: 95
  });
  
  const [editingQuickStats, setEditingQuickStats] = useState(false);
  const [editingHealthGoals, setEditingHealthGoals] = useState(false);
  
  const [tempQuickStats, setTempQuickStats] = useState(quickStats);
  const [tempHealthGoals, setTempHealthGoals] = useState(healthGoals);

  const handleSaveQuickStats = () => {
    setQuickStats(tempQuickStats);
    setEditingQuickStats(false);
  };

  const handleCancelQuickStats = () => {
    setTempQuickStats(quickStats);
    setEditingQuickStats(false);
  };

  const handleSaveHealthGoals = () => {
    setHealthGoals(tempHealthGoals);
    setEditingHealthGoals(false);
  };

  const handleCancelHealthGoals = () => {
    setTempHealthGoals(healthGoals);
    setEditingHealthGoals(false);
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

        <div className="grid lg:grid-cols-2 gap-8">
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
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Manual Stats */}
          <div className="space-y-6">
            {/* Manual Quick Stats */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                  {!editingQuickStats ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditingQuickStats(true)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleSaveQuickStats}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleCancelQuickStats}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!editingQuickStats ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <span className="font-medium">Calories Burned</span>
                      </div>
                      <span className="font-bold text-primary">{quickStats.caloriesBurned}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-wellness/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-wellness" />
                        <span className="font-medium">Steps</span>
                      </div>
                      <span className="font-bold text-wellness">{quickStats.steps.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        <span className="font-medium">Streak</span>
                      </div>
                      <span className="font-bold text-accent">{quickStats.streak} days</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="calories-burned">Calories Burned</Label>
                      <Input
                        id="calories-burned"
                        type="number"
                        value={tempQuickStats.caloriesBurned}
                        onChange={(e) => setTempQuickStats({
                          ...tempQuickStats,
                          caloriesBurned: parseInt(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="steps">Steps</Label>
                      <Input
                        id="steps"
                        type="number"
                        value={tempQuickStats.steps}
                        onChange={(e) => setTempQuickStats({
                          ...tempQuickStats,
                          steps: parseInt(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="streak">Streak (days)</Label>
                      <Input
                        id="streak"
                        type="number"
                        value={tempQuickStats.streak}
                        onChange={(e) => setTempQuickStats({
                          ...tempQuickStats,
                          streak: parseInt(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Manual Health Goals */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Health Goals</CardTitle>
                  {!editingHealthGoals ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditingHealthGoals(true)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleSaveHealthGoals}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleCancelHealthGoals}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {!editingHealthGoals ? (
                  <>
                    <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Weight Loss: -{healthGoals.weightLoss}kg</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-wellness/5 rounded-lg">
                      <div className="w-2 h-2 bg-wellness rounded-full"></div>
                      <span className="text-sm">Muscle Gain: +{healthGoals.muscleGain}kg</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-accent/5 rounded-lg">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Hydration Goal: {healthGoals.hydrationGoal}%</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="weight-loss">Weight Loss Target (kg)</Label>
                      <Input
                        id="weight-loss"
                        type="number"
                        step="0.1"
                        value={tempHealthGoals.weightLoss}
                        onChange={(e) => setTempHealthGoals({
                          ...tempHealthGoals,
                          weightLoss: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="muscle-gain">Muscle Gain Target (kg)</Label>
                      <Input
                        id="muscle-gain"
                        type="number"
                        step="0.1"
                        value={tempHealthGoals.muscleGain}
                        onChange={(e) => setTempHealthGoals({
                          ...tempHealthGoals,
                          muscleGain: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hydration-goal">Hydration Goal (%)</Label>
                      <Input
                        id="hydration-goal"
                        type="number"
                        value={tempHealthGoals.hydrationGoal}
                        onChange={(e) => setTempHealthGoals({
                          ...tempHealthGoals,
                          hydrationGoal: parseInt(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;