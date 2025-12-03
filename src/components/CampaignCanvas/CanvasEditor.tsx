import Konva from "konva";
import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import DraggableImage from "./DraggableImage";
import DraggableRect from "./DraggableItem";
import DraggableText from "./DraggableText";
import DraggableButton from "./DraggableButton";
import DraggableGroup from "./DraggableGroup";
import ModulesSidebar from "./ModulesSidebar";
import ElementContextMenu from "./ElementContextMenu";
import useId, { snap } from "@/utils/constants";
import { ImageItem, Item, RectItem, TextItem, ButtonItem, GroupItem } from "@/utils/type";
import { ModuleTemplate } from "@/utils/ModuleTemplate";

function CanvasEditor() {
    const stageWidth = 600;
    const stageHeight = 640;

    const [items, setItems] = useState<Item[]>(() => []);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
        setMenuPosition(null);
        trRef.current?.nodes([]);
    }, [selectedId]);

    // Move item up (nudge)
    const moveItemUp = useCallback(() => {
        if (!selectedId) return;
        setItems((s) =>
            s.map((it) => (it.id === selectedId ? { ...it, y: it.y - 10 } : it))
        );
    }, [selectedId]);

    // Move item down (nudge)
    const moveItemDown = useCallback(() => {
        if (!selectedId) return;
        setItems((s) =>
            s.map((it) => (it.id === selectedId ? { ...it, y: it.y + 10 } : it))
        );
    }, [selectedId]);

    // Duplicate selected item
    const duplicateItem = useCallback(() => {
        if (!selectedId) return;
        const item = items.find((it) => it.id === selectedId);
        if (!item) return;

        const cloneItem = (original: Item): Item => {
            const base = {
                ...original,
                id: useId(original.type.charAt(0) + "_"),
                x: original.x + 20,
                y: original.y + 20,
            };

            if (original.type === "group") {
                return {
                    ...base,
                    children: original.children.map(cloneItem),
                } as GroupItem;
            }

            return base;
        };

        const duplicate = cloneItem(item);
        setItems((s) => [...s, duplicate]);
        setSelectedId(duplicate.id);
    }, [selectedId, items]);

    // Toggle badge on selected item
    const toggleBadge = useCallback(() => {
        if (!selectedId) return;
        setItems((s) =>
            s.map((it) => (it.id === selectedId ? { ...it, badge: !it.badge } : it))
        );
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

    // Handle module drag start from sidebar
    const handleModuleDragStart = useCallback((e: React.DragEvent, module: ModuleTemplate) => {
        e.dataTransfer.setData("application/json", JSON.stringify(module));
        e.dataTransfer.effectAllowed = "copy";
    }, []);

    // Handle drop on canvas
    const handleCanvasDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();

        const moduleData = e.dataTransfer.getData("application/json");
        if (moduleData) {
            try {
                const module: ModuleTemplate = JSON.parse(moduleData);
                const containerRect = containerRef.current?.getBoundingClientRect();
                const stageRect = stageRef.current?.container().getBoundingClientRect();

                if (containerRect && stageRect) {
                    // Calculate drop position relative to stage
                    const x = snap(e.clientX - stageRect.left);
                    const y = snap(e.clientY - stageRect.top);

                    // Clone module items with new IDs and adjusted positions
                    const cloneItems = (items: Item[], offsetX: number, offsetY: number): Item[] => {
                        return items.map(item => {
                            const baseClone = {
                                ...item,
                                id: useId(item.type.charAt(0) + "_"),
                                x: item.x + offsetX,
                                y: item.y + offsetY,
                            };

                            if (item.type === "group") {
                                return {
                                    ...baseClone,
                                    children: cloneItems(item.children, 0, 0),
                                } as GroupItem;
                            }

                            return baseClone;
                        });
                    };

                    const newItems = cloneItems(module.items, x, y);
                    setItems((s) => [...s, ...newItems]);

                    // Select the first item
                    if (newItems.length > 0) {
                        setSelectedId(newItems[0].id);
                    }
                }
            } catch (error) {
                console.error("Failed to parse module data:", error);
            }
        }
    }, []);

    const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
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
            setMenuPosition(null);
            trRef.current?.nodes([]);
        }
    };

    // Update menu position when selection changes
    useEffect(() => {
        if (!selectedId || !stageRef.current) {
            setMenuPosition(null);
            return;
        }

        const selectedItem = items.find((it) => it.id === selectedId);
        if (!selectedItem) {
            setMenuPosition(null);
            return;
        }

        const stageRect = stageRef.current.container().getBoundingClientRect();
        const menuX = stageRect.left + selectedItem.x - 60; // 60px left of element
        const menuY = stageRect.top + selectedItem.y;

        setMenuPosition({ x: menuX, y: menuY });
    }, [selectedId, items]);

    // Render item based on type
    const renderItem = (item: Item) => {
        const itemProps = {
            key: item.id,
            item,
            isSelected: selectedId === item.id,
            onSelect: () => setSelectedId(item.id),
            trRef,
        };

        switch (item.type) {
            case "rect":
                return <DraggableRect {...itemProps} item={item as RectItem} onChange={(next) => updateItem(next)} />;
            case "image":
                return <DraggableImage {...itemProps} item={item as ImageItem} onChange={(next) => updateItem(next)} />;
            case "text":
                return <DraggableText {...itemProps} item={item as TextItem} onChange={(next) => updateItem(next)} />;
            case "button":
                return <DraggableButton {...itemProps} item={item as ButtonItem} onChange={(next) => updateItem(next)} />;
            case "group":
                return <DraggableGroup {...itemProps} item={item as GroupItem} onChange={(next) => updateItem(next)} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen w-full">
            {/* Modules Sidebar */}
            <ModulesSidebar onModuleDragStart={handleModuleDragStart} />

            {/* Canvas Area */}
            <div
                ref={containerRef}
                className="flex-1 flex justify-center items-center min-h-[600px] bg-gray-100"
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
            >
                <div className="bg-white shadow-sm p-3 max-w-fit border border-gray-200">
                    <Stage
                        width={stageWidth}
                        height={stageHeight}
                        onMouseDown={handleStageMouseDown}
                        onTouchStart={handleStageMouseDown}
                        ref={stageRef}
                    >
                        <Layer>
                            {/* render items */}
                            {items.map(renderItem)}

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

                {/* Element Context Menu */}
                {menuPosition && selectedId && (() => {
                    const selectedItem = items.find((it) => it.id === selectedId);
                    return (
                        <ElementContextMenu
                            position={menuPosition}
                            hasBadge={selectedItem?.badge || false}
                            onMoveUp={moveItemUp}
                            onMoveDown={moveItemDown}
                            onToggleBadge={toggleBadge}
                            onDuplicate={duplicateItem}
                            onDelete={deleteSelected}
                            canMoveUp={true}
                            canMoveDown={true}
                        />
                    );
                })()}
            </div>
        </div>
    );
}
export default CanvasEditor;