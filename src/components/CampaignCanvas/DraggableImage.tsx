import Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Image as KImage } from "react-konva";
import useImage from "use-image";
import { snap } from "@/utils/constants";
import { ImageItem } from "@/utils/type";

function DraggableImage({
    item,
    isSelected,
    onSelect,
    onChange,
    trRef,
}: {
    item: ImageItem;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (it: ImageItem) => void;
    trRef: React.RefObject<Konva.Transformer | null>;
}) {
    const imgRef = useRef<Konva.Image>(null);
    const [img] = useImage(item.src, "anonymous");

    useEffect(() => {
        if (isSelected && trRef.current && imgRef.current) {
            trRef.current.nodes([imgRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected, trRef]);

    return (
        <>
            <KImage
                ref={imgRef}
                image={img}
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
                    const node = imgRef.current!;
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
                    });
                }}
            />
        </>
    );
}

export default DraggableImage;