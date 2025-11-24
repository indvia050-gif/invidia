import { useState } from 'react';
import { existingPersonas, buyerPersonas, topFeatures, personaMetrics } from '../../utils/PersonaAudienceconstants';
import PersonaCard  from "./PersonaCard"

const GenerateAudiencePersona=()=> {
  const [personaCount, setPersonaCount] = useState(30);
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);

  const percentage = ((personaCount - 1) / 49) * 100;

  const togglePersona = (id: string) => {
    setSelectedPersonas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className='border text-[#5D586C] rounded-xl p-3'>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src='arcs.png' alt='arcs' className='w-10 h-10'/>
          <div>
            <h1 className="text-xl font-semibold">Generate Audience Personas</h1>
            <p className="text-sm ">Use K-Means Clustering To Automatically Segment Your Audience into Meaningful Groups</p>
          </div>
        </div>
      </div>

        <div className="grid grid-cols-12 gap-3 mb-8">
          <div className="bg-white col-span-4 border rounded-lg p-3 shadow-sm">
            <h2 className="text-lg font-semibold  mb-3">Generate Audience Personas</h2>
            <p className="text-sm  mb-6">We use your chosen clusters to analyze feature depth and identify your best-fit personas</p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-[#9D9CA0]">Number of Personas</label>
              </div>
                <div style={{ position: 'relative', width: '100%'}}>
                  {/* Slider count above thumb */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(${(personaCount - 1) / 49 * 100}% - 12px)`,
                      top: '-17px',
                      backgroundColor:'#5087FF',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: 600,
                      pointerEvents: 'none',
                      width: '24px',
                      borderRadius:"4px",
                      textAlign: 'center',
                    }}
                  >
                    {personaCount}
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={personaCount}
                    onChange={(e) => setPersonaCount(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#5087FF]"
                    style={{ background: `linear-gradient(to right, #5087FF 0%, #5087FF ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)` }}
                  />
                </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>1</span>
                <span>50</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Select how many personas you want to create</p>
            </div>

            <button className="w-full bg-[#5087FF] text-white py-3 rounded-lg font-medium hover:bg-[#3D6CE8] transition">
              Generate Personas
            </button>
          </div>

          <div className="bg-white col-span-8  border rounded-lg p-3 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Top 5 Features</h2>
            <div className="flex items-end justify-between gap-6 h-48">
              {topFeatures.map((feature, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className={`w-full bg-[#5087FF] rounded-t ${feature.height}`}></div>
                  <p className="text-xs text-center  mt-2 leading-tight">{feature.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-3 shadow-sm mb-6">
          <h3 className="text-sm font-semibold  mb-4">Persona Quality Metrics</h3>
          <div className="grid grid-cols-4 gap-8">
            {personaMetrics.map((metric, idx) => (
              <div key={idx}>
                <div className="text-3xl ">{metric.value}</div>
                <div className="text-sm ">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-3 shadow-sm mb-6">
          <div className="flex items-center gap-4 ">
            <h3 className="text-lg font-semibold">Buyer Personas</h3>
            <button className="text-sm text-[#5087FF] underline underline-offset-1">Edit Badge Rules</button>
          </div>
          <p className="text-sm  mb-2">Indivia ML Persona</p>

          <div className="grid grid-cols-2 gap-4">
            {buyerPersonas.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                isSelected={selectedPersonas.includes(persona.id)}
                onClick={() => togglePersona(persona.id)}
              />
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-3 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Existing Brand Personas</h3>

          <div className="grid grid-cols-2 gap-4">
            {existingPersonas.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                isSelected={selectedPersonas.includes(persona.id)}
                onClick={() => togglePersona(persona.id)}
              />
            ))}
          </div>
        </div>
    </div>
  );
}

export default GenerateAudiencePersona;
