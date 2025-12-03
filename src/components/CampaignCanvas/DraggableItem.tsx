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
    trRef,
}: {
    item: RectItem;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (it: RectItem) => void;
    trRef: React.RefObject<Konva.Transformer | null>;
}) {
    const shapeRef = useRef<Konva.Rect>(null);

    useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected, trRef]);

    return (
        <>
            <Rect
                ref={shapeRef}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                rotation={item.rotation ?? 0}
                fill={item.fill}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={(e) => {
                    onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) });
                }}
                onTransformEnd={() => {
                    const node = shapeRef.current!;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...item,
                        x: snap(node.x()),
                        y: snap(node.y()),
                        width: Math.max(8, Math.round(node.width() * scaleX)),
                        height: Math.max(8, Math.round(node.height() * scaleY)),
                        rotation: Math.round(node.rotation() || 0),
                    });
                }}
            />
        </>
    );
}

export default DraggableRect;   