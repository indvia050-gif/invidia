import Konva from "konva";
import { useEffect, useRef } from "react";
import { Group } from "react-konva";
import { snap } from "@/utils/constants";
import { GroupItem, Item, RectItem, ImageItem, TextItem, ButtonItem } from "@/utils/type";
import DraggableRect from "./DraggableItem";
import DraggableImage from "./DraggableImage";
import DraggableText from "./DraggableText";
import DraggableButton from "./DraggableButton";

function DraggableGroup({
    item,
    isSelected,
    onSelect,
    onChange,
    trRef,
}: {
    item: GroupItem;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (it: GroupItem) => void;
    trRef: React.RefObject<Konva.Transformer | null>;
}) {
    const groupRef = useRef<Konva.Group>(null);

    useEffect(() => {
        if (isSelected && trRef.current && groupRef.current) {
            trRef.current.nodes([groupRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected, trRef]);

    const handleChildChange = (childId: string, updatedChild: Item) => {
        const updatedChildren = item.children.map(child =>
            child.id === childId ? updatedChild : child
        );
        onChange({ ...item, children: updatedChildren });
    };

    const renderChild = (child: Item) => {
        const childProps = {
            key: child.id,
            isSelected: false, // Children are not individually selectable
            onSelect: () => { }, // No-op for children
            trRef: { current: null }, // No transformer for children
        };

        switch (child.type) {
            case "rect":
                return <DraggableRect {...childProps} item={child as RectItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "image":
                return <DraggableImage {...childProps} item={child as ImageItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "text":
                return <DraggableText {...childProps} item={child as TextItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "button":
                return <DraggableButton {...childProps} item={child as ButtonItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "group":
                return <DraggableGroup {...childProps} item={child as GroupItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            default:
                return null;
        }
    };

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
                    width: Math.max(50, Math.round(node.width() * scaleX)),
                    height: Math.max(50, Math.round(node.height() * scaleY)),
                    rotation: Math.round(node.rotation() || 0),
                });
            }}
        >
            {item.children.map(renderChild)}
        </Group>
    );
}

export default DraggableGroup;
