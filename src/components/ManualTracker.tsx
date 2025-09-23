import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Droplets, TrendingUp, Flame } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ManualTracker = () => {
  const { toast } = useToast();
  const [water, setWater] = useState('');
  const [steps, setSteps] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (type: 'water' | 'steps' | 'calories') => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please login to track your stats",
          variant: "destructive",
        });
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      let updateData = {};
      
      if (type === 'water' && water) {
        updateData = { water_intake: parseInt(water) };
        setWater('');
      } else if (type === 'steps' && steps) {
        updateData = { steps: parseInt(steps) };
        setSteps('');
      } else if (type === 'calories' && caloriesBurned) {
        updateData = { calories_burned: parseInt(caloriesBurned) };
        setCaloriesBurned('');
      }

      const { error } = await supabase
        .from('user_stats')
        .upsert({
          user_id: user.id,
          date: today,
          ...updateData
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`,
      });
    } catch (error) {
      console.error('Error updating stats:', error);
      toast({
        title: "Error",
        description: "Failed to update stats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Manual Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Water Intake */}
        <div className="space-y-2">
          <Label htmlFor="water" className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-accent" />
            Water Intake (glasses)
          </Label>
          <div className="flex gap-2">
            <Input
              id="water"
              type="number"
              placeholder="Enter glasses"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSubmit('water')}
              disabled={loading || !water}
              size="sm"
              className="bg-accent hover:bg-accent/90"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <Label htmlFor="steps" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-wellness" />
            Steps Count
          </Label>
          <div className="flex gap-2">
            <Input
              id="steps"
              type="number"
              placeholder="Enter steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSubmit('steps')}
              disabled={loading || !steps}
              size="sm"
              className="bg-wellness hover:bg-wellness/90"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Calories Burned */}
        <div className="space-y-2">
          <Label htmlFor="calories" className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            Calories Burned
          </Label>
          <div className="flex gap-2">
            <Input
              id="calories"
              type="number"
              placeholder="Enter calories"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSubmit('calories')}
              disabled={loading || !caloriesBurned}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              Add
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Badge variant="secondary" className="bg-success/10 text-success">
            Track your daily activities
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualTracker;