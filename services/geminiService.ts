
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, GlucoseData } from '../types';

// Assume API_KEY is set in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A brief, one-sentence summary of the user's glucose control.",
    },
    observations: {
      type: Type.ARRAY,
      description: "A list of key positive or negative observations from the data.",
      items: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING, description: "The specific observation." },
          riskLevel: { 
            type: Type.STRING, 
            description: "A risk level: 'good' for positive, 'warning' for moderate risk, 'danger' for high risk."
          },
        },
      },
    },
    foodRecommendations: {
      type: Type.ARRAY,
      description: "A list of 3-5 specific food recommendations to help improve glucose levels, relevant for Singaporean cuisine.",
      items: {
        type: Type.STRING,
      },
    },
  },
};

export const analyzeGlucoseData = async (data: GlucoseData[]): Promise<AIAnalysis> => {
  const dataSummary = data
    .map(d => `On ${new Date(d.timestamp).toLocaleString()}, glucose was ${d.value} mg/dL.`)
    .join('\n');
    
  const prompt = `
    You are a friendly and professional diabetes health coach. 
    Analyze the following blood glucose data for a patient in Singapore.
    Normal range is 70-180 mg/dL.
    Provide a concise summary, key observations using a traffic light system ('good', 'warning', 'danger'), and specific food recommendations suitable for Singapore.
    
    Data:
    ${dataSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      },
    });
    
    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    // Basic validation to ensure the parsed object matches the expected structure
    if (parsedJson && parsedJson.summary && parsedJson.observations && parsedJson.foodRecommendations) {
       return parsedJson as AIAnalysis;
    } else {
        throw new Error("Parsed JSON does not match AIAnalysis schema.");
    }

  } catch (error) {
    console.error("Error analyzing glucose data:", error);
    throw new Error("Failed to process AI analysis.");
  }
};

const VISION_IMAGE_PROMPT = "A product vision image for an app that provides diabetic patients in Singapore with intuitive, long-term (7/30-day) blood glucose trend analysis using traffic light visuals to highlight patterns/risks. The image should convey ease of use, advanced data insights, and a focus on improving health outcomes for Singaporean users. Show a user interacting with the app on their phone, with clear, color-coded trend graphs in the background.";

export const generateProductVisionImage = async (): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: VISION_IMAGE_PROMPT,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '16:9',
            },
        });
        
        const imageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${imageBytes}`;

    } catch (error) {
        console.error("Error generating vision image:", error);
        throw new Error("Failed to generate product vision image.");
    }
};
