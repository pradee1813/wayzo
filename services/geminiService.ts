
import { GoogleGenAI, Type } from "@google/genai";

// Always use the recommended initialization with named apiKey parameter from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRecommendations = async (interests: string[], travelerType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Recommend top 3 tourist destinations in India for a ${travelerType} traveler interested in ${interests.join(", ")}. Provide reasoning for each.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              reason: { type: Type.STRING },
              suggestedState: { type: Type.STRING }
            },
            required: ["name", "reason", "suggestedState"]
          }
        }
      }
    });
    
    // Use .text property directly and handle potential undefined gracefully
    const jsonStr = response.text?.trim() || "[]";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return [];
  }
};

export const getSafetyAdvice = async (location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 specific safety tips and 2 emergency contact categories for a traveler visiting ${location}, India.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            contacts: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    // Use .text property directly and handle potential undefined gracefully
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Safety Advice Error:", error);
    return { tips: ["Stay alert", "Keep emergency numbers ready"], contacts: ["Police: 100", "Ambulance: 102"] };
  }
};
