import { GripVertical } from "lucide-react";
import { ModuleTemplate } from "@/utils/ModuleTemplate";

interface ModuleCardProps {
    module: ModuleTemplate;
    onDragStart: (e: React.DragEvent, module: ModuleTemplate) => void;
}

function ModuleCard({ module, onDragStart }: ModuleCardProps) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, module)}
            className="bg-white border border-gray-200 rounded-lg p-3 mb-2 cursor-move hover:border-blue-400 hover:shadow-sm transition-all group"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-2 min-h-[80px] flex items-center justify-center">
                        <span className="text-xs text-gray-400 text-center">{module.name}</span>
                    </div>
                    <p className="text-xs text-gray-700 font-medium text-center">{module.name}</p>
                </div>
                <GripVertical className="w-4 h-4 text-gray-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    );
}

export default ModuleCard;
