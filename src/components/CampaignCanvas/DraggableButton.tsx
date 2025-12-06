import Konva from "konva";
import { useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { snap } from "@/utils/constants";
import { ButtonItem } from "@/utils/type";

function DraggableButton({
    item,
    isSelected,
    onSelect,
    onChange,
    isLocked = false,
    listening = true,
}: {
    item: ButtonItem;
    isSelected: boolean;
    onSelect: (event?: any) => void;
    onChange: (it: ButtonItem) => void;
    isLocked?: boolean;
    listening?: boolean;
}) {
    const groupRef = useRef<Konva.Group>(null);

    return (
        <Group
            ref={groupRef}
            id={item.id}
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
            rotation={item.rotation ?? 0}
            draggable={!isLocked}
            onClick={!isLocked ? (e) => onSelect(e) : undefined}
            onTap={!isLocked ? (e) => onSelect(e) : undefined}
            onDragEnd={(e) => {
                if (!isLocked) {
                    onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) });
                }
            }}
        >
            <Rect
                x={0}
                y={0}
                width={item.width}
                height={item.height}
                fill={item.fill ?? "#3b82f6"}
                cornerRadius={item.borderRadius ?? 6}
                stroke={isSelected ? "#3b82f6" : undefined}
                strokeWidth={isSelected ? 2 : 0}
                dash={isSelected ? [5, 5] : undefined}
                shadowColor={isSelected ? "rgba(59, 130, 246, 0.3)" : undefined}
                shadowBlur={isSelected ? 10 : 0}
                shadowOpacity={isSelected ? 0.5 : 0}
            />
            <Text
                x={0}
                y={0}
                width={item.width}
                height={item.height}
                text={item.text}
                fontSize={item.fontSize ?? Math.max(10, Math.min(18, item.height * 0.35))}
                fontFamily="Arial"
                fill={item.textColor ?? "#ffffff"}
                align="center"
                verticalAlign="middle"
            />
        </Group>
    );
}

export default DraggableButton;
