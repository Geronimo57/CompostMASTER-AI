/**
* (c) 2026 Joël LARSKI
* Released under the MIT License
* Part of the CompostMASTER-AI Project.
*/

import React from 'react';

const GuideView: React.FC = () => {
  const troubleshooting = [
    { title: "Ça sent mauvais", solution: "Trop d'humidité ou manque d'air. Ajoutez des matières brunes (carton, feuilles mortes) et brassez.", icon: "fa-wind" },
    { title: "Rien ne se passe", solution: "Compost trop sec ou manque d'azote. Arrosez d'un peu d'eau, ou ajoutez de la matière verte ( pelouse, plus grosse quantité d'épluchures ) et brassez", icon: "fa-clock" },
    { title: "Moucherons / Insectes", solution: "Couvrez vos déchets frais avec une couche de matière brune ou de terre.", icon: "fa-bug" },
    { title: "Rongeurs", solution: "Brassez plus fréquemment votre compost afin de casser les galeries des rats, dérangez-les le plus possible", icon: "fa-paw" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-stone-800">Le B.A.-BA du Compost</h2>
        <p className="text-stone-500 text-sm">Les clés pour un or noir de qualité.</p>
      </div>

      <section>
        <h3 className="text-sm font-bold text-emerald-700 uppercase mb-3 flex items-center gap-2">
          <i className="fas fa-balance-scale"></i> L'équilibre Parfait
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
            <h4 className="text-emerald-800 font-bold text-sm mb-1">Les Verts (Azote)</h4>
            <p className="text-[11px] text-emerald-700 italic">Humide, mou, frais</p>
            <ul className="text-[10px] mt-2 text-emerald-800 list-disc list-inside">
              <li>Épluchures</li>
              <li>Restes de repas</li>
              <li>Marc de café</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
            <h4 className="text-amber-800 font-bold text-sm mb-1">Les Bruns (Carbone)</h4>
            <p className="text-[11px] text-amber-700 italic">Sec, dur, ligneux</p>
            <ul className="text-[10px] mt-2 text-amber-800 list-disc list-inside">
              <li>Carton non imprimé</li>
              <li>Déchets verts broyés</li>
              <li>Foin/Sciure</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-stone-400 mt-3 italic text-center">Viser 50% de Verts et 50% de Bruns en volume.</p>
      </section>

      <section>
        <h3 className="text-sm font-bold text-rose-700 uppercase mb-3 flex items-center gap-2">
          <i className="fas fa-tools"></i> SOS Composteur
        </h3>
        <div className="space-y-3">
          {troubleshooting.map((item, i) => (
            <div key={i} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-stone-100">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-800">{item.title}</h4>
                <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-emerald-600 p-6 rounded-3xl text-white text-center">
        <i className="fas fa-medal text-3xl mb-3"></i>
        <h3 className="font-bold">Devenez Pro !</h3>
        <p className="text-xs text-emerald-100 mt-2">N'oubliez pas d'aérer votre compost une fois par semaine pour favoriser une bonne décomposition.</p>
      </div>
    </div>
  );
};

export default GuideView;
