import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Flame, Zap, Gift, Calendar, Medal, Star } from 'lucide-react';

const GamificationSection = () => {
  const challenges = [
    {
      id: 1,
      title: "Hydration Hero",
      description: "Drink 8 glasses of water daily for 7 days",
      progress: 85,
      reward: "50 points + Hydration Badge",
      timeLeft: "2 days left",
      difficulty: "Easy",
      participants: 1247
    },
    {
      id: 2,
      title: "Protein Power Week",
      description: "Meet your protein goal every day this week",
      progress: 60,
      reward: "100 points + Muscle Builder Badge",
      timeLeft: "4 days left",
      difficulty: "Medium",
      participants: 892
    },
    {
      id: 3,
      title: "Rainbow Plate Challenge",
      description: "Eat 5 different colored fruits/vegetables daily",
      progress: 40,
      reward: "75 points + Veggie Lover Badge",
      timeLeft: "5 days left",
      difficulty: "Medium",
      participants: 1583
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "7-Day Streak",
      description: "Logged meals for 7 consecutive days",
      icon: Flame,
      earned: true,
      points: 100
    },
    {
      id: 2,
      title: "Macro Master",
      description: "Hit all macro targets in a single day",
      icon: Target,
      earned: true,
      points: 50
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Log breakfast before 8 AM for 5 days",
      icon: Star,
      earned: false,
      points: 75
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Help 10 community members",
      icon: Medal,
      earned: false,
      points: 150
    }
  ];

  const userStats = {
    totalPoints: 2450,
    currentStreak: 12,
    longestStreak: 28,
    level: 8,
    nextLevelPoints: 2750,
    challengesCompleted: 15
  };

  const rewards = [
    {
      id: 1,
      title: "15% off Premium Plan",
      cost: 500,
      category: "Subscription",
      available: true
    },
    {
      id: 2,
      title: "Personal Nutrition Consultation",
      cost: 1000,
      category: "Expert",
      available: true
    },
    {
      id: 3,
      title: "Custom Meal Plan",
      cost: 750,
      category: "Nutrition",
      available: true
    },
    {
      id: 4,
      title: "Fitness Tracker Discount",
      cost: 1200,
      category: "Device",
      available: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Health Challenges & Rewards
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay motivated with daily challenges, earn points, and unlock exclusive rewards
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Stats Card */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{userStats.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                  <div className="mt-2">
                    <Progress 
                      value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Level {userStats.level} • {userStats.nextLevelPoints - userStats.totalPoints} points to next level
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{userStats.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Current Streak</div>
                  </div>
                  <div className="text-center p-3 bg-wellness/10 rounded-lg">
                    <div className="text-2xl font-bold text-wellness">{userStats.longestStreak}</div>
                    <div className="text-xs text-muted-foreground">Best Streak</div>
                  </div>
                </div>

                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">{userStats.challengesCompleted}</div>
                  <div className="text-xs text-muted-foreground">Challenges Completed</div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-wellness" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted/50 opacity-60'
                      }`}
                    >
                      <IconComponent 
                        className={`w-8 h-8 ${
                          achievement.earned ? 'text-primary' : 'text-muted-foreground'
                        }`} 
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        <div className="text-xs font-medium text-primary">{achievement.points} points</div>
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          Earned
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Challenges */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{challenge.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{challenge.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="outline">{challenge.difficulty}</Badge>
                          <span className="text-muted-foreground">
                            {challenge.participants.toLocaleString()} participants
                          </span>
                          <span className="text-warning font-medium">{challenge.timeLeft}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Join Challenge
                      </Button>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Gift className="w-4 h-4 text-accent" />
                      <span className="text-accent font-medium">Reward: {challenge.reward}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rewards Store */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-accent" />
                  Rewards Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {rewards.map((reward) => (
                    <div 
                      key={reward.id} 
                      className={`border rounded-lg p-4 ${
                        !reward.available ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{reward.title}</h3>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {reward.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{reward.cost}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={reward.available ? "default" : "secondary"}
                        disabled={!reward.available || userStats.totalPoints < reward.cost}
                      >
                        {!reward.available 
                          ? 'Coming Soon' 
                          : userStats.totalPoints < reward.cost 
                            ? 'Not Enough Points' 
                            : 'Redeem'
                        }
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;