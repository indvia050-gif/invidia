// src/components/CanvasEditor.tsx
import Konva from "konva";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Image as KImage, Transformer, Group } from "react-konva";
import useImage from "use-image";

type BaseItem = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
};

type RectItem = BaseItem & { type: "rect"; fill: string };
type ImageItem = BaseItem & { type: "image"; src: string };

type Item = RectItem | ImageItem;

const GRID = 16;
const snap = (v: number) => Math.round(v / GRID) * GRID;

function useId(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
}

/* ---------------- Draggable rect component ---------------- */
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

/* ---------------- Draggable image component ---------------- */
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

/* ---------------- CanvasEditor ---------------- */
export default function CanvasEditor() {
    const stageWidth = 600;
    const stageHeight = 640;

    const [items, setItems] = useState<Item[]>(() => [
        { id: useId("r_"), type: "rect", x: 40, y: 40, width: 140, height: 90, fill: "#60a5fa" },
        { id: useId("r_"), type: "rect", x: 220, y: 120, width: 120, height: 80, fill: "#fb923c" },
    ]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const stageRef = useRef<Konva.Stage>(null);

    // Add rect
    const handleAddRect = useCallback(() => {
        const newRect: RectItem = {
            id: useId("r_"),
            type: "rect",
            x: 80,
            y: 80,
            width: 120,
            height: 80,
            fill: "#a78bfa",
        };
        setItems((s) => [...s, newRect]);
        setSelectedId(newRect.id);
    }, []);

    // Add image from URL
    const handleAddImage = useCallback(() => {
        const url = window.prompt("Image URL (http(s) or data URL):");
        if (!url) return;
        const img: ImageItem = { id: useId("i_"), type: "image", src: url, x: 100, y: 160, width: 220, height: 140 };
        setItems((s) => [...s, img]);
        setSelectedId(img.id);
    }, []);

    // Update item
    const updateItem = useCallback((next: Item) => {
        setItems((s) => s.map((it) => (it.id === next.id ? next : it)));
    }, []);

    // Delete selected
    const deleteSelected = useCallback(() => {
        if (!selectedId) return;
        setItems((s) => s.filter((it) => it.id !== selectedId));
        setSelectedId(null);
    }, [selectedId]);

    // Export PNG
    const exportPNG = useCallback(() => {
        const uri = stageRef.current?.toDataURL({ pixelRatio: 2 });
        if (!uri) return;
        const a = document.createElement("a");
        a.href = uri;
        a.download = "canvas.png";
        a.click();
    }, []);

    // handle external drops (image)
    useEffect(() => {
        function onDrop(e: DragEvent) {
            e.preventDefault();
            const url = e.dataTransfer?.getData("text/uri-list") || e.dataTransfer?.getData("text/plain");
            if (url && (url.startsWith("http") || url.startsWith("data:"))) {
                const img: ImageItem = { id: useId("i_"), type: "image", src: url, x: snap(e.clientX - 100), y: snap(e.clientY - 80), width: 200, height: 120 };
                setItems((s) => [...s, img]);
                setSelectedId(img.id);
            }
        }
        function onDragOver(e: DragEvent) {
            e.preventDefault();
        }
        window.addEventListener("drop", onDrop);
        window.addEventListener("dragover", onDragOver);
        return () => {
            window.removeEventListener("drop", onDrop);
            window.removeEventListener("dragover", onDragOver);
        };
    }, []);

    // click stage to clear selection
    const handleStageMouseDown = (e: any) => {
        // clicked on empty area
        if (e.target === e.target.getStage()) {
            setSelectedId(null);
            trRef.current?.nodes([]);
        }
    };

    // precompute grid lines for rendering (small rectangles/lines)
    // const gridLines = useMemo(() => {
    //     const lines: React.ReactElement[] = [];
    //     for (let x = 0; x < stageWidth; x += GRID) {
    //         lines.push(<Rect key={`vx-${x}`} x={x} y={0} width={1} height={stageHeight} fill="#eef2ff" opacity={0.7} />);
    //     }
    //     for (let y = 0; y < stageHeight; y += GRID) {
    //         lines.push(<Rect key={`hy-${y}`} x={0} y={y} width={stageWidth} height={1} fill="#eef2ff" opacity={0.7} />);
    //     }
    //     return lines;
    // }, [stageWidth, stageHeight]);

    return (
        <div className="flex justify-center items-center min-h-[600px] w-full">
            {/* Canvas */}
            <div className="bg-white rounded-lg shadow-sm p-3 max-w-fit">
                <div className="border border-slate-100 rounded">
                    <Stage
                        width={stageWidth}
                        height={stageHeight}
                        onMouseDown={handleStageMouseDown}
                        onTouchStart={handleStageMouseDown}
                        ref={stageRef}
                    >
                        <Layer>
                            {/* grid */}
                            {/* {gridLines} */}

                            {/* render items -- we attach the same Transformer via trRef when selected */}
                            {items.map((it) =>
                                it.type === "rect" ? (
                                    <DraggableRect
                                        key={it.id}
                                        item={it}
                                        isSelected={selectedId === it.id}
                                        onSelect={() => setSelectedId(it.id)}
                                        onChange={(next) => updateItem(next)}
                                        trRef={trRef}
                                    />
                                ) : (
                                    <DraggableImage
                                        key={it.id}
                                        item={it}
                                        isSelected={selectedId === it.id}
                                        onSelect={() => setSelectedId(it.id)}
                                        onChange={(next) => updateItem(next)}
                                        trRef={trRef}
                                    />
                                )
                            )}

                            {/* single transformer (reused) */}
                            <Transformer
                                ref={trRef}
                                anchorSize={8}
                                rotateEnabled={true}
                                keepRatio={false}
                                boundBoxFunc={(oldBox, newBox) => {
                                    // clamp min size
                                    if (newBox.width < 8 || newBox.height < 8) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    );
}
