import Konva from "konva";
import { useEffect, useRef } from "react";
import { Text } from "react-konva";
import { snap } from "@/utils/constants";
import { TextItem } from "@/utils/type";

function DraggableText({
    item,
    isSelected,
    onSelect,
    onChange,
    isLocked = false,
    listening = true,
}: {
    item: TextItem;
    isSelected: boolean;
    onSelect: (event?: any) => void;
    onChange: (it: TextItem) => void;
    isLocked?: boolean;
    listening?: boolean;
}) {
    const textRef = useRef<Konva.Text>(null);

    return (
        <Text
            ref={textRef}
            id={item.id}
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
            rotation={item.rotation ?? 0}
            text={item.text}
            fontSize={item.fontSize ?? 16}
            fontFamily={item.fontFamily ?? "Arial"}
            fill={item.fill ?? "#000000"}
            align={item.align ?? "left"}
            fontStyle={item.fontStyle ?? "normal"}
            draggable={!isLocked}
            listening={listening}
            onClick={!isLocked ? (e) => onSelect(e) : undefined}
            onTap={!isLocked ? (e) => onSelect(e) : undefined}
            stroke={isSelected ? "#3b82f6" : undefined}
            strokeWidth={isSelected ? 1 : 0}
            dash={isSelected ? [3, 3] : undefined}
            shadowColor={isSelected ? "rgba(59, 130, 246, 0.3)" : undefined}
            shadowBlur={isSelected ? 8 : 0}
            shadowOpacity={isSelected ? 0.5 : 0}
            onDragEnd={(e) => {
                if (!isLocked) {
                    onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) });
                }
            }}
        />
    );
}

export default DraggableText;
