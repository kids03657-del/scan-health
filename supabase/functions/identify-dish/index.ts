import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Identifying dish with OpenAI Vision API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a food identification expert. Analyze the food image and provide:
1. The most accurate dish name (be specific - include cuisine type if relevant)
2. Alternative names or variations of the dish
3. Main ingredients visible
4. Estimated serving size

Respond in JSON format:
{
  "dishName": "Primary dish name",
  "alternativeNames": ["name1", "name2"],
  "mainIngredients": ["ingredient1", "ingredient2"],
  "servingSize": "estimated portion size",
  "confidence": "confidence level (high/medium/low)"
}`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Identify this food dish and provide detailed information about it.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const content = data.choices[0].message.content;
    
    try {
      const dishInfo = JSON.parse(content);
      console.log('Dish identified:', dishInfo);
      
      return new Response(JSON.stringify({
        success: true,
        dishInfo
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      
      // Fallback: return raw content if JSON parsing fails
      return new Response(JSON.stringify({
        success: true,
        dishInfo: {
          dishName: content.split('\n')[0] || 'Unknown Dish',
          alternativeNames: [],
          mainIngredients: [],
          servingSize: 'Medium portion',
          confidence: 'medium',
          rawResponse: content
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in identify-dish function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});