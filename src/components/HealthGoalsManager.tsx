import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const HealthGoalsManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState({
    weight_loss_target: '',
    muscle_gain_target: '',
    daily_calorie_target: '2000',
    daily_protein_target: '120',
    daily_water_target: '8',
    daily_steps_target: '10000'
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('health_goals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setGoals({
          weight_loss_target: data.weight_loss_target?.toString() || '',
          muscle_gain_target: data.muscle_gain_target?.toString() || '',
          daily_calorie_target: data.daily_calorie_target?.toString() || '2000',
          daily_protein_target: data.daily_protein_target?.toString() || '120',
          daily_water_target: data.daily_water_target?.toString() || '8',
          daily_steps_target: data.daily_steps_target?.toString() || '10000'
        });
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please login to set your goals",
          variant: "destructive",
        });
        return;
      }

      const goalData = {
        user_id: user.id,
        weight_loss_target: goals.weight_loss_target ? parseFloat(goals.weight_loss_target) : null,
        muscle_gain_target: goals.muscle_gain_target ? parseFloat(goals.muscle_gain_target) : null,
        daily_calorie_target: parseInt(goals.daily_calorie_target),
        daily_protein_target: parseInt(goals.daily_protein_target),
        daily_water_target: parseInt(goals.daily_water_target),
        daily_steps_target: parseInt(goals.daily_steps_target)
      };

      const { error } = await supabase
        .from('health_goals')
        .upsert(goalData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Health goals saved successfully!",
      });
    } catch (error) {
      console.error('Error saving goals:', error);
      toast({
        title: "Error",
        description: "Failed to save goals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setGoals(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Health Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight-loss">Weight Loss Target (kg)</Label>
            <Input
              id="weight-loss"
              type="number"
              step="0.1"
              placeholder="e.g., 5.0"
              value={goals.weight_loss_target}
              onChange={(e) => handleInputChange('weight_loss_target', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="muscle-gain">Muscle Gain Target (kg)</Label>
            <Input
              id="muscle-gain"
              type="number"
              step="0.1"
              placeholder="e.g., 2.0"
              value={goals.muscle_gain_target}
              onChange={(e) => handleInputChange('muscle_gain_target', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calorie-target">Daily Calorie Target</Label>
            <Input
              id="calorie-target"
              type="number"
              value={goals.daily_calorie_target}
              onChange={(e) => handleInputChange('daily_calorie_target', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="protein-target">Daily Protein Target (g)</Label>
            <Input
              id="protein-target"
              type="number"
              value={goals.daily_protein_target}
              onChange={(e) => handleInputChange('daily_protein_target', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="water-target">Daily Water Target (glasses)</Label>
            <Input
              id="water-target"
              type="number"
              value={goals.daily_water_target}
              onChange={(e) => handleInputChange('daily_water_target', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="steps-target">Daily Steps Target</Label>
            <Input
              id="steps-target"
              type="number"
              value={goals.daily_steps_target}
              onChange={(e) => handleInputChange('daily_steps_target', e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Goals
        </Button>
      </CardContent>
    </Card>
  );
};

export default HealthGoalsManager;