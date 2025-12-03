import { ArrowUp, ArrowDown, Star, Copy, Trash2 } from "lucide-react";

interface ElementContextMenuProps {
    position: { x: number; y: number };
    hasBadge: boolean;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onToggleBadge: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
    canMoveUp: boolean;
    canMoveDown: boolean;
}

function ElementContextMenu({
    position,
    hasBadge,
    onMoveUp,
    onMoveDown,
    onToggleBadge,
    onDuplicate,
    onDelete,
    canMoveUp,
    canMoveDown,
}: ElementContextMenuProps) {
    return (
        <div
            className="fixed z-50 flex flex-col gap-1 bg-white rounded-lg shadow-lg p-1"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            {/* Move Up */}
            <button
                onClick={onMoveUp}
                disabled={!canMoveUp}
                className="w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors group relative"
                title="Move up"
            >
                <ArrowUp className="w-5 h-5 text-gray-700" />
                <span className="absolute left-12 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Move up
                </span>
            </button>

            {/* Badge/Star */}
            <button
                onClick={onToggleBadge}
                className={`w-8 h-8  flex items-center justify-center rounded-md transition-colors group relative ${hasBadge ? "bg-purple-500 hover:bg-purple-600" : "hover:bg-gray-100"
                    }`}
                title="Badge"
            >
                <Star className={`w-5 h-5 ${hasBadge ? "text-white fill-white" : "text-gray-700"}`} />
                <span className="absolute left-12 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Badge
                </span>
            </button>

            {/* Duplicate */}
            <button
                onClick={onDuplicate}
                className="w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors group relative"
                title="Duplicate"
            >
                <Copy className="w-5 h-5 text-gray-700" />
                <span className="absolute left-12 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Duplicate
                </span>
            </button>

            {/* Delete */}
            <button
                onClick={onDelete}
                className="w-8 h-8  flex items-center justify-center rounded-md hover:bg-red-50 transition-colors group relative"
                title="Delete"
            >
                <Trash2 className="w-5 h-5 text-red-600" />
                <span className="absolute left-12 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Delete
                </span>
            </button>

            {/* Move Down */}
            <button
                onClick={onMoveDown}
                disabled={!canMoveDown}
                className="w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors group relative"
                title="Move down"
            >
                <ArrowDown className="w-5 h-5 text-gray-700" />
                <span className="absolute left-12 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Move down
                </span>
            </button>
        </div>
    );
}

export default ElementContextMenu;
