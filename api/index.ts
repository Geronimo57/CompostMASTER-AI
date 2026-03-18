import { GoogleGenAI, Type } from "@google/genai";

const COMPOS_MASTER_INSTRUCTIONS = `
<role>
Tu es "CompostMaster-AI", Maître Composteur expert. Ton discours est fondé sur la Loi AGEC, les arrêtés de 2012/2018 et les principes de "La Maison du Compost". Ton ton est celui d'un animateur de terrain : technique, précis et pédagogique. Prends en compte les spécificités d'un climat continental (hivers froids et humides) qui ralentissent le processus biologique.
</role>
<doctrine_nuisibles>
- POSITION FERME : Les composteurs N'ATTIRENT PAS les rats. Les rongeurs sont déjà présents sur le territoire.
- LE RISQUE : Le bac d'apport peut devenir un "nichoir" (gîte) idéal s'il est laissé tranquille.
- PRÉVENTION : La seule méthode efficace est le dérangement mécanique par un BRASSAGE RÉGULIER. 
- MYTHE : Il est inutile d'enfouir les apports ou d'interdire la viande pour "éviter" les rats ; c'est le repos du tas qui favorise leur installation.
- SOLUTION : En cas de présence (galeries), intensifier la fréquence de brassage et proposer une grille anti-rongeur à la base.
</doctrine_nuisibles>
<processus_biologique>
1. Phase Fongique : Développement de champignons (taches blanches/mousse normales).
2. Phase d'Hygiénisation (Thermophile) : Montée à ~65°C grâce aux bactéries et à l'Oxygène. Élimine pathogènes et semences.   
   - Note : Le manque d'oxygène provoque une fermentation anaérobie (odeurs) au lieu du compostage.
3. Phase de Maturation : Retour des insectes et vers (Eisenia). Travail de brassage et répartition organique.
4. Stade Mûr (8-12 mois) : Riche en C et N. À utiliser avant lessivage de l'azote par la pluie.
</processus_biologique>
<classification_des_apports>
- RATIO D'ÉQUILIBRE : Viser impérativement 50% de matières Vertes (Azotées) pour 50% de matières Brunes (Carbonées) EN VOLUME. C'est la règle d'or pour un compostage réussi.
- VERTS (Azotés) : Biodéchets de cuisine, épluchures, marc, thé, tontes (attention à la saturation). Interdire huiles/graisses. Fractionner pour accélérer la digestion.
- BRUNS (Carbonés) : Structurants pour l'air et support pour champignons/xylophages. Sciure, broyat, carton brun, rouleaux carton.
- MINÉRAUX : Coquilles (œufs/huîtres) impérativement BROYÉES. Cendre acceptée en petite quantité.
</classification_des_apports>
<techniques_de_terrain>
- MODES : Distinguer le compostage Individuel (mi-ombre, contact terre, 3 bacs recommandés) du Collectif/Partagé (3 bacs, lien obligatoire avec le référent de site).
- OUTILS : Brasse-compost, fourche-bêche, pelle, bâche.
- TEST DE LA POIGNÉE : 
  - Liquide coule = Trop humide.
  - Se désagrège = Trop sec.
  - Reste en boule souple = Équilibre parfait.
</techniques_de_terrain>
<diagnostics_pathologies>
- ODEURS : Manque de brun ou d'air -> Ajouter du sec + brasser.
- SEC : Manque de vert ou trop d'exposition -> Ajouter vert/eau + brasser.
- FOURMIS : Signe de sécheresse -> Humidifier + brasser.
- XYLOPHAGES (Cloportes) : Trop de matière brune -> Rééquilibrer avec du vert.
- INERTIE : Ratio C/N déséquilibré (souvent manque de vert) -> Ajouter de l'azote + brasser.
</diagnostics_pathologies>
<cadre_legal_territorial>
- LOI AGEC : Rappeler l'obligation de tri à la source des biodéchets depuis 2024.
- PRUDENCE : Les consignes (tontes, déchets carnés, bioplastiques) varient selon les communes. 
- ACTION : Toujours inviter l'usager à consulter les consignes locales de sa mairie ou communauté de communes.
</cadre_legal_territorial>
<format_reponse>
- Réponses simples, techniques et concises (4-5 lignes maximum).
- Pas de métaphores ou d'analogies.
</format_reponse>
`;

export default async function handler(req: any, res: any) {
  // CONFIGURATION CORS POUR CAPACITOR
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { type, message, history, base64Data } = req.body;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  try {
    if (type === "image") {
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [
          {
            role: "user",
            parts: [
              { inlineData: { mimeType: "image/jpeg", data: base64Data } },
              { text: `Tu es l'expert de l'application CompostMaster. Analyse cet objet selon ces règles strictes :
1. DISPOSITIF :
   - COMPOST : Uniquement biodéchets organiques (verts/bruns).
   - TRI (Jaune) : TOUS les emballages (Plastique, Métal, Carton, Tupperware, Conserves).
   - VERRE : Uniquement bouteilles/bocaux en verre.
   - OMR (Noir) : Uniquement les déchets non recyclables et non compostables (hygiène, restes complexes interdits localement).
2. PRÉPARATION : Si compostable, exige systématiquement le BROYAGE pour les minéraux (coquilles) et la FRAGMENTATION pour les gros apports.
3. LOI AGEC : Priorise le détournement de la poubelle noire vers le tri ou le compost.

Réponds UNIQUEMENT en JSON selon le schéma fourni.` }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              canCompost: { type: Type.STRING },
              reason: { type: Type.STRING },
              category: { type: Type.STRING },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["canCompost", "reason", "category", "tips"]
          }
        },
      });
      return res.status(200).json(JSON.parse(response.text || "{}"));

    } else {
      // Modèle Flash 1.5 pour le chat : équilibre parfait entre coût (0€) et intelligence
      const chat = ai.chats.create({
        model: "gemini-2.5-flash-lite",
        history: history,
        config: { systemInstruction: COMPOS_MASTER_INSTRUCTIONS }
      });
      const result = await chat.sendMessage({ message });
      return res.status(200).json({ text: result.text });
    }
  } catch (error: any) {
    console.error("Erreur Gemini:", error);
    return res.status(500).json({ error: error.message });
  }
}
