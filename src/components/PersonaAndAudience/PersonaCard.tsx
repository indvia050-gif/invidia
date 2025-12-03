import { Check, Users } from "lucide-react";
import { tagColors } from "@/utils/PersonaAudienceconstants";

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
    className={`border rounded-lg p-2 cursor-pointer transition ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    onClick={onClick}
  >
    <div className="flex justify-around mb-3">
      <div className="text-xs items-center text-gray-500  ml-[-4%]">{persona.cluster}</div>
      <div className="flex flex-wrap gap-1">
        {persona.tags.map((tag, idx) => (
          <span
            key={idx}
            className={` px-1 h-[2.5vh] rounded-2xl ${tagColors[idx % tagColors.length]}`}
            style={{ fontSize: '10px' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-blue-500' : ''}`}>
        {isSelected && <Check className="w-4 h-4 text-white" />}
      </div>
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