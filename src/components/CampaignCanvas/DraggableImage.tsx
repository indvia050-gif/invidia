import Konva from "konva";
import { useRef } from "react";
import { Image as KImage } from "react-konva";
import useImage from "use-image";
import { snap } from "@/utils/constants";
import { ImageItem } from "@/utils/type";

function DraggableImage({
    item,
    isSelected,
    onSelect,
    onChange,
    isLocked = false,
    listening = true,
}: {
    item: ImageItem;
    isSelected: boolean;
    onSelect: (event?: any) => void;
    onChange: (it: ImageItem) => void;
    isLocked?: boolean;
    listening?: boolean;
}) {
    const imgRef = useRef<Konva.Image>(null);
    const [img] = useImage(item.src, "anonymous");

    return (
        <>
            <KImage
                ref={imgRef}
                id={item.id}
                image={img}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                rotation={item.rotation ?? 0}
                draggable={!isLocked}
                listening={listening}
                onClick={!isLocked ? (e) => onSelect(e) : undefined}
                onTap={!isLocked ? (e) => onSelect(e) : undefined}
                stroke={isSelected ? "#3b82f6" : undefined}
                strokeWidth={isSelected ? 2 : 0}
                dash={isSelected ? [5, 5] : undefined}
                shadowColor={isSelected ? "rgba(59, 130, 246, 0.3)" : undefined}
                shadowBlur={isSelected ? 10 : 0}
                shadowOpacity={isSelected ? 0.5 : 0}
                onDragEnd={(e) => {
                    if (!isLocked) {
                        onChange({ ...item, x: snap(e.target.x()), y: snap(e.target.y()) });
                    }
                }}
            />
        </>
    );
}

export default DraggableImage;