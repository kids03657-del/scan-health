import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Droplets, Flame, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ManualTracker from './ManualTracker';
import HealthGoalsManager from './HealthGoalsManager';

const DashboardSection = () => {
  const [todayStats, setTodayStats] = useState({
    caloriesConsumed: 0,
    caloriesTarget: 2000,
    proteinConsumed: 0,
    proteinTarget: 120,
    waterIntake: 0,
    waterTarget: 8,
    steps: 0,
    stepsTarget: 10000,
    caloriesBurned: 0
  });
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [nutritionBalance, setNutritionBalance] = useState({
    carbs: 0,
    protein: 0,
    fats: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      
      // Fetch today's stats
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      // Fetch health goals
      const { data: goalsData } = await supabase
        .from('health_goals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch today's food logs
      const { data: foodLogs } = await supabase
        .from('food_logs')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', today + 'T00:00:00.000Z')
        .lte('created_at', today + 'T23:59:59.999Z');

      // Calculate nutrition from food logs
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;

      if (foodLogs) {
        foodLogs.forEach(log => {
          totalCalories += Number(log.calories) || 0;
          totalProtein += Number(log.protein) || 0;
          totalCarbs += Number(log.carbs) || 0;
          totalFats += Number(log.fats) || 0;
        });
      }

      // Calculate nutrition percentages
      const totalMacros = totalCarbs + totalProtein + totalFats;
      const nutrition = totalMacros > 0 ? {
        carbs: Math.round((totalCarbs / totalMacros) * 100),
        protein: Math.round((totalProtein / totalMacros) * 100),
        fats: Math.round((totalFats / totalMacros) * 100)
      } : { carbs: 0, protein: 0, fats: 0 };

      setNutritionBalance(nutrition);
      
      setTodayStats({
        caloriesConsumed: totalCalories,
        caloriesTarget: goalsData?.daily_calorie_target || 2000,
        proteinConsumed: totalProtein,
        proteinTarget: goalsData?.daily_protein_target || 120,
        waterIntake: statsData?.water_intake || 0,
        waterTarget: goalsData?.daily_water_target || 8,
        steps: statsData?.steps || 0,
        stepsTarget: goalsData?.daily_steps_target || 10000,
        caloriesBurned: statsData?.calories_burned || 0
      });

      // Fetch weekly progress
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 6);
      
      const { data: weeklyData } = await supabase
        .from('food_logs')
        .select('created_at, calories')
        .eq('user_id', user.id)
        .gte('created_at', weekStart.toISOString().split('T')[0] + 'T00:00:00.000Z');

      const weeklyStats = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayLogs = weeklyData?.filter(log => 
          log.created_at.startsWith(dateStr)
        ) || [];
        
        const dayCalories = dayLogs.reduce((sum, log) => sum + (Number(log.calories) || 0), 0);
        
        weeklyStats.push({
          day: date.toLocaleDateString('en', { weekday: 'short' }),
          calories: dayCalories,
          target: goalsData?.daily_calorie_target || 2000
        });
      }
      
      setWeeklyProgress(weeklyStats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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

        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Loading your dashboard...</div>
          </div>
        ) : (
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
              {/* Manual Tracker */}
              <ManualTracker />

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
                    <span className="font-bold text-primary">{todayStats.caloriesBurned}</span>
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
                      <span className="font-medium">Food Entries</span>
                    </div>
                    <span className="font-bold text-accent">{Math.ceil(todayStats.caloriesConsumed / 200)}</span>
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
                        {nutritionBalance.carbs > 0 ? "Active Tracking" : "No Data Yet"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {nutritionBalance.carbs > 0 ? "Great macronutrient distribution!" : "Scan your first meal to see balance"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health Goals Manager */}
              <HealthGoalsManager />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardSection;