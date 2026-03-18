/**
* (c) 2026 Joël LARSKI
* Released under the MIT License
* Part of the CompostMASTER-AI Project.
*/

import { AnalysisResult } from "../types";

const VERCEL_API_URL = "https://compost-master-ai.vercel.app/api";

export const analyzeWasteImage = async (base64Data: string): Promise<AnalysisResult> => {
  try {
    const response = await fetch(VERCEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "image",
        base64Data: base64Data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    // Le relais Vercel renvoie directement le JSON formaté
    const data = await response.json();
    return data as AnalysisResult;

  } catch (error) {
    console.error("Erreur d'analyse d'image :", error);
    // On renvoie un objet par défaut pour éviter un crash de l'appli
    return {
      canCompost: "no",
      reason: "Erreur de connexion avec le serveur d'analyse.",
      category: "inconnue",
      tips: ["Veuillez vérifier votre connexion internet et réessayer."],
    };
  }
};

export const getChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const response = await fetch(VERCEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "text",
        message: message,
        history: history,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    const data = await response.json();
    return data.text;

  } catch (error) {
    console.error("Erreur de chat :", error);
    return "Je suis désolé, je n'arrive pas à joindre le serveur  actuellement. Réessayez dans un instant.";
  }
};
