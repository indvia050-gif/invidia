import Konva from "konva";
import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { LuCopy } from "react-icons/lu";
import { SiHackthebox } from "react-icons/si";
import { TbTextResize } from "react-icons/tb";
import { PiUploadSimpleLight } from "react-icons/pi";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { RxButton } from "react-icons/rx";
import DraggableImage from "./DraggableImage";
import DraggableRect from "./DraggableItem";
import DraggableText from "./DraggableText";
import DraggableButton from "./DraggableButton";
import DraggableGroup from "./DraggableGroup";
import ElementContextMenu from "./ElementContextMenu";
import useId, { snap } from "@/utils/constants";
import { ImageItem, Item, RectItem, TextItem, ButtonItem, GroupItem } from "@/utils/type";
import { ModuleTemplate } from "@/utils/ModuleTemplate";
import Star01 from "/star.png";
import Modules from "./Modules";

function CanvasEditor() {
    const stageWidth = 600;
    const stageHeight = 640;

    const [items, setItems] = useState<Item[]>(() => []);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const trRef = useRef<Konva.Transformer>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Template loaders mapping
    const templateLoaders = {
        template1: () => import('../../templates/template1.json'),
        itemRecommendationModule: () => import('../../templates/FirstTemplate.json'),
        categoryTemplate: () => import('../../templates/CateFirstTemplate.json'),
        itemrecomndationTemplate: () => import('../../templates/ItemRecomendationTemp.json'),
        threeColTemp: () => import('../../templates/ThreeColTemplate.json'),
        productUseTemp: () => import('../../templates/ProductusageTemplate.json'),
        socialmediaTemp: () => import('../../templates/SocialMediaTemplate.json'),
        indBlock1: () => import('../../templates/IndBlock.json'),
        indBlockTemp2: () => import('../../templates/IndBlock2.json'),
        cateRecBlock: () => import('../../templates/CateRecomBlock.json')
    };

    const loadTemplate = async (templateKey: string, x: number, y: number) => {
        const loader = templateLoaders[templateKey as keyof typeof templateLoaders];
        if (!loader) {
            console.error(`Template ${templateKey} not found`);
            return;
        }

        try {
            const module = await loader();
            const template = module.default || module;

            // Calculate scale to fit canvas width
            const canvasWidth = stageWidth;
            const templateWidth = template.canvas?.width || 800; // default width if not specified
            const scale = canvasWidth / templateWidth;

            // Transform template layers to canvas items
            const transformLayerToItem = (layer: any): Item | null => {
                const baseProps = {
                    id: layer.id,
                    x: layer.x * scale,
                    y: layer.y * scale,
                    width: layer.width * scale,
                    height: layer.height * scale,
                    rotation: layer.rotation || 0,
                };

                switch (layer.type) {
                    case 'rect':
                        return {
                            ...baseProps,
                            type: 'rect' as const,
                            fill: layer.fill || '#a78bfa',
                        } as RectItem;
                    case 'image':
                        return {
                            ...baseProps,
                            type: 'image' as const,
                            src: layer.src || '',
                        } as ImageItem;
                    case 'text':
                        return {
                            ...baseProps,
                            type: 'text' as const,
                            text: layer.text || '',
                            fontSize: layer.fontSize,
                            fontFamily: layer.fontFamily,
                            fill: layer.fill,
                            align: layer.align,
                            fontStyle: layer.fontStyle,
                        } as TextItem;
                    case 'button':
                        return {
                            ...baseProps,
                            type: 'button' as const,
                            text: layer.text || '',
                            fill: layer.fill,
                            textColor: layer.textColor,
                            borderRadius: layer.borderRadius,
                        } as ButtonItem;
                    default:
                        return null;
                }
            };

            const transformedItems = template.layers
                .map(transformLayerToItem)
                .filter((item): item is Item => item !== null);

            // Calculate template bounds to center it at drop point
            if (transformedItems.length > 0) {
                const minX = Math.min(...transformedItems.map(item => item.x));
                const maxX = Math.max(...transformedItems.map(item => item.x + item.width));
                const minY = Math.min(...transformedItems.map(item => item.y));
                const maxY = Math.max(...transformedItems.map(item => item.y + item.height));
                
                const templateWidth = maxX - minX;
                const templateHeight = maxY - minY;
                
                // Center the template at the drop point
                const offsetX = x - templateWidth / 2 - minX;
                const offsetY = y - templateHeight / 2 - minY;
                
                const finalItems = transformedItems.map(item => ({
                    ...item,
                    id: useId(item.type.charAt(0) + "_"),
                    x: item.x + offsetX,
                    y: item.y + offsetY,
                }));

                setItems((s) => [...s, ...finalItems]);

                // Select the first item
                if (finalItems.length > 0) {
                    setSelectedId(finalItems[0].id);
                }
            }
        } catch (error) {
            console.error(`Failed to load template ${templateKey}:`, error);
        }
    };

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
        setIsDragOver(false);

        const templateKey = e.dataTransfer.getData("template");
        if (templateKey) {
            try {
                const templateData = JSON.parse(templateKey);
                const key = templateData.templateKey;
                const stageRect = stageRef.current?.container().getBoundingClientRect();
                
                if (stageRect && key) {
                    const x = e.clientX - stageRect.left;
                    const y = e.clientY - stageRect.top;
                    loadTemplate(key, x, y);
                }
            } catch (error) {
                console.error("Failed to parse template data:", error);
            }
            return;
        }

        const moduleData = e.dataTransfer.getData("application/json");
        if (moduleData) {
            try {
                const module: ModuleTemplate = JSON.parse(moduleData);
                const stageRect = stageRef.current?.container().getBoundingClientRect();

                if (stageRect) {
                    const x = e.clientX - stageRect.left;
                    const y = e.clientY - stageRect.top;

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
        setIsDragOver(true);
        e.dataTransfer.dropEffect = "copy";
    }, []);

    const handleCanvasDragLeave = useCallback((e: React.DragEvent) => {
        // Only set drag over to false if we're actually leaving the canvas area
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            setIsDragOver(false);
        }
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

    // Sidebar state and handlers
    const [activeSidebar, setActiveSidebar] = useState<string | null>(null);

    const handleAssetsClick = () => setActiveSidebar('assets');
    const handleElementsClick = () => setActiveSidebar('elements');
    const handleTextClick = () => setActiveSidebar('text');
    const handleImportClick = () => setActiveSidebar('import');
    const handleModulesClick = () => setActiveSidebar(activeSidebar === 'modules' ? null : 'modules');
    const handleGraphicClick = () => setActiveSidebar('graphic');
    const handleCTAClick = () => setActiveSidebar('cta');

    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <div className='w-[68px] bg-[#F9F9FF] h-screen hidden lg:block'>
                <div className='border border-[#CECECE] rounded-lg p-2 h-screen'>
                    <button onClick={handleAssetsClick} className='cursor-pointer mb-2'>
                        <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'assets' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
                            <LuCopy className={`text-xl ${activeSidebar === 'assets' ? 'text-white' : 'text-[#4B465C]'}`} />
                        </div>
                        <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'assets' ? 'text-[#934294]' : 'text-[#282828]'}`}>Assets</p>
                    </button>
                    <button onClick={handleElementsClick} className='cursor-pointer mb-2'>
                        <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'elements' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
                            <SiHackthebox className={`text-xl ${activeSidebar === 'elements' ? 'text-white' : 'text-[#4B465C]'}`} />
                        </div>
                        <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'elements' ? 'text-[#934294]' : 'text-[#282828]'}`}>Elements</p>
                    </button>
                    <button onClick={handleTextClick} className='cursor-pointer mb-2'>
                        <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'text' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
                            <TbTextResize className={`text-xl ${activeSidebar === 'text' ? 'text-white' : 'text-[#4B465C]'}`} />
                        </div>
                        <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'text' ? 'text-[#934294]' : 'text-[#282828]'}`}>Text</p>
                    </button>
                    <button onClick={handleImportClick} className='cursor-pointer mb-2'>
                        <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'import' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
                            <PiUploadSimpleLight className={`text-xl ${activeSidebar === 'import' ? 'text-white' : 'text-[#4B465C]'}`} />
                        </div>
                        <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'import' ? 'text-[#934294]' : 'text-[#282828]'}`}>Import</p>
                    </button>
                    <button onClick={handleModulesClick} className='cursor-pointer mb-2'>
                        <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'modules' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
                            <TfiLayoutAccordionSeparated className={`text-xl ${activeSidebar === 'modules' ? 'text-white' : 'text-[#4B465C]'}`} />
                        </div>
                        <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'modules' ? 'text-[#934294]' : 'text-[#282828]'}`}>Modules</p>
                    </button>
                    <button onClick={handleGraphicClick} className='cursor-pointer mb-2'>
                        <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'graphic' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
                            <img src={Star01} alt="Star01" className={`w-[28px] ${activeSidebar === 'graphic' ? 'brightness-0 invert' : ''}`} />
                        </div>
                        <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'graphic' ? 'text-[#934294]' : 'text-[#282828]'}`}>Indivio.AI</p>
                    </button>
                    <button onClick={handleCTAClick} className='cursor-pointer mb-2'>
                        <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'cta' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
                            <RxButton className={`text-xl ${activeSidebar === 'cta' ? 'text-white' : 'text-[#4B465C]'}`} />
                        </div>
                        <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'cta' ? 'text-[#934294]' : 'text-[#282828]'}`}>CTA</p>
                    </button>
                </div>
            </div>

            {/* Modules Sidebar - only show when activeSidebar is 'modules' */}
            {activeSidebar === 'modules' && (
                <div className='lg:w-[362px] absolute left-0 lg:left-[200px] bottom-[200px] lg:bottom-[initial] z-20'>
                    <Modules/>
                </div>
            )}

            {/* Canvas Area */}
            <div
                ref={containerRef}
                className={`flex-1 flex justify-center items-center min-h-[600px] bg-gray-100 ${
                    isDragOver ? 'bg-blue-50 border-blue-300' : ''
                } transition-colors duration-200`}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
                onDragLeave={handleCanvasDragLeave}
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