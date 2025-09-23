import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share2, Clock, Users, Star, ChefHat } from 'lucide-react';

const CommunitySection = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const recipes = [
    {
      id: 1,
      title: "High-Protein Quinoa Bowl",
      author: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      image: "/api/placeholder/300/200",
      calories: 425,
      protein: 28,
      prepTime: "15 min",
      likes: 342,
      comments: 28,
      tags: ["High-Protein", "Vegetarian", "Quick"]
    },
    {
      id: 2,
      title: "Keto Salmon with Avocado",
      author: "Mike Chen",
      avatar: "/api/placeholder/40/40",
      image: "/api/placeholder/300/200",
      calories: 380,
      protein: 35,
      prepTime: "20 min",
      likes: 198,
      comments: 15,
      tags: ["Keto", "Low-Carb", "Omega-3"]
    },
    {
      id: 3,
      title: "Post-Workout Smoothie Bowl",
      author: "Emma Davis",
      avatar: "/api/placeholder/40/40",
      image: "/api/placeholder/300/200",
      calories: 245,
      protein: 22,
      prepTime: "5 min",
      likes: 567,
      comments: 42,
      tags: ["Post-Workout", "Smoothie", "Recovery"]
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best protein sources for vegetarians?",
      author: "Alex Kumar",
      avatar: "/api/placeholder/40/40",
      category: "Nutrition",
      replies: 23,
      lastActivity: "2 hours ago",
      isExpert: false
    },
    {
      id: 2,
      title: "How to maintain consistency with meal prep",
      author: "Dr. Lisa Wong",
      avatar: "/api/placeholder/40/40",
      category: "Meal Planning",
      replies: 45,
      lastActivity: "4 hours ago",
      isExpert: true
    },
    {
      id: 3,
      title: "Managing cravings during weight loss",
      author: "James Miller",
      avatar: "/api/placeholder/40/40",
      category: "Weight Loss",
      replies: 67,
      lastActivity: "6 hours ago",
      isExpert: false
    }
  ];

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "Registered Dietitian",
      expertise: "Sports Nutrition",
      rating: 4.9,
      consultations: 1250,
      avatar: "/api/placeholder/60/60"
    },
    {
      id: 2,
      name: "Dr. Robert Kim",
      title: "Nutritionist",
      expertise: "Weight Management",
      rating: 4.8,
      consultations: 980,
      avatar: "/api/placeholder/60/60"
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      title: "Clinical Nutritionist",
      expertise: "Diabetes Care",
      rating: 4.9,
      consultations: 1100,
      avatar: "/api/placeholder/60/60"
    }
  ];

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  return (
    <section id="community" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Community & Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share recipes, get expert advice, and connect with others on their health journey
          </p>
        </div>

        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="recipes" className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              Recipes
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="experts" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Experts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipe.prepTime}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={recipe.avatar} />
                        <AvatarFallback>{recipe.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{recipe.author}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-primary/10 p-2 rounded text-center">
                        <div className="text-sm font-bold text-primary">{recipe.calories}</div>
                        <div className="text-xs text-muted-foreground">Calories</div>
                      </div>
                      <div className="bg-wellness/10 p-2 rounded text-center">
                        <div className="text-sm font-bold text-wellness">{recipe.protein}g</div>
                        <div className="text-xs text-muted-foreground">Protein</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(recipe.id)}
                          className={likedPosts.has(recipe.id) ? "text-red-500" : ""}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(recipe.id) ? "fill-current" : ""}`} />
                          {recipe.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {recipe.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={discussion.avatar} />
                      <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{discussion.title}</h3>
                        {discussion.isExpert && (
                          <Badge variant="default" className="bg-primary">Expert</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>by {discussion.author}</span>
                        <Badge variant="outline">{discussion.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {discussion.replies} replies
                        </span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="experts" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Card key={expert.id}>
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={expert.avatar} />
                      <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">{expert.name}</h3>
                    <p className="text-muted-foreground mb-2">{expert.title}</p>
                    <Badge variant="secondary" className="mb-4">{expert.expertise}</Badge>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{expert.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{expert.consultations}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CommunitySection;