// src/components/CanvasEditor.tsx
import Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Rect, } from "react-konva";
import { snap } from "@/utils/constants";
import { RectItem } from "@/utils/type";

function DraggableRect({
    item,
    isSelected,
    onSelect,
    onChange,
    isLocked = false,
    listening = true,
}: {
    item: RectItem;
    isSelected: boolean;
    onSelect: (event?: any) => void;
    onChange: (it: RectItem) => void;
    isLocked?: boolean;
    listening?: boolean;
}) {
    const shapeRef = useRef<Konva.Rect>(null);

    useEffect(() => {
        // Transformer attachment is now handled centrally
    }, []);

    return (
        <>
            <Rect
                ref={shapeRef}
                id={item.id}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                rotation={item.rotation ?? 0}
                fill={item.fill}
                stroke={isSelected ? "#3b82f6" : undefined}
                strokeWidth={isSelected ? 2 : 0}
                dash={isSelected ? [5, 5] : undefined}
                shadowColor={isSelected ? "rgba(59, 130, 246, 0.3)" : undefined}
                shadowBlur={isSelected ? 10 : 0}
                shadowOpacity={isSelected ? 0.5 : 0}
                draggable={!isLocked}
                listening={listening}
                onClick={!isLocked ? (e) => onSelect(e) : undefined}
                onTap={!isLocked ? (e) => onSelect(e) : undefined}
                onDragEnd={(e) => {
                    if (!isLocked) {
                        onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) });
                    }
                }}
            />
        </>
    );
}

export default DraggableRect;   