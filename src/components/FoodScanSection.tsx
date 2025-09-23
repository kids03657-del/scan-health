import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const FoodScanSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const analyzeFood = async (imageData, fileName = "") => {
    console.log('🔍 Starting AI food analysis...');
    setIsScanning(true);
    setError(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get dish identification first
      const { data: dishResult, error: dishError } = await supabase.functions.invoke('identify-dish', {
        body: { imageData }
      });

      if (dishError) {
        console.error('Dish identification error:', dishError);
      }

      // Analyze nutrition
      const { data: analysisResult, error: analysisError } = await supabase.functions.invoke('analyze-food', {
        body: { 
          imageData,
          userId: user?.id
        }
      });

      if (analysisError) {
        throw new Error(analysisError.message || 'Failed to analyze food');
      }

      if (analysisResult?.nutritionalData) {
        const dishInfo = dishResult?.dishInfo;
        const enhancedResult = {
          ...analysisResult.nutritionalData,
          foodName: dishInfo?.dishName || analysisResult.nutritionalData.food_name || 'Unknown Food',
          dishInfo: dishInfo,
          breakdown: analysisResult.nutritionalData.breakdown || []
        };
        
        console.log('✅ Analysis complete:', enhancedResult);
        setScanResult(enhancedResult);
        
        toast({
          title: "Food Analyzed!",
          description: `${enhancedResult.foodName} detected and logged successfully!`,
        });
      } else {
        throw new Error('No nutrition data found');
      }
      
    } catch (error) {
      console.error('💥 Food analysis error:', error);
      setError(error.message);
      toast({
        title: "Analysis Failed", 
        description: error.message || "Could not analyze the food image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleImageUpload = (event) => {
    console.log('📁 File input triggered');
    const file = event.target.files[0];
    if (file) {
      console.log('📸 File selected:', file.name, file.type);
      
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result as string;
        console.log('🖼️ Image loaded successfully');
        setUploadedImage(imageData);
        analyzeFood(imageData, file.name);
      };
      reader.onerror = () => {
        toast({
          title: "File Error",
          description: "Could not read the image file",
          variant: "destructive"
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.log('❌ No file selected');
    }
  };

  const handleTakePhoto = () => {
    console.log('📷 Take photo button clicked');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetScanner = () => {
    setUploadedImage(null);
    setScanResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Error: {error}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => {
                    console.log('📁 Upload button clicked');
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  variant="outline"
                  className="w-full"
                  disabled={isScanning}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  onClick={handleTakePhoto}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isScanning}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              {uploadedImage && !isScanning && (
                <Button
                  onClick={resetScanner}
                  variant="ghost"
                  className="w-full"
                >
                  Try Another Image
                </Button>
              )}

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
                  <div className="bg-green-500/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{scanResult.protein}g</div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="bg-blue-500/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{scanResult.carbs}g</div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="bg-orange-500/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">{scanResult.fats}g</div>
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

                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    console.log('📝 Food already logged to database');
                    toast({
                      title: "Already Logged",
                      description: `${scanResult.foodName} has been added to your food diary!`,
                    });
                    resetScanner();
                  }}
                >
                  Food Already Logged
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