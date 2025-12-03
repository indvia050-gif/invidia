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
    trRef,
}: {
    item: TextItem;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (it: TextItem) => void;
    trRef: React.RefObject<Konva.Transformer | null>;
}) {
    const textRef = useRef<Konva.Text>(null);

    useEffect(() => {
        if (isSelected && trRef.current && textRef.current) {
            trRef.current.nodes([textRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected, trRef]);

    return (
        <Text
            ref={textRef}
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
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) })}
            onTransformEnd={() => {
                const node = textRef.current!;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                    ...item,
                    x: snap(node.x()),
                    y: snap(node.y()),
                    width: Math.max(20, Math.round(node.width() * scaleX)),
                    height: Math.max(10, Math.round(node.height() * scaleY)),
                    rotation: Math.round(node.rotation() || 0),
                });
            }}
        />
    );
}

export default DraggableText;
