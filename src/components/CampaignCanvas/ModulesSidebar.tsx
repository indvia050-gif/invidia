import { Search, X } from "lucide-react";
import { useState } from "react";
import ModuleCard from "./ModuleCard";
import { ModuleTemplate, modulesByCategory } from "@/utils/ModuleTemplate";

interface ModulesSidebarProps {
    onModuleDragStart: (e: React.DragEvent, module: ModuleTemplate) => void;
}

function ModulesSidebar({ onModuleDragStart }: ModulesSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(Object.keys(modulesByCategory))
    );

    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    const filteredModules = Object.entries(modulesByCategory).reduce((acc, [category, modules]) => {
        const filtered = modules.filter(module =>
            module.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
            acc[category] = filtered;
        }
        return acc;
    }, {} as Record<string, ModuleTemplate[]>);

    return (
        <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto flex-shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-900">Modules</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 mb-3">Drag & Drop</p>

                {/* Search */}
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Modules List */}
            <div className="p-3">
                {Object.entries(filteredModules).map(([category, modules]) => (
                    <div key={category} className="mb-4">
                        <button
                            onClick={() => toggleCategory(category)}
                            className="w-full text-left text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 hover:text-gray-900 transition-colors"
                        >
                            {category}
                        </button>
                        {expandedCategories.has(category) && (
                            <div>
                                {modules.map((module) => (
                                    <ModuleCard
                                        key={module.id}
                                        module={module}
                                        onDragStart={onModuleDragStart}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {Object.keys(filteredModules).length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-sm text-gray-400">No modules found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModulesSidebar;
