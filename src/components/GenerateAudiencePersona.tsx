import { useState } from 'react';
import { Users, Check } from 'lucide-react';
import { tagColors, topFeatures, personaMetrics } from '../utils/constants';

interface Persona {
  id: string;
  cluster: string;
  tags: string[];
  title: string;
  contacts: number;
  persona: string;
}

function GenerateAudiencePersona() {
  const [personaCount, setPersonaCount] = useState(30);
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);

  const togglePersona = (id: string) => {
    setSelectedPersonas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const buyerPersonas = [
    {
      id: 'bp1',
      cluster: 'Cluster 1',
      tags: ['$60-79K HHI', '45-54 Active', '$1M+ Moderate ($)', '44+ High Subscriber'],
      title: 'Cabin Weekender',
      contacts: 228,
      persona: 'Millennial couple, travel to cabin retreats, cooks at home, buys organic, values warmth.'
    },
    {
      id: 'bp2',
      cluster: 'Cluster 2',
      tags: ['$60-79K HHI', '55+ Active', '$1M+ Moderate ($)', '44+ High Subscriber'],
      title: 'Gentle Adventurer',
      contacts: 228,
      persona: 'Outdoors-inspired but not technical; seeks comfort, style, and subtle performance.'
    },
    {
      id: 'bp3',
      cluster: 'Cluster 3',
      tags: ['$40-59K HHI', '35% Active', '$1M+ Valuer ($)', '44+ Low Subscriber'],
      title: 'Summer Wayfarer',
      contacts: 228,
      persona: 'Easygoing explorer who values experiences over things; spontaneous and lighthearted.'
    },
    {
      id: 'bp4',
      cluster: 'Cluster 4',
      tags: ['$60-79K HHI', '55% Active', '$1M+ Moderate ($)', '44+ Low Subs/Go+'],
      title: 'Heritage Minimalist',
      contacts: 228,
      persona: 'Discerning, design-minded professional; prefers timeless quality over excess.'
    }
  ];

  const existingPersonas = [
    {
      id: 'ep1',
      cluster: 'Cluster 1',
      tags: ['$60-79K HHI', '45% Active', '$1M+ Moderate ($)', '44+ Low Subscriber'],
      title: 'Cabin Weekender',
      contacts: 228,
      persona: 'Millennial couple, travel to cabin retreats, cooks at home, buys organic, values warmth.'
    },
    {
      id: 'ep2',
      cluster: 'Cluster 2',
      tags: ['$60-79K HHI', '55% Active', '$1M+ Moderate ($)', '44+ Low Subscriber'],
      title: 'Gentle Adventurer',
      contacts: 228,
      persona: 'Outdoors-inspired but not technical; seeks comfort, style, and subtle performance.'
    },
    {
      id: 'ep3',
      cluster: 'Cluster 3',
      tags: ['$60-79K HHI', '35% Active', '$1M+ Valuer ($)', '44+ Low Subscriber'],
      title: 'Summer Wayfarer',
      contacts: 228,
      persona: 'Easygoing explorer who values experiences over things; spontaneous and lighthearted.'
    },
    {
      id: 'ep4',
      cluster: 'Cluster 4',
      tags: ['$60-79K HHI', '55% Active', '$1M+ Moderate ($)', '44+ Low Subs/Go+'],
      title: 'Heritage Minimalist',
      contacts: 228,
      persona: 'Discerning, design-minded professional; prefers timeless quality over excess.'
    }
  ];

  const PersonaCard = ({ persona, isSelected, onClick }: { persona: Persona; isSelected: boolean; onClick: () => void }) => (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">{persona.cluster}</div>
          <div className="flex flex-wrap gap-1 mb-2">
            {persona.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-xs px-2 py-0.5 rounded ${tagColors[idx % tagColors.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {isSelected && (
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <h4 className="font-semibold text-lg mb-2">{persona.title}</h4>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Users className="w-4 h-4" />
        <span>Contacts: {persona.contacts}</span>
      </div>
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <span className="font-medium">Persona:</span>
        <span>{persona.persona}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-500 text-white px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <div>
            <h1 className="text-xl font-semibold">Generate Audience Personas</h1>
            <p className="text-sm text-blue-100">Use K-Means Clustering To Automatically Segment Your Audience into Meaningful Groups</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Generate Audience Personas</h2>
            <p className="text-sm text-gray-600 mb-6">We use your chosen clusters to analyze feature depth and identify your best-fit personas</p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-600">Number of Personas</label>
                <span className="text-sm font-medium text-blue-600">{personaCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={personaCount}
                onChange={(e) => setPersonaCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1</span>
                <span>50</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Select how many personas you want to create</p>
            </div>

            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition">
              Generate Personas
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Top 5 Features</h2>
            <div className="flex items-end justify-between gap-4 h-48">
              {topFeatures.map((feature, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className={`w-full bg-blue-500 rounded-t ${feature.height}`}></div>
                  <p className="text-xs text-center text-gray-600 mt-2 leading-tight">{feature.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Persona Quality Metrics</h3>
          <div className="grid grid-cols-4 gap-8">
            {personaMetrics.map((metric, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold">{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Buyer Personas</h3>
            <button className="text-sm text-blue-600 hover:underline">Edit Badge Rules</button>
          </div>
          <p className="text-sm text-gray-600 mb-6">Indivia ML Persona</p>

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

        <div className="bg-white rounded-lg p-6 shadow-sm">
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
    </div>
  );
}

export default GenerateAudiencePersona;
