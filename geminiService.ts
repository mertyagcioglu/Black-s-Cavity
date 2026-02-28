import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert dental educator specializing in Pedodontics and Operative Dentistry. 
Your task is to evaluate a Class II cavity preparation on a primary first molar tooth based on two photos: one from the occlusal view and one from the proximal view.
You must provide a score for each of the following 10 criteria:

1. Outline Form (Max 12): Ideal (12), Slight deviation <1mm (6), Serious error >1.5mm overcut (0).
2. Retention Form (Max 12): Perfect angle 6-12° (12), Partially appropriate (6), No retention/flat walls (0).
3. Surface Smoothness (Max 12): Completely smooth (12), Slight scratches (6), Significant irregularities (0).
4. Depth Control (Max 12): 1.8mm ±0.2 (12), 1.3mm or 2.3mm (6), Pulpa exposure or too shallow (0).
5. Proximal Box Width (Max 12): Ideal 2-2.5mm (12), 2mm-2.5mm (6), >2.5mm (0).
6. Gingival Floor Depth (Max 10): 0.75mm ±0.25 (10), 0.3mm-0.5mm (5), <0.3mm or >1mm (0).
7. Axial Wall Alignment (Max 10): Perfect alignment (10), Slight slope (5), Slope >20° or broken (0).
8. Marginal Ridge Thickness (Max 10): ≥1.5mm (10), 1.0-1.4mm (5), <1.0mm or broken (0).
9. Dovetail Cavity (Max 10): 1/3 ratio (10), 1/2 ratio (5), 1/1 or >1 ratio (0).
10. Critical Errors: 
    - Pulpa perforation or Wrong cavity preparation: Set isInvalid to true and totalScore to 0.
    - No step preparation: Deduct 30 points from total.

Use both images to make the most accurate assessment. The occlusal view is best for outline, retention, depth, and dovetail. The proximal view is best for proximal box width, gingival floor depth, and axial wall alignment.
Return the result in JSON format matching the EvaluationResult interface.
The 'feedback' field for each criterion should be in Turkish as the target users are Turkish dental students.
`;

export async function evaluateCavity(occlusalImage: string, proximalImage: string): Promise<EvaluationResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: "Lütfen bu Sınıf II kavite preparasyonunu oklüzal ve proksimal görüntüler üzerinden kriterlere göre değerlendir." },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: occlusalImage.split(",")[1] || occlusalImage,
            },
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: proximalImage.split(",")[1] || proximalImage,
            },
          },
        ],
      },
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          criteria: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                name: { type: Type.STRING },
                score: { type: Type.NUMBER },
                maxScore: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
              },
              required: ["id", "name", "score", "maxScore", "feedback"],
            },
          },
          totalScore: { type: Type.NUMBER },
          criticalError: { type: Type.STRING },
          isInvalid: { type: Type.BOOLEAN },
        },
        required: ["criteria", "totalScore", "isInvalid"],
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}") as EvaluationResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Değerlendirme sonuçları işlenirken bir hata oluştu.");
  }
}
