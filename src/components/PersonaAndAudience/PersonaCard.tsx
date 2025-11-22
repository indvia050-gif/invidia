import { Check, Users } from "lucide-react";
import { tagColors } from "../../utils/PersonaAudienceconstants";

interface Persona {
  id: string;
  cluster: string;
  tags: string[];
  title: string;
  contacts: number;
  persona: string;
}

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
  export default PersonaCard;