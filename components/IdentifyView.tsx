/**
* (c) 2026 Joël LARSKI
* Released under the MIT License
* Part of the CompostMASTER-AI Project.
*/


import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { analyzeWasteImage } from '../services/geminiService';
import { AnalysisResult } from '../types';

const IdentifyView: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera // Force l'appareil photo direct
      });

      if (photo.base64String) {
        const base64Image = `data:image/jpeg;base64,${photo.base64String}`;
        setImage(base64Image);
        setLoading(true);
        setResult(null);
        
        const analysis = await analyzeWasteImage(photo.base64String);
        setResult(analysis);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur caméra:", error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yes': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'no': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'yes': return 'fa-check-circle';
      case 'no': return 'fa-times-circle';
      default: return 'fa-exclamation-triangle';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-stone-800">C'est compostable ?</h2>
        <p className="text-stone-500 text-sm">Prenez une photo pour le savoir instantanément.</p>
      </div>

      <div 
        onClick={takePhoto}
        className="relative aspect-square w-full max-w-[300px] mx-auto bg-stone-100 rounded-3xl border-2 border-dashed border-stone-300 flex items-center justify-center overflow-hidden cursor-pointer group"
      >
        {image ? (
          <img src={image} alt="Waste" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-8">
            <i className="fas fa-camera text-4xl text-stone-300 mb-2"></i>
            <p className="text-stone-400 text-sm">Cliquez pour scanner</p>
          </div>
        )}
        
        {image && !loading && (
          <button 
            onClick={(e) => { e.stopPropagation(); setImage(null); setResult(null); }}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center text-stone-600 z-10"
          >
            <i className="fas fa-redo"></i>
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center py-8 animate-pulse">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-600 font-medium">Analyse en cours...</p>
        </div>
      )}

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`p-4 rounded-2xl border-2 mb-4 ${getStatusColor(result.canCompost)}`}>
            <div className="flex items-center gap-3 mb-2">
              <i className={`fas ${getStatusIcon(result.canCompost)} text-2xl`}></i>
              <h3 className="text-lg font-bold uppercase tracking-wide">
                {result.canCompost === 'yes' ? 'Compostable' : result.canCompost === 'no' ? 'Non Compostable' : 'Compostable à modérer)'}
              </h3>
            </div>
            <p className="text-sm opacity-90">{result.reason}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Catégorie</h4>
              <p className="text-stone-700 font-semibold">{result.category}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Conseils d'expert</h4>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                    <i className="fas fa-seedling text-emerald-500 mt-1"></i>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentifyView;

