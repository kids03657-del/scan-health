import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FoodScanSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const mockNutritionData = {
    foodName: "Mixed Vegetable Salad with Grilled Chicken",
    calories: 285,
    protein: 28,
    carbs: 12,
    fats: 15,
    fiber: 8,
    servingSize: "1 bowl (250g)",
    confidence: 94,
    breakdown: [
      { name: "Chicken Breast", percentage: 60, calories: 165 },
      { name: "Mixed Greens", percentage: 25, calories: 45 },
      { name: "Cherry Tomatoes", percentage: 10, calories: 20 },
      { name: "Olive Oil Dressing", percentage: 5, calories: 55 }
    ]
  };

  const simulateFoodScan = async () => {
    setIsScanning(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setScanResult(mockNutritionData);
    setIsScanning(false);
    
    toast({
      title: "Food Recognized!",
      description: `Found ${mockNutritionData.foodName} with ${mockNutritionData.confidence}% confidence`,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        simulateFoodScan();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="scan" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI Food Recognition
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simply snap a photo of your meal and get instant nutrition breakdown powered by advanced AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Scan Interface */}
          <Card className="border-dashed border-2 border-primary/30 bg-background/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                Food Scanner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {uploadedImage ? (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded food"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Zap className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                        <p>Analyzing your meal...</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Take or upload a photo of your meal</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full"
                  disabled={isScanning}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  onClick={simulateFoodScan}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isScanning}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {isScanning && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-primary">
                    <Zap className="w-5 h-5 animate-pulse" />
                    <span className="font-medium">AI is analyzing your food...</span>
                  </div>
                  <div className="mt-2 bg-primary/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {scanResult && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-6 h-6" />
                  Nutrition Analysis
                </CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {scanResult.confidence}% Confidence
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{scanResult.foodName}</h3>
                  <p className="text-muted-foreground">Serving: {scanResult.servingSize}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">{scanResult.calories}</div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="bg-wellness/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-wellness">{scanResult.protein}g</div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent">{scanResult.carbs}g</div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="bg-warning/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-warning">{scanResult.fats}g</div>
                    <div className="text-sm text-muted-foreground">Fats</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Food Breakdown:</h4>
                  <div className="space-y-2">
                    {scanResult.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm">{item.name}</span>
                        <div className="text-right">
                          <span className="font-medium">{item.percentage}%</span>
                          <span className="text-muted-foreground text-xs ml-2">({item.calories} cal)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Add to Food Diary
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodScanSection;