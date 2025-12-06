import Konva from "konva";
import { useRef } from "react";
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
    isLocked = false,
}: {
    item: GroupItem;
    isSelected: boolean;
    onSelect: (event?: any) => void;
    onChange: (it: GroupItem) => void;
    isLocked?: boolean;
}) {
    const groupRef = useRef<Konva.Group>(null);

    const handleChildChange = (childId: string, updatedChild: Item) => {
        // children are stored in absolute coords; convert back before persisting
        const updatedChildren = item.children.map(child =>
            child.id === childId
                ? {
                    ...updatedChild,
                    x: item.x + updatedChild.x,
                    y: item.y + updatedChild.y,
                }
                : child
        );
        onChange({ ...item, children: updatedChildren });
    };

    const renderChild = (child: Item) => {
        const childProps = {
            key: child.id,
            isSelected: false, // Children are not individually selectable
            onSelect: () => { }, // No-op for children
            isLocked: true, // Children should not be individually draggable
        };

        // Render children in coordinates relative to the parent group
        const relativeChild = { ...child, x: child.x - item.x, y: child.y - item.y } as Item;

        switch (relativeChild.type) {
            case "rect":
                return <DraggableRect {...childProps} item={relativeChild as RectItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "image":
                return <DraggableImage {...childProps} item={relativeChild as ImageItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "text":
                return <DraggableText {...childProps} item={relativeChild as TextItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "button":
                return <DraggableButton {...childProps} item={relativeChild as ButtonItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            case "group":
                return <DraggableGroup {...childProps} item={relativeChild as GroupItem} onChange={(updated) => handleChildChange(child.id, updated)} />;
            default:
                return null;
        }
    };

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
            onClick={!isLocked ? onSelect : undefined}
            onTap={!isLocked ? onSelect : undefined}
            onDragEnd={(e) => {
                if (!isLocked) {
                    onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) });
                }
            }}
        >
            {item.children.map(renderChild)}
        </Group>
    );
}

export default DraggableGroup;
