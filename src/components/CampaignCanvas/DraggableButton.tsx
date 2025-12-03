import Konva from "konva";
import { useEffect, useRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { snap } from "@/utils/constants";
import { ButtonItem } from "@/utils/type";

function DraggableButton({
    item,
    isSelected,
    onSelect,
    onChange,
    trRef,
}: {
    item: ButtonItem;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (it: ButtonItem) => void;
    trRef: React.RefObject<Konva.Transformer | null>;
}) {
    const groupRef = useRef<Konva.Group>(null);

    useEffect(() => {
        if (isSelected && trRef.current && groupRef.current) {
            trRef.current.nodes([groupRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected, trRef]);

    return (
        <Group
            ref={groupRef}
            x={item.x}
            y={item.y}
            width={item.width}
            height={item.height}
            rotation={item.rotation ?? 0}
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) })}
            onTransformEnd={() => {
                const node = groupRef.current!;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                    ...item,
                    x: snap(node.x()),
                    y: snap(node.y()),
                    width: Math.max(40, Math.round(node.width() * scaleX)),
                    height: Math.max(20, Math.round(node.height() * scaleY)),
                    rotation: Math.round(node.rotation() || 0),
                });
            }}
        >
            <Rect
                x={0}
                y={0}
                width={item.width}
                height={item.height}
                fill={item.fill ?? "#3b82f6"}
                cornerRadius={item.borderRadius ?? 6}
            />
            <Text
                x={0}
                y={0}
                width={item.width}
                height={item.height}
                text={item.text}
                fontSize={14}
                fontFamily="Arial"
                fill={item.textColor ?? "#ffffff"}
                align="center"
                verticalAlign="middle"
            />
        </Group>
    );
}

export default DraggableButton;
