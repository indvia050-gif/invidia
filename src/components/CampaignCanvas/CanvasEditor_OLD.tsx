// import Konva from "konva";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Stage, Layer, Transformer } from "react-konva";
// import { LuCopy } from "react-icons/lu";
// import { SiHackthebox } from "react-icons/si";
// import { TbTextResize } from "react-icons/tb";
// import { PiUploadSimpleLight } from "react-icons/pi";
// import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
// import { RxButton } from "react-icons/rx";
// import { FaUndo, FaRedo, FaLayerGroup, FaArrowUp, FaArrowDown, FaStar, FaCopy, FaTrash } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import DraggableImage from "./DraggableImage";
// import DraggableRect from "./DraggableItem";
// import DraggableText from "./DraggableText";
// import DraggableButton from "./DraggableButton";
// import DraggableGroup from "./DraggableGroup";
// import useId from "@/utils/constants";
// import { ImageItem, Item, RectItem, TextItem, ButtonItem, GroupItem } from "@/utils/type";
// import { ModuleTemplate } from "@/utils/ModuleTemplate";
// import Modules from "./Modules";
// function CanvasEditor() {
//     const stageWidth = 600;
//     const stageHeight = 640;

//     const [items, setItems] = useState<Item[]>(() => []);
//     const [selectedId, setSelectedId] = useState<string | null>(null);
//     const [isDragOver, setIsDragOver] = useState(false);
//     const trRef = useRef<Konva.Transformer>(null);
//     const stageRef = useRef<Konva.Stage>(null);
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Sidebar state - Single state to manage which sidebar is open
//     const [activeSidebar, setActiveSidebar] = useState<string | null>(null);

//     // API data state for Assets
//     const [assetsSearchTerm, setAssetsSearchTerm] = useState("cap");
//     const [assetsData, setAssetsData] = useState<any[]>([]);
//     const [assetsLoading, setAssetsLoading] = useState(false);
//     const [assetsError, setAssetsError] = useState<string | null>(null);
//     const [assetsResultLimit, setAssetsResultLimit] = useState(30);

//     // API data state for Elements
//     const [elementsSearchTerm, setElementsSearchTerm] = useState("shoe");
//     const [elementsData, setElementsData] = useState<any[]>([]);
//     const [elementsLoading, setElementsLoading] = useState(false);
//     const [elementsError, setElementsError] = useState<string | null>(null);
//     const [selectedIconType, setSelectedIconType] = useState('all');
//     const [dragPreview, setDragPreview] = useState<string | null>(null);

//     // Sidebar handlers
//     const handleAssetsClick = () => setActiveSidebar(activeSidebar === 'assets' ? null : 'assets');
//     const handleElementsClick = () => setActiveSidebar(activeSidebar === 'elements' ? null : 'elements');
//     const handleTextClick = () => setActiveSidebar(activeSidebar === 'text' ? null : 'text');
//     const handleImportClick = () => setActiveSidebar(activeSidebar === 'import' ? null : 'import');
//     const handleModulesClick = () => setActiveSidebar(activeSidebar === 'modules' ? null : 'modules');
//     const handleGraphicClick = () => setActiveSidebar(activeSidebar === 'graphic' ? null : 'graphic');
//     const handleCTAClick = () => setActiveSidebar(activeSidebar === 'cta' ? null : 'cta');

//     // Template loaders mapping
//     const templateLoaders = {
//         template1: () => import('../../templates/template1.json'),
//         itemRecommendationModule: () => import('../../templates/FirstTemplate.json'),
//         categoryTemplate: () => import('../../templates/CateFirstTemplate.json'),
//         itemrecomndationTemplate: () => import('../../templates/ItemRecomendationTemp.json'),
//         threeColTemp: () => import('../../templates/ThreeColTemplate.json'),
//         productUseTemp: () => import('../../templates/ProductusageTemplate.json'),
//         socialmediaTemp: () => import('../../templates/SocialMediaTemplate.json'),
//         indBlock1: () => import('../../templates/IndBlock.json'),
//         indBlockTemp2: () => import('../../templates/IndBlock2.json'),
//         cateRecBlock: () => import('../../templates/CateRecomBlock.json')
//     };

//     const loadTemplate = async (templateKey: string, x: number, y: number) => {
//         const loader = templateLoaders[templateKey as keyof typeof templateLoaders];
//         if (!loader) {
//             console.error(`Template ${templateKey} not found`);
//             return;
//         }

//         try {
//             const module = await loader();
//             const template = module.default || module;

//             // Calculate scale to fit canvas width
//             const canvasWidth = stageWidth;
//             const templateWidth = template.canvas?.width || 800;
//             const scale = canvasWidth / templateWidth;

//             // Transform template layers to canvas items
//             const transformLayerToItem = (layer: any): Item | null => {
//                 const baseProps = {
//                     id: layer.id,
//                     x: layer.x * scale,
//                     y: layer.y * scale,
//                     width: layer.width * scale,
//                     height: layer.height * scale,
//                     rotation: layer.rotation || 0,
//                 };

//                 switch (layer.type) {
//                     case 'rect':
//                         return {
//                             ...baseProps,
//                             type: 'rect' as const,
//                             fill: layer.fill || '#a78bfa',
//                         } as RectItem;
//                     case 'image':
//                         return {
//                             ...baseProps,
//                             type: 'image' as const,
//                             src: layer.src || '',
//                         } as ImageItem;
//                     case 'text':
//                         return {
//                             ...baseProps,
//                             type: 'text' as const,
//                             text: layer.text || '',
//                             fontSize: layer.fontSize,
//                             fontFamily: layer.fontFamily,
//                             fill: layer.fill,
//                             align: layer.align,
//                             fontStyle: layer.fontStyle,
//                         } as TextItem;
//                     case 'button':
//                         return {
//                             ...baseProps,
//                             type: 'button' as const,
//                             text: layer.text || '',
//                             fill: layer.fill,
//                             textColor: layer.textColor,
//                             borderRadius: layer.borderRadius,
//                         } as ButtonItem;
//                     default:
//                         return null;
//                 }
//             };

//             const transformedItems = template.layers
//                 .map(transformLayerToItem)
//                 .filter((item): item is Item => item !== null);

//             // Calculate template bounds to center it at drop point
//             if (transformedItems.length > 0) {
//                 const minX = Math.min(...transformedItems.map(item => item.x));
//                 const maxX = Math.max(...transformedItems.map(item => item.x + item.width));
//                 const minY = Math.min(...transformedItems.map(item => item.y));
//                 const maxY = Math.max(...transformedItems.map(item => item.y + item.height));
                
//                 const templateWidth = maxX - minX;
//                 const templateHeight = maxY - minY;
                
//                 // Center the template at the drop point
//                 const offsetX = x - templateWidth / 2 - minX;
//                 const offsetY = y - templateHeight / 2 - minY;
                
//                 const finalItems = transformedItems.map(item => ({
//                     ...item,
//                     id: useId(item.type.charAt(0) + "_"),
//                     x: item.x + offsetX,
//                     y: item.y + offsetY,
//                 }));

//                 setItems((s) => [...s, ...finalItems]);

//                 // Select the first item
//                 if (finalItems.length > 0) {
//                     setSelectedId(finalItems[0].id);
//                 }
//             }
//         } catch (error) {
//             console.error(`Failed to load template ${templateKey}:`, error);
//         }
//     };

//     // Update item
//     const updateItem = useCallback((next: Item) => {
//         setItems((s) => s.map((it) => (it.id === next.id ? next : it)));
//     }, []);

//     // Delete selected
//     const deleteSelected = useCallback(() => {
//         if (!selectedId) return;
//         setItems((s) => s.filter((it) => it.id !== selectedId));
//         setSelectedId(null);
//         trRef.current?.nodes([]);
//     }, [selectedId]);

//     // Move item up (nudge)
//     const moveItemUp = useCallback(() => {
//         if (!selectedId) return;
//         setItems((s) =>
//             s.map((it) => (it.id === selectedId ? { ...it, y: it.y - 10 } : it))
//         );
//     }, [selectedId]);

//     // Move item down (nudge)
//     const moveItemDown = useCallback(() => {
//         if (!selectedId) return;
//         setItems((s) =>
//             s.map((it) => (it.id === selectedId ? { ...it, y: it.y + 10 } : it))
//         );
//     }, [selectedId]);

//     // Duplicate selected item
//     const duplicateItem = useCallback(() => {
//         if (!selectedId) return;
//         const item = items.find((it) => it.id === selectedId);
//         if (!item) return;

//         const cloneItem = (original: Item): Item => {
//             const base = {
//                 ...original,
//                 id: useId(original.type.charAt(0) + "_"),
//                 x: original.x + 20,
//                 y: original.y + 20,
//             };

//             if (original.type === "group") {
//                 return {
//                     ...base,
//                     children: original.children.map(cloneItem),
//                 } as GroupItem;
//             }

//             return base;
//         };

//         const duplicate = cloneItem(item);
//         setItems((s) => [...s, duplicate]);
//         setSelectedId(duplicate.id);
//     }, [selectedId, items]);

//     // Export PNG
//     const exportPNG = useCallback(() => {
//         const uri = stageRef.current?.toDataURL({ pixelRatio: 2 });
//         if (!uri) return;
//         const a = document.createElement("a");
//         a.href = uri;
//         a.download = "canvas.png";
//         a.click();
//     }, []);

//     // Handle drop on canvas
//     const handleCanvasDrop = useCallback((e: React.DragEvent) => {
//         e.preventDefault();
//         setIsDragOver(false);

//         const templateKey = e.dataTransfer.getData("template");
//         if (templateKey) {
//             try {
//                 const templateData = JSON.parse(templateKey);
//                 const key = templateData.templateKey;
//                 const stageRect = stageRef.current?.container().getBoundingClientRect();
                
//                 if (stageRect && key) {
//                     const x = e.clientX - stageRect.left;
//                     const y = e.clientY - stageRect.top;
//                     loadTemplate(key, x, y);
//                 }
//             } catch (error) {
//                 console.error("Failed to parse template data:", error);
//             }
//             return;
//         }

//         const moduleData = e.dataTransfer.getData("application/json");
//         if (moduleData) {
//             try {
//                 const module: ModuleTemplate = JSON.parse(moduleData);
//                 const stageRect = stageRef.current?.container().getBoundingClientRect();

//                 if (stageRect) {
//                     const x = e.clientX - stageRect.left;
//                     const y = e.clientY - stageRect.top;

//                     // Clone module items with new IDs and adjusted positions
//                     const cloneItems = (items: Item[], offsetX: number, offsetY: number): Item[] => {
//                         return items.map(item => {
//                             const baseClone = {
//                                 ...item,
//                                 id: useId(item.type.charAt(0) + "_"),
//                                 x: item.x + offsetX,
//                                 y: item.y + offsetY,
//                             };

//                             if (item.type === "group") {
//                                 return {
//                                     ...baseClone,
//                                     children: cloneItems(item.children, 0, 0),
//                                 } as GroupItem;
//                             }

//                             return baseClone;
//                         });
//                     };

//                     const newItems = cloneItems(module.items, x, y);
//                     setItems((s) => [...s, ...newItems]);

//                     // Select the first item
//                     if (newItems.length > 0) {
//                         setSelectedId(newItems[0].id);
//                     }
//                 }
//             } catch (error) {
//                 console.error("Failed to parse module data:", error);
//             }
//         }
//     }, []);

//     const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
//         e.preventDefault();
//         setIsDragOver(true);
//         e.dataTransfer.dropEffect = "copy";
//     }, []);

//     const handleCanvasDragLeave = useCallback((e: React.DragEvent) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const x = e.clientX;
//         const y = e.clientY;

//         if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
//             setIsDragOver(false);
//         }
//     }, []);

//     // click stage to clear selection
//     const handleStageMouseDown = (e: any) => {
//         if (e.target === e.target.getStage()) {
//             setSelectedId(null);
//             trRef.current?.nodes([]);
//         }
//     };



//     // Render item based on type
//     const renderItem = (item: Item) => {
//         const itemProps = {
//             key: item.id,
//             item,
//             isSelected: selectedId === item.id,
//             onSelect: () => setSelectedId(item.id),
//             trRef,
//         };

//         switch (item.type) {
//             case "rect":
//                 return <DraggableRect {...itemProps} item={item as RectItem} onChange={(next) => updateItem(next)} />;
//             case "image":
//                 return <DraggableImage {...itemProps} item={item as ImageItem} onChange={(next) => updateItem(next)} />;
//             case "text":
//                 return <DraggableText {...itemProps} item={item as TextItem} onChange={(next) => updateItem(next)} />;
//             case "button":
//                 return <DraggableButton {...itemProps} item={item as ButtonItem} onChange={(next) => updateItem(next)} />;
//             case "group":
//                 return <DraggableGroup {...itemProps} item={item as GroupItem} onChange={(next) => updateItem(next)} />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="flex gap-4 relative bg-white rounded-2xl shadow-xl mt-0 p-4 w-full h-screen overflow-hidden">
//             {/* Left Sidebar - Icon Navigation */}
//             <div className='w-[68px] bg-[#F9F9FF] h-full flex-shrink-0'>
//                   <div className='border border-[#CECECE] rounded-lg p-2 h-screen'>
//               <button onClick={handleAssetsClick} className='cursor-pointer mb-2'>
//                 <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'assets' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
//                   <LuCopy className={`text-xl ${activeSidebar === 'assets' ? 'text-white' : 'text-[#4B465C]'}`} />
//                 </div>
//                 <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'assets' ? 'text-[#934294]' : 'text-[#282828]'}`}>Assets</p>
//               </button>
//               <button onClick={handleElementsClick} className='cursor-pointer mb-2'>
//                 <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'elements' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
//                   <SiHackthebox className={`text-xl ${activeSidebar === 'elements' ? 'text-white' : 'text-[#4B465C]'}`} />
//                 </div>
//                 <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'elements' ? 'text-[#934294]' : 'text-[#282828]'}`}>Elements</p>
//               </button>
//               <button onClick={handleTextClick} className='cursor-pointer mb-2'>
//                 <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'text' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
//                   <TbTextResize className={`text-xl ${activeSidebar === 'text' ? 'text-white' : 'text-[#4B465C]'}`} />
//                 </div>
//                 <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'text' ? 'text-[#934294]' : 'text-[#282828]'}`}>Text</p>
//               </button>
//               <button onClick={handleImportClick} className='cursor-pointer mb-2'>
//                 <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'import' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
//                   <PiUploadSimpleLight className={`text-xl ${activeSidebar === 'import' ? 'text-white' : 'text-[#4B465C]'}`} />
//                 </div>
//                 <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'import' ? 'text-[#934294]' : 'text-[#282828]'}`}>Import</p>
//               </button>
//               <button onClick={handleModulesClick} className='cursor-pointer mb-2'>
//                 <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'modules' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
//                   <TfiLayoutAccordionSeparated className={`text-xl ${activeSidebar === 'modules' ? 'text-white' : 'text-[#4B465C]'}`} />
//                 </div>
//                 <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'modules' ? 'text-[#934294]' : 'text-[#282828]'}`}>Modules</p>
//               </button>
//               <button onClick={handleGraphicClick} className='cursor-pointer mb-2'>
//                 <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'graphic' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
//                   <img src={'star.png'} alt="Star01" className={`w-[28px] ${activeSidebar === 'graphic' ? 'brightness-0 invert' : ''}`} />
//                 </div>
//                 <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'graphic' ? 'text-[#934294]' : 'text-[#282828]'}`}>Indivio.AI</p>
//               </button>
//               <button onClick={handleCTAClick} className='cursor-pointer mb-2'>
//                 <div className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center shadow-md item_btn ${activeSidebar === 'cta' ? '!bg-gradient-to-b from-[#5087ff] via-[#5087ff] to-[#5087ff]' : 'text-[#4B465C] hover:text-white'}`}>
//                   <RxButton className={`text-xl ${activeSidebar === 'cta' ? 'text-white' : 'text-[#4B465C]'}`} />
//                 </div>
//                 <p className={`text-xs font-medium pt-0.5 ${activeSidebar === 'cta' ? 'text-[#934294]' : 'text-[#282828]'}`}>CTA</p>
//               </button>
//             </div>
//             </div>

//             {/* Modules Sidebar */}
//             {activeSidebar === 'modules' && (
//                 <div className='w-[362px] flex-shrink-0 h-full'>
//                     <Modules />
//                 </div>
//             )}

//             {/* Assets Sidebar */}
//             {activeSidebar === 'assets' && (
//                 <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
//                     <div className='mb-4'>
//                         <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-0'>Assets</h3>
//                         <p className='text-[16px] leading-[26px] text-[#818181] font-medium pb-2'>Search your asset library</p>
//                     </div>
//                     <p className='text-sm text-gray-500'>Assets panel placeholder - integrate your asset search here</p>
//                 </div>
//             )}

//             {/* Elements Sidebar */}
//             {activeSidebar === 'elements' && (
//                 <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
//                     <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-4'>Elements</h3>
//                     <p className='text-sm text-gray-500'>Elements panel placeholder - integrate your elements search here</p>
//                 </div>
//             )}

//             {/* Text Sidebar */}
//             {activeSidebar === 'text' && (
//                 <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
//                     <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-4'>Text</h3>
//                     <p className='text-sm text-gray-500'>Text formatting panel placeholder</p>
//                 </div>
//             )}

//             {/* Import Sidebar */}
//             {activeSidebar === 'import' && (
//                 <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
//                     <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-4'>Import</h3>
//                     <p className='text-sm text-gray-500'>Import panel placeholder</p>
//                 </div>
//             )}

//             {/* Graphic Sidebar */}
//             {activeSidebar === 'graphic' && (
//                 <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
//                     <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-4'>Indivio.AI</h3>
//                     <p className='text-sm text-gray-500'>AI graphics panel placeholder</p>
//                 </div>
//             )}

//             {/* CTA Sidebar */}
//             {activeSidebar === 'cta' && (
//                 <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
//                     <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-4'>CTA</h3>
//                     <p className='text-sm text-gray-500'>CTA panel placeholder</p>
//                 </div>
//             )}

//             {/* Main Canvas Area */}
//             <div className='flex-1 flex flex-col overflow-hidden'>
//                 {/* Toolbar */}
//                 <div className='flex items-center gap-2 border-b border-gray-200 pb-2 mb-2'>
//                     <button
//                         className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
//                         title='Undo'
//                     >
//                         <FaUndo />
//                     </button>
//                     <button
//                         className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
//                         title='Redo'
//                     >
//                         <FaRedo />
//                     </button>
//                     <div className='w-px h-6 bg-gray-300 mx-2'></div>
//                     <button
//                         onClick={exportPNG}
//                         className='px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600'
//                     >
//                         Export
//                     </button>
//                     <button
//                         className='px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50'
//                     >
//                         Settings
//                     </button>
//                     <div className='flex-1'></div>
//                     <div className='text-sm text-gray-600'>
//                         Canvas: 1080x1350
//                     </div>
//                 </div>

//                 {/* Canvas */}
//                 <div
//                     ref={containerRef}
//                     className={`flex-1 flex justify-center items-center bg-gray-100 ${
//                         isDragOver ? 'bg-blue-50 border-2 border-blue-300' : ''
//                     } transition-colors duration-200 overflow-auto relative`}
//                     onDrop={handleCanvasDrop}
//                     onDragOver={handleCanvasDragOver}
//                     onDragLeave={handleCanvasDragLeave}
//                 >
//                     {/* Floating Element Control Panel - Right Side of Selected Element */}
//                     {selectedId && (() => {
//                         const selectedItem = items.find((it) => it.id === selectedId);
//                         if (!selectedItem || !stageRef.current) return null;

//                         const stageRect = stageRef.current.container().getBoundingClientRect();
//                         const containerRect = containerRef.current?.getBoundingClientRect();
//                         if (!containerRect) return null;

//                         const panelX = selectedItem.x + selectedItem.width + 10;
//                         const panelY = selectedItem.y + selectedItem.height / 2;

//                         // Calculate position relative to container
//                         const scale = 1; // Adjust if your canvas is scaled
//                         const left = (stageRect.left - containerRect.left) + (panelX * scale);
//                         const top = (stageRect.top - containerRect.top) + (panelY * scale);

//                         return (
//                             <div
//                                 className='absolute z-50'
//                                 style={{
//                                     left: `${left}px`,
//                                     top: `${top}px`,
//                                     transform: 'translateY(-50%)'
//                                 }}
//                             >
//                                 <div className='bg-white rounded-[8px] shadow-xl p-1 flex flex-col gap-1'>
//                                     {/* Up Arrow - Move Up */}
//                                     <button
//                                         onClick={moveItemUp}
//                                         className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-200'
//                                         title="Move Up"
//                                     >
//                                         <FaArrowUp className='text-gray-700 text-xs' />
//                                     </button>

//                                     {/* AI/Star Button - Static */}
//                                     <button
//                                         className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 bg-gradient-to-br from-purple-400 to-pink-400 border border-purple-300'
//                                         title="AI Features"
//                                         disabled
//                                     >
//                                         <FaStar className='text-white text-xs' />
//                                     </button>

//                                     {/* Copy Button */}
//                                     <button
//                                         onClick={duplicateItem}
//                                         className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-200'
//                                         title="Duplicate"
//                                     >
//                                         <FaCopy className='text-gray-700 text-xs' />
//                                     </button>

//                                     {/* Delete Button */}
//                                     <button
//                                         onClick={deleteSelected}
//                                         className='w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 active:bg-red-100 active:scale-95 transition-all duration-200 border border-red-200'
//                                         title="Delete"
//                                     >
//                                         <FaTrash className='text-red-600 text-xs' />
//                                     </button>

//                                     {/* Down Arrow - Move Down */}
//                                     <button
//                                         onClick={moveItemDown}
//                                         className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-200'
//                                         title="Move Down"
//                                     >
//                                         <FaArrowDown className='text-gray-700 text-xs' />
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })()}

//                     <div className="bg-white shadow-lg">
//                         <Stage
//                             width={stageWidth}
//                             height={stageHeight}
//                             onMouseDown={handleStageMouseDown}
//                             onTouchStart={handleStageMouseDown}
//                             ref={stageRef}
//                         >
//                             <Layer>
//                                 {items.map(renderItem)}
//                                 <Transformer
//                                     ref={trRef}
//                                     anchorSize={8}
//                                     rotateEnabled={true}
//                                     keepRatio={false}
//                                     boundBoxFunc={(oldBox, newBox) => {
//                                         if (newBox.width < 8 || newBox.height < 8) {
//                                             return oldBox;
//                                         }
//                                         return newBox;
//                                     }}
//                                 />
//                             </Layer>
//                         </Stage>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CanvasEditor;


import Konva from "konva";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Transformer, Group } from "react-konva";
import { LuCopy } from "react-icons/lu";
import { SiHackthebox } from "react-icons/si";
import { TbTextResize } from "react-icons/tb";
import { PiUploadSimpleLight } from "react-icons/pi";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { RxButton } from "react-icons/rx";
import { FaUndo, FaRedo, FaArrowUp, FaArrowDown, FaStar, FaCopy, FaTrash, FaLayerGroup, FaEye, FaEyeSlash, FaLock, FaUnlock, FaDownload, FaSave } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { RiDraggable } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import DraggableImage from "./DraggableImage";
import DraggableRect from "./DraggableItem";
import DraggableText from "./DraggableText";
import DraggableButton from "./DraggableButton";
import DraggableGroup from "./DraggableGroup";
import useId from "@/utils/constants";
import { snap } from "@/utils/constants";
import { ImageItem, Item, RectItem, TextItem, ButtonItem, GroupItem } from "@/utils/type";
import Modules from "./Modules";
import { searchImage as apiSearchImage, searchElements as apiSearchElements, generateAiImage as apiGenerateAiImage } from "@/utils/apiService";

// TipTap imports
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface HistoryState {
  items: Item[];
  selectedId: string | null;
}

interface LayerItem {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  type: string;
  zIndex?: number;
}

const ToolbarButton = ({ active, onClick, children, disabled = false }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`border w-[28px] h-[28px] rounded-[3px] cursor-pointer flex items-center justify-center ${
      active ? "border-blue-500 bg-blue-50 text-blue-600" : "border-[#dddddd] text-[#93909d]"
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'}`}
  >
    {children}
  </button>
);

const TipTapPanel = ({ selectedItem, onUpdateText }: {
    selectedItem: Item | null;
    onUpdateText: (text: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: (selectedItem as TextItem)?.text || "",
    onUpdate: ({ editor }) => {
      onUpdateText?.(editor.getText());
    },
    immediatelyRender: false
  });

  useEffect(() => {
    if (!editor) return;
    const textItem = selectedItem as TextItem;
    if (textItem?.text !== undefined) {
      const current = editor.getText();
      if (current !== textItem.text) {
        editor.commands.setContent(textItem.text);
      }
    }
  }, [selectedItem?.id, (selectedItem as TextItem)?.text, editor]);

  if (!selectedItem || selectedItem.type !== "text") return null;

  return (
    <div className='border border-[#CFCFCF] bg-white rounded-lg p-3 form_area2 mb-12 shadow-xl'>
      <div className='pb-3'>
        <p className='text-[#3C3C3C] text-[14px] leading-[16px] font-semibold'>Typography</p>
      </div>
      <div className='flex gap-1 mb-2'>
        <ToolbarButton
          active={editor?.isActive('bold') ?? false}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <span className='font-bold'>B</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive('italic') ?? false}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <span className='italic'>I</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive('strike') ?? false}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <span className='line-through'>S</span>
        </ToolbarButton>
      </div>

      <div className='border rounded p-2 min-h-[120px]'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

function CanvasEditor() {
    const stageWidth = 600;
    const stageHeight = 640;

    const [items, setItems] = useState<Item[]>(() => []);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const trRef = useRef<Konva.Transformer>(null);
    const groupTrRef = useRef<Konva.Transformer>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // History management
    const [history, setHistory] = useState<HistoryState[]>([{ items: [], selectedId: null }]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isHistoryAction, setIsHistoryAction] = useState(false);

    // Sidebar state
    const [activeSidebar, setActiveSidebar] = useState<string | null>(null);

    // Layers state
    const [layersCollapsed, setLayersCollapsed] = useState(false);
    const [draggedLayerId, setDraggedLayerId] = useState<string | null>(null);
    const [dragOverLayerId, setDragOverLayerId] = useState<string | null>(null);

    // Assets state
    const [assetsSearchTerm, setAssetsSearchTerm] = useState("cap");
    const [assetsData, setAssetsData] = useState<any[]>([]);
    const [assetsLoading, setAssetsLoading] = useState(false);
    const [assetsError, setAssetsError] = useState<string | null>(null);
    const [assetsResultLimit, setAssetsResultLimit] = useState(30);

    // Elements state
    const [elementsSearchTerm, setElementsSearchTerm] = useState("shoe");
    const [elementsData, setElementsData] = useState<any[]>([]);
    const [elementsLoading, setElementsLoading] = useState(false);
    const [elementsError, setElementsError] = useState<string | null>(null);
    const [selectedIconType, setSelectedIconType] = useState('all');

    // Text state
    // const [textContent, setTextContent] = useState("");

    // Import state
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // AI Generation state
    const [aiPrompt, setAiPrompt] = useState("");
    const [aiGenerating, setAiGenerating] = useState(false);
    const [aiImages, setAiImages] = useState<any[]>([]);

    // CTA state
    const [ctaButtons] = useState([
        { id: 'cta1', text: 'Shop Now', style: 'primary' },
        { id: 'cta2', text: 'Learn More', style: 'secondary' },
        { id: 'cta3', text: 'Sign Up', style: 'outline' },
        { id: 'cta4', text: 'Get Started', style: 'gradient' }
    ]);

    const [dragPreview, setDragPreview] = useState<string | null>(null);

    const groupDragStartRef = useRef<{ [groupId: string]: { x: number; y: number } }>({});

    // History management functions
    const saveToHistory = useCallback((newItems: Item[], newSelectedId: string | null) => {
        if (isHistoryAction) return;

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push({ items: JSON.parse(JSON.stringify(newItems)), selectedId: newSelectedId });

        if (newHistory.length > 50) {
            newHistory.shift();
        } else {
            setHistoryIndex(newHistory.length - 1);
        }

        setHistory(newHistory);
    }, [history, historyIndex, isHistoryAction]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            setIsHistoryAction(true);
            const prevState = history[historyIndex - 1];
            setItems(prevState.items);
            setSelectedId(prevState.selectedId);
            setHistoryIndex(historyIndex - 1);
            setTimeout(() => setIsHistoryAction(false), 0);
        }
    }, [history, historyIndex]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            setIsHistoryAction(true);
            const nextState = history[historyIndex + 1];
            setItems(nextState.items);
            setSelectedId(nextState.selectedId);
            setHistoryIndex(historyIndex + 1);
            setTimeout(() => setIsHistoryAction(false), 0);
        }
    }, [history, historyIndex]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            redo();
                        } else {
                            undo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        redo();
                        break;
                }
            } else if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteSelected();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

    // Sidebar handlers
    const handleAssetsClick = () => {
        const newState = activeSidebar === 'assets' ? null : 'assets';
        setActiveSidebar(newState);
        if (newState === 'assets' && assetsData.length === 0) {
            searchAssets();
        }
    };

    const handleElementsClick = () => {
        const newState = activeSidebar === 'elements' ? null : 'elements';
        setActiveSidebar(newState);
        if (newState === 'elements' && elementsData.length === 0) {
            searchElements();
        }
    };

    const handleTextClick = () => setActiveSidebar(activeSidebar === 'text' ? null : 'text');
    const handleImportClick = () => setActiveSidebar(activeSidebar === 'import' ? null : 'import');
    const handleModulesClick = () => setActiveSidebar(activeSidebar === 'modules' ? null : 'modules');
    const handleGraphicClick = () => setActiveSidebar(activeSidebar === 'graphic' ? null : 'graphic');
    const handleCTAClick = () => setActiveSidebar(activeSidebar === 'cta' ? null : 'cta');

    // API Functions
    const searchAssets = async () => {
        setAssetsLoading(true);
        setAssetsError(null);
        const result = await apiSearchImage({ query: assetsSearchTerm, k: 50 });
        if (result.success) {
            setAssetsData(result.data || []);
        } else {
            setAssetsError(result.error || 'Failed to load assets');
        }
        setAssetsLoading(false);
    };

    const searchElements = async () => {
        setElementsLoading(true);
        setElementsError(null);
        const result = await apiSearchElements({ search_phrase: elementsSearchTerm });
        if (result.success) {
            setElementsData(result.data || []);
        } else {
            setElementsError(result.error || 'Failed to load elements');
        }
        setElementsLoading(false);
    };

    const generateAiImage = async () => {
        if (!aiPrompt.trim()) return;

        setAiGenerating(true);
        const result = await apiGenerateAiImage({ prompt: aiPrompt });
        if (result.success) {
            setAiImages(result.data || []);
        }
        setAiGenerating(false);
    };

    const handleAssetsSearch = useCallback(() => {
        searchAssets();
    }, [assetsSearchTerm]);

    const handleAssetsSearchSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        searchAssets();
    }, [assetsSearchTerm]);

    const handleElementsSearch = useCallback(() => {
        searchElements();
    }, [elementsSearchTerm]);

    const handleElementsSearchSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        searchElements();
    }, [elementsSearchTerm]);

    const handleAssetsLoadMore = useCallback(() => {
        if (!assetsLoading && assetsResultLimit < assetsData.length) {
            setAssetsResultLimit((prev) => prev + 30);
        }
    }, [assetsLoading, assetsResultLimit, assetsData.length]);

    // File upload handler
    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    const newItem: ImageItem = {
                        id: useId("i_"),
                        type: 'image',
                        x: 50 + (index * 20),
                        y: 50 + (index * 20),
                        width: 200,
                        height: 200,
                        rotation: 0,
                        src: result,
                    };
                    setItems((s) => [...s, newItem]);
                    if (index === 0) setSelectedId(newItem.id);
                }
                setUploadProgress(((index + 1) / files.length) * 100);
            };
            reader.readAsDataURL(file);
        });

        setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
        }, 1000);
    }, []);

    // Computed values
    const displayedAssetsResults = useMemo(() => {
        return assetsData.slice(0, assetsResultLimit);
    }, [assetsData, assetsResultLimit]);

    const hasMoreAssets = useMemo(() => {
        return assetsResultLimit < assetsData.length;
    }, [assetsResultLimit, assetsData.length]);

    const groupedElements = useMemo(() => {
        const grouped: Record<string, any[]> = {};
        elementsData.forEach((item) => {
            const type = item.icon_type || 'other';
            if (!grouped[type]) {
                grouped[type] = [];
            }
            grouped[type].push(item);
        });
        return grouped;
    }, [elementsData]);

    const iconTypeOptions = useMemo(() => {
        return Object.keys(groupedElements);
    }, [groupedElements]);

    const typesToRender = useMemo(() => {
        if (selectedIconType === 'all') {
            return iconTypeOptions;
        }
        return iconTypeOptions.filter(type => type === selectedIconType);
    }, [iconTypeOptions, selectedIconType]);

    const hasElementResults = useMemo(() => {
        return typesToRender.some(type => groupedElements[type]?.length > 0);
    }, [groupedElements, typesToRender]);

    // Layers data
    const layers: LayerItem[] = useMemo(() => {
        return items
            .sort((a, b) => (b.zIndex || 1) - (a.zIndex || 1)) // Sort by z-index (top to bottom)
            .map(item => ({
                id: item.id,
                name: item.type === 'text' ? 'Text Layer' :
                      item.type === 'image' ? 'Image' :
                      item.type === 'rect' ? 'Rectangle' :
                      item.type === 'button' ? 'Button' :
                      'Element',
                visible: item.visible ?? true,
                locked: item.locked ?? false,
                type: item.type,
                zIndex: item.zIndex || 1
            }));
    }, [items]);

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
        cateRecBlock: () => import('../../templates/CateRecomBlock.json'),
        moodBlock: () => import('../../templates/MoodBlock.json'),
        heroBlock: () => import('../../templates/HeroBlock.json')
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

            const canvasWidth = stageWidth;
            const templateWidth = template.canvas?.width || 800;
            const scale = canvasWidth / templateWidth;

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

            if (transformedItems.length > 0) {
                // Assign groupId to all items in the template (like reference implementation)
                const groupId = `group-${Date.now()}`;
                const itemsWithGroups = transformedItems.map(item => ({
                    ...item,
                    groupId: groupId
                }));

                const minX = Math.min(...itemsWithGroups.map(item => item.x));
                const maxX = Math.max(...itemsWithGroups.map(item => item.x + item.width));
                const minY = Math.min(...itemsWithGroups.map(item => item.y));
                const maxY = Math.max(...itemsWithGroups.map(item => item.y + item.height));

                const templateWidth = maxX - minX;
                const templateHeight = maxY - minY;

                const offsetX = x - templateWidth / 2 - minX;
                const offsetY = y - templateHeight / 2 - minY;

                const finalItems = itemsWithGroups.map((item, index) => ({
                    ...item,
                    id: useId(item.type.charAt(0) + "_"),
                    x: item.x + offsetX,
                    y: item.y + offsetY,
                    zIndex: (items.length > 0 ? Math.max(...items.map(it => it.zIndex || 1)) : 0) + index + 1,
                    resizable: true,
                }));

                setItems((s) => {
                    const newItems = [...s, ...finalItems];
                    saveToHistory(newItems, finalItems[0]?.id || null);
                    return newItems;
                });
            }
        } catch (error) {
            console.error(`Failed to load template ${templateKey}:`, error);
        }
    };

    // Update item
    const updateItem = useCallback((next: Item) => {
        setItems((s) => {
            const updated = s.map((it) => (it.id === next.id ? next : it));
            saveToHistory(updated, selectedId);
            return updated;
        });
    }, []);

    // Delete selected
    const deleteSelected = useCallback(() => {
        if (!selectedId) return;

        setItems((s) => {
            const filtered = s.filter((it) => it.id !== selectedId);
            saveToHistory(filtered, null);
            return filtered;
        });

        setSelectedId(null);
        trRef.current?.nodes([]);
    }, [selectedId]);

    // Move item up (nudge)
    const moveItemUp = useCallback(() => {
        if (!selectedId) return;
        setItems((s) => {
            const updated = s.map((it) => (it.id === selectedId ? { ...it, y: it.y - 10 } : it));
            saveToHistory(updated, selectedId);
            return updated;
        });
    }, [selectedId]);

    // Move item down (nudge)
    const moveItemDown = useCallback(() => {
        if (!selectedId) return;
        setItems((s) => {
            const updated = s.map((it) => (it.id === selectedId ? { ...it, y: it.y + 10 } : it));
            saveToHistory(updated, selectedId);
            return updated;
        });
    }, [selectedId]);

    // Duplicate selected item
    const duplicateItem = useCallback(() => {
        if (!selectedId) return;

        const original = items.find(it => it.id === selectedId);
        if (!original) return;

        const cloneItem = (orig: Item): Item => {
            const base = {
                ...orig,
                id: useId(orig.type.charAt(0) + "_"),
                x: orig.x + 20,
                y: orig.y + 20,
            };

            if (orig.type === "group") {
                return {
                    ...base,
                    children: (orig as GroupItem).children.map(cloneItem),
                } as GroupItem;
            }

            return base;
        };

        const duplicate = cloneItem(original);
        setItems((s) => {
            const newItems = [...s, duplicate];
            saveToHistory(newItems, duplicate.id);
            return newItems;
        });

        setSelectedId(duplicate.id);
    }, [selectedId, items]);

    // Export PNG
    const exportPNG = useCallback(() => {
        const uri = stageRef.current?.toDataURL({ pixelRatio: 2 });
        if (!uri) return;
        const a = document.createElement("a");
        a.href = uri;
        a.download = "canvas.png";
        a.click();
    }, []);

    // Layer drag and drop handlers
    const handleLayerDragStart = useCallback((e: React.DragEvent, layerId: string) => {
        e.stopPropagation();
        setDraggedLayerId(layerId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', layerId);
    }, []);

    const handleLayerDragOver = useCallback((e: React.DragEvent, layerId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedLayerId && draggedLayerId !== layerId) {
            setDragOverLayerId(layerId);
        }
    }, [draggedLayerId]);

    const handleLayerDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOverLayerId(null);
    }, []);

    const handleLayerDrop = useCallback((e: React.DragEvent, targetLayerId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!draggedLayerId || draggedLayerId === targetLayerId) {
            setDraggedLayerId(null);
            setDragOverLayerId(null);
            return;
        }

        setItems((prev) => {
            const items = [...prev];
            const draggedIndex = items.findIndex(item => item.id === draggedLayerId);
            const targetIndex = items.findIndex(item => item.id === targetLayerId);

            if (draggedIndex === -1 || targetIndex === -1) {
                return prev;
            }

            // Remove dragged item
            const [draggedItem] = items.splice(draggedIndex, 1);

            // Insert at target position
            items.splice(targetIndex, 0, draggedItem);

            // Recalculate zIndex to maintain order (higher zIndex = on top)
            const updated = items.map((item, index) => ({
                ...item,
                zIndex: items.length - index
            }));

            saveToHistory(updated, selectedId);
            return updated;
        });

        setDraggedLayerId(null);
        setDragOverLayerId(null);
    }, [draggedLayerId, selectedId, saveToHistory]);

    const handleLayerDragEnd = useCallback(() => {
        setDraggedLayerId(null);
        setDragOverLayerId(null);
    }, []);

    // Layer visibility toggle
    const toggleLayerVisibility = useCallback((layerId: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === layerId
                    ? { ...item, visible: !(item.visible ?? true) }
                    : item
            )
        );
    }, []);

    // Layer lock toggle
    const toggleLayerLock = useCallback((layerId: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === layerId
                    ? { ...item, locked: !(item.locked ?? false) }
                    : item
            )
        );
    }, []);

    // Handle canvas drop
    const handleCanvasDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        setDragPreview(null);

        const elementData = e.dataTransfer.getData("element");
        if (elementData) {
            try {
                const element = JSON.parse(elementData);
                const stageRect = stageRef.current?.container().getBoundingClientRect();

                if (stageRect) {
                    const x = e.clientX - stageRect.left;
                    const y = e.clientY - stageRect.top;

                    if (element.type === 'image') {
                        const currentMaxZ = items.length > 0 ? Math.max(...items.map(it => it.zIndex || 1)) : 0;
                        const newItem: ImageItem = {
                            id: useId("i_"),
                            type: 'image',
                            x,
                            y,
                            width: element.width || 100,
                            height: element.height || 100,
                            rotation: 0,
                            src: element.src || element.fullSrc,
                            zIndex: currentMaxZ + 1,
                            resizable: true,
                        };
                        setItems((s) => {
                            const newItems = [...s, newItem];
                            saveToHistory(newItems, newItem.id);
                            return newItems;
                        });
                        // Don't select newly dropped items
                    } else if (element.type === 'text') {
                        const currentMaxZ = items.length > 0 ? Math.max(...items.map(it => it.zIndex || 1)) : 0;
                        const newItem: TextItem = {
                            id: useId("t_"),
                            type: 'text',
                            x,
                            y,
                            width: 200,
                            height: 50,
                            rotation: 0,
                            text: element.text || 'New Text',
                            fontSize: 24,
                            fontFamily: 'Arial',
                            fill: '#000000',
                            align: 'left',
                            zIndex: currentMaxZ + 1,
                            resizable: true,
                        };
                        setItems((s) => {
                            const newItems = [...s, newItem];
                            saveToHistory(newItems, newItem.id);
                            return newItems;
                        });
                        // Don't select newly dropped items
                    } else if (element.type === 'button') {
                        const currentMaxZ = items.length > 0 ? Math.max(...items.map(it => it.zIndex || 1)) : 0;
                        const newItem: ButtonItem = {
                            id: useId("b_"),
                            type: 'button',
                            x,
                            y,
                            width: 120,
                            height: 40,
                            rotation: 0,
                            text: element.text || 'Button',
                            fill: '#934294',
                            textColor: '#ffffff',
                            borderRadius: 8,
                            zIndex: currentMaxZ + 1,
                            resizable: true,
                        };
                        setItems((s) => {
                            const newItems = [...s, newItem];
                            saveToHistory(newItems, newItem.id);
                            return newItems;
                        });
                        // Don't select newly dropped items
                    }
                }
            } catch (error) {
                console.error("Failed to parse element data:", error);
            }
            return;
        }

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
    }, [saveToHistory]);

    const handleCanvasDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
        e.dataTransfer.dropEffect = "copy";
    }, []);

    const handleCanvasDragLeave = useCallback((e: React.DragEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            setIsDragOver(false);
        }
    }, []);

    // Clear selection on stage click
    const handleStageMouseDown = useCallback((e: any) => {
        if (e.target === e.target.getStage()) {
            setSelectedId(null);
            setSelectedGroupId(null);
            trRef.current?.nodes([]);
            groupTrRef.current?.nodes([]);
        }
    }, []);

    // Attach transformer to selected nodes
    useEffect(() => {
        if (!trRef.current || !groupTrRef.current) return;

        const stage = trRef.current.getStage();
        if (!stage) return;

        // Clear both transformers first
        trRef.current.nodes([]);
        groupTrRef.current.nodes([]);

        if (selectedGroupId) {
            // Select group for transformation
            const groupNode = stage.findOne(`#${selectedGroupId}`);
            if (groupNode && groupTrRef.current) {
                groupTrRef.current.nodes([groupNode]);
            }
        } else {
            // Select individual items or multi-selection
            const selectedNodes: any[] = [];

            // Single selection
            if (selectedId) {
                const node = stage.findOne(`#${selectedId}`);
                const selectedItem = items.find(it => it.id === selectedId);
                if (node && !(selectedItem?.locked)) {
                    selectedNodes.push(node);
                }
            }

            trRef.current.nodes(selectedNodes);
        }

        trRef.current.getLayer()?.batchDraw();
        groupTrRef.current.getLayer()?.batchDraw();
    }, [selectedId, selectedGroupId, items]);


    // Render item based on type
    const renderItem = (item: Item) => {
        // Check if item is individually selected OR part of a selected group
        let isSelected = selectedId === item.id;

        // Don't show individual selection if the item's group is selected
        if (selectedGroupId && item.groupId === selectedGroupId) {
            isSelected = false;
        }

        const isLocked = (item.locked ?? false) || !!item.groupId;
        const itemProps = {
            key: item.id,
            item,
            isSelected,
            onSelect: () => {
                // Clear previous selections
                setSelectedGroupId(null);
                setSelectedId(null);

                if (item.groupId) {
                    // Select the group
                    setSelectedGroupId(item.groupId);
                } else if (!isLocked) {
                    // Select individual
                    setSelectedId(item.id);
                }
            },
            isLocked,
            listening: !isLocked,
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

    const selectedItem = selectedId ? items.find(item => item.id === selectedId) : null;

    return (
        <div className="flex gap-4 relative bg-[#F5F5FF] rounded-2xl shadow-xl mt-0 p-4 w-full h-screen overflow-hidden">
            {/* Left Sidebar - Icon Navigation */}
            <div className='w-[68px] bg-[#F9F9FF] h-full flex-shrink-0'>
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
                            <img src={'star.png'} alt="Star01" className={`w-[28px] ${activeSidebar === 'graphic' ? 'brightness-0 invert' : ''}`} />
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

            {/* Dynamic Sidebar Content */}
            {activeSidebar === 'modules' && (
                <div className='w-[362px] flex-shrink-0 h-full'>
                    <Modules />
                </div>
            )}

            {/* Assets Sidebar */}
            {activeSidebar === 'assets' && (
                <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
                    <div className='mb-4'>
                        <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-0'>Assets</h3>
                        <p className='text-[16px] leading-[26px] text-[#818181] font-medium pb-2'>Search your asset library</p>
                    </div>

                    <form onSubmit={handleAssetsSearchSubmit} className='flex items-center gap-2 mb-4'>
                        <button
                            type='button'
                            onClick={handleAssetsSearch}
                            className='flex h-10 w-10 items-center justify-center rounded-md text-[#4B465C] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#934294]'
                            aria-label='Search assets'
                        >
                            <CiSearch className='text-2xl' />
                        </button>
                        <input
                            type="search"
                            placeholder='Search assets'
                            value={assetsSearchTerm}
                            onChange={(e) => setAssetsSearchTerm(e.target.value)}
                            className='flex-1 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#934294]'
                        />
                    </form>

                    <div className='mt-6'>
                        {assetsLoading ? (
                            <p className='text-sm text-[#696969]'>Loading assets...</p>
                        ) : assetsError ? (
                            <p className='text-sm text-red-500'>{assetsError}</p>
                        ) : displayedAssetsResults.length === 0 ? (
                            <p className='text-sm text-[#696969]'>No assets found for this search.</p>
                        ) : (
                            <>
                                <div className='grid grid-cols-2 gap-3'>
                                    {displayedAssetsResults.map((item, index) => (
                                        <div
                                            key={`${item.image_url}-${index}`}
                                            draggable
                                            onDragStart={(e) => {
                                                e.dataTransfer.setData("element", JSON.stringify({
                                                    type: 'image',
                                                    src: item.image_url,
                                                    fullSrc: item.image_url,
                                                    title: item.description || item.folder || 'Asset',
                                                    folder: item.folder,
                                                }));
                                                setDragPreview(item.description || item.folder || 'Asset');
                                            }}
                                            onDragEnd={() => setDragPreview(null)}
                                            className='border border-[#ADAFB0] rounded-[10px] p-2 bg-white cursor-grab hover:bg-gray-100 active:bg-blue-100 transition flex flex-col gap-2'
                                        >
                                            <img
                                                src={item.image_url}
                                                alt={item.description || item.folder || 'asset'}
                                                className='h-24 w-full object-cover rounded-[8px] pointer-events-none'
                                                draggable={false}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className='mt-3 flex justify-between items-center'>
                                    <p className='text-xs text-[#A1A1A1]'>
                                        Showing {displayedAssetsResults.length} of {assetsData.length} assets
                                    </p>
                                    <button
                                        type='button'
                                        onClick={handleAssetsLoadMore}
                                        disabled={!hasMoreAssets || assetsLoading}
                                        className={`px-4 py-1.5 text-sm rounded-full border transition ${!hasMoreAssets || assetsLoading
                                            ? 'border-[#CECECE] text-[#CECECE] cursor-not-allowed'
                                            : 'border-[#934294] text-[#934294] hover:bg-[#934294] hover:text-white'}`}
                                    >
                                        Load more
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Elements Sidebar */}
            {activeSidebar === 'elements' && (
                <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
                    <form onSubmit={handleElementsSearchSubmit} className='flex items-center gap-2 mb-4'>
                        <button
                            type='button'
                            onClick={handleElementsSearch}
                            className='flex h-10 w-10 items-center justify-center rounded-md text-[#4B465C] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#934294]'
                            aria-label='Search elements'
                        >
                            <CiSearch className='text-2xl' />
                        </button>
                        <input
                            type="search"
                            placeholder='Search elements'
                            value={elementsSearchTerm}
                            onChange={(e) => setElementsSearchTerm(e.target.value)}
                            className='flex-1 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#934294]'
                        />
                    </form>

                    {iconTypeOptions.length > 0 && (
                        <div className='mt-4 flex flex-wrap gap-2'>
                            <button
                                type='button'
                                onClick={() => setSelectedIconType('all')}
                                className={`px-3 py-1 text-sm rounded-full border ${selectedIconType === 'all' ? 'border-transparent bg-gradient-to-b from-[#934294] via-[#B3468D] to-[#D04988] text-white' : 'border-[#CECECE] text-[#4B465C] hover:border-[#934294]'}`}
                            >
                                All
                            </button>
                            {iconTypeOptions.map((type) => (
                                <button
                                    key={type}
                                    type='button'
                                    onClick={() => setSelectedIconType(type)}
                                    className={`px-3 py-1 text-sm rounded-full border capitalize ${selectedIconType === type ? 'border-transparent bg-gradient-to-b from-[#934294] via-[#B3468D] to-[#D04988] text-white' : 'border-[#CECECE] text-[#4B465C] hover:border-[#934294]'}`}
                                >
                                    {type.replace(/_/g, ' ')}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className='mt-6'>
                        {elementsLoading ? (
                            <p className='text-sm text-[#696969]'>Loading elements...</p>
                        ) : elementsError ? (
                            <p className='text-sm text-red-500'>{elementsError}</p>
                        ) : !hasElementResults ? (
                            <p className='text-sm text-[#696969]'>No elements found for this search.</p>
                        ) : (
                            <div className='space-y-6'>
                                {typesToRender.map((type) => {
                                    const items = groupedElements[type] ?? [];
                                    if (!items.length) return null;
                                    return (
                                        <div key={type}>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-[16px] leading-[26px] text-[#696969] font-medium capitalize'>{type.replace(/_/g, ' ')}</p>
                                                <span className='text-xs text-[#A1A1A1]'>{items.length} items</span>
                                            </div>
                                            <div className='mt-3 grid grid-cols-4 gap-2'>
                                                {items.map((item, index) => (
                                                    <div
                                                        key={`${type}-${item.slug || item.url}-${index}`}
                                                        draggable
                                                        onDragStart={(e) => {
                                                            e.dataTransfer.setData("element", JSON.stringify({
                                                                type: 'image',
                                                                src: item.url,
                                                                title: item.slug || item.icon_type || 'Element',
                                                                width: item.width,
                                                                height: item.height,
                                                                iconType: item.icon_type,
                                                            }));
                                                            setDragPreview(item.slug || item.icon_type || 'Element');
                                                        }}
                                                        onDragEnd={() => setDragPreview(null)}
                                                        className='border border-[#ADAFB0] rounded-[10px] p-2 flex items-center justify-center bg-white cursor-grab hover:bg-gray-100 active:bg-blue-100'
                                                    >
                                                        <img
                                                            src={item.url}
                                                            alt={item.slug || item.icon_type || 'element'}
                                                            className='h-20 w-full object-contain pointer-events-none'
                                                            draggable={false}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Text Sidebar */}
            {activeSidebar === 'text' && (
                <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
                    <div className='mb-4'>
                        <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-0'>Text</h3>
                        <p className='text-[16px] leading-[26px] text-[#818181] font-medium pb-2'>Add and edit text elements</p>
                    </div>

                    <button
                        onClick={() => {
                            const currentMaxZ = items.length > 0 ? Math.max(...items.map(it => it.zIndex || 1)) : 0;
                            const newItem: TextItem = {
                                id: useId("t_"),
                                type: 'text',
                                x: 100,
                                y: 100,
                                width: 200,
                                height: 50,
                                rotation: 0,
                                zIndex: currentMaxZ + 1,
                                text: 'New Text',
                                fontSize: 24,
                                fontFamily: 'Arial',
                                fill: '#000000',
                                align: 'left',
                            };
                            setItems((s) => {
                                const newItems = [...s, newItem];
                                saveToHistory(newItems, newItem.id);
                                return newItems;
                            });
                            setSelectedId(newItem.id);
                        }}
                        className='w-full mb-4 px-4 py-2 bg-gradient-to-b from-[#934294] via-[#B3468D] to-[#D04988] text-white rounded-lg hover:opacity-90 transition'
                    >
                        Add Text Element
                    </button>

                    <TipTapPanel
                        selectedItem={selectedItem || null}
                        onUpdateText={(text) => {
                            if (selectedItem && selectedItem.type === 'text') {
                                updateItem({
                                    ...selectedItem,
                                    text
                                });
                            }
                        }}
                    />
                </div>
            )}

            {/* Import Sidebar */}
            {activeSidebar === 'import' && (
                <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
                    <div className='mb-4'>
                        <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-0'>Import</h3>
                        <p className='text-[16px] leading-[26px] text-[#818181] font-medium pb-2'>Upload images to your canvas</p>
                    </div>

                    <div className='space-y-4'>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className='border-2 border-dashed border-[#CECECE] rounded-lg p-8 text-center cursor-pointer hover:border-[#934294] transition'
                        >
                            <PiUploadSimpleLight className='text-4xl text-[#CECECE] mx-auto mb-2' />
                            <p className='text-[#818181]'>Click to upload images</p>
                            <p className='text-sm text-[#A1A1A1]'>PNG, JPG, GIF up to 10MB</p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className='hidden'
                        />

                        {isUploading && (
                            <div className='w-full bg-gray-200 rounded-full h-2'>
                                <div
                                    className='bg-gradient-to-r from-[#934294] to-[#D04988] h-2 rounded-full transition-all duration-300'
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Graphic/AI Sidebar */}
            {activeSidebar === 'graphic' && (
                <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
                    <div className='mb-4'>
                        <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-0'>Indivio.AI</h3>
                        <p className='text-[16px] leading-[26px] text-[#818181] font-medium pb-2'>Generate images with AI</p>
                    </div>

                    <div className='space-y-4'>
                        <textarea
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Describe the image you want to generate..."
                            className='w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#934294]'
                        />

                        <button
                            onClick={generateAiImage}
                            disabled={!aiPrompt.trim() || aiGenerating}
                            className='w-full px-4 py-2 bg-gradient-to-b from-[#934294] via-[#B3468D] to-[#D04988] text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition'
                        >
                            {aiGenerating ? 'Generating...' : 'Generate Image'}
                        </button>

                        {aiImages.length > 0 && (
                            <div className='grid grid-cols-2 gap-3'>
                                {aiImages.map((image, index) => (
                                    <div
                                        key={index}
                                        draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("element", JSON.stringify({
                                                type: 'image',
                                                src: image.url,
                                                title: 'AI Generated Image',
                                            }));
                                            setDragPreview('AI Generated Image');
                                        }}
                                        onDragEnd={() => setDragPreview(null)}
                                        className='border border-[#ADAFB0] rounded-[10px] p-2 bg-white cursor-grab hover:bg-gray-100'
                                    >
                                        <img
                                            src={image.url}
                                            alt="AI Generated"
                                            className='h-24 w-full object-cover rounded-[8px] pointer-events-none'
                                            draggable={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CTA Sidebar */}
            {activeSidebar === 'cta' && (
                <div className='w-[362px] flex-shrink-0 h-full border border-[#CFCFCF] bg-white rounded-lg p-4 overflow-y-auto'>
                    <div className='mb-4'>
                        <h3 className='text-[22px] leading-[32px] text-[#414141] font-medium pb-0'>CTA Buttons</h3>
                        <p className='text-[16px] leading-[26px] text-[#818181] font-medium pb-2'>Add call-to-action buttons</p>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        {ctaButtons.map((cta) => (
                            <div
                                key={cta.id}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("element", JSON.stringify({
                                        type: 'button',
                                        text: cta.text,
                                        style: cta.style,
                                    }));
                                    setDragPreview(cta.text);
                                }}
                                onDragEnd={() => setDragPreview(null)}
                                className='border border-[#ADAFB0] rounded-[10px] p-3 bg-white cursor-grab hover:bg-gray-100 text-center'
                            >
                                <div className={`px-3 py-2 rounded text-sm font-medium ${
                                    cta.style === 'primary' ? 'bg-gradient-to-b from-[#934294] via-[#B3468D] to-[#D04988] text-white' :
                                    cta.style === 'secondary' ? 'bg-gray-100 text-gray-800' :
                                    cta.style === 'outline' ? 'border border-[#934294] text-[#934294]' :
                                    'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                                }`}>
                                    {cta.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Canvas Area */}
            <div className='flex-1 flex flex-col overflow-hidden'>
                {/* Toolbar
                <div className='flex items-center gap-2 border-b border-gray-200 pb-2 mb-2'>
                    <button
                        onClick={undo}
                        disabled={historyIndex <= 0}
                        className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
                        title='Undo (Ctrl+Z)'
                    >
                        <FaUndo />
                    </button>
                    <button
                        onClick={redo}
                        disabled={historyIndex >= history.length - 1}
                        className='p-2 rounded hover:bg-gray-100 disabled:opacity-50'
                        title='Redo (Ctrl+Y)'
                    >
                        <FaRedo />
                    </button>
                    <div className='w-px h-6 bg-gray-300 mx-2'></div>
                    <button
                        onClick={exportPNG}
                        className='px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600'
                        title='Export PNG'
                    >
                        <FaDownload className='inline mr-1' /> Export
                    </button>
                    <button
                        className='px-3 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50'
                        title='Save'
                    >
                        <FaSave className='inline mr-1' /> Save
                    </button>
                    <div className='flex-1'></div>
                    <div className='text-sm text-gray-600'>
                        Canvas: {stageWidth}x{stageHeight}
                    </div>
                    {dragPreview && (
                        <div className='text-sm text-purple-600'>
                            • Dragging {dragPreview}
                        </div>
                    )}
                </div> */}

                {/* Canvas */}
                <div
                    ref={containerRef}
                    className={`flex-1 flex justify-center items-center bg-gray-100 ${
                        isDragOver ? 'bg-blue-50 border-2 border-blue-300' : ''
                    } transition-colors duration-200 overflow-auto relative`}
                    onDrop={handleCanvasDrop}
                    onDragOver={handleCanvasDragOver}
                    onDragLeave={handleCanvasDragLeave}
                >
                    {/* Floating Element Control Panel */}
                    {selectedId && (() => {
                        const selectedItem = items.find((it) => it.id === selectedId);
                        if (!selectedItem || !stageRef.current) return null;

                        const stageRect = stageRef.current.container().getBoundingClientRect();
                        const containerRect = containerRef.current?.getBoundingClientRect();
                        if (!containerRect) return null;

                        const panelX = selectedItem.x + selectedItem.width + 10;
                        const panelY = selectedItem.y + selectedItem.height / 2;

                        const scale = 1;
                        const left = (stageRect.left - containerRect.left) + (panelX * scale);
                        const top = (stageRect.top - containerRect.top) + (panelY * scale);

                        return (
                            <div
                                className='absolute z-50'
                                style={{
                                    left: `${left}px`,
                                    top: `${top}px`,
                                    transform: 'translateY(-50%)'
                                }}
                            >
                                <div className='bg-white rounded-[8px] shadow-xl p-1 flex flex-col gap-1'>
                                    <button
                                        onClick={moveItemUp}
                                        className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-200'
                                        title="Move Up"
                                    >
                                        <FaArrowUp className='text-gray-700 text-xs' />
                                    </button>

                                    <button
                                        className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 bg-gradient-to-br from-purple-400 to-pink-400 border border-purple-300'
                                        title="AI Features"
                                        disabled
                                    >
                                        <FaStar className='text-white text-xs' />
                                    </button>

                                    <button
                                        onClick={duplicateItem}
                                        className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-200'
                                        title="Duplicate"
                                    >
                                        <FaCopy className='text-gray-700 text-xs' />
                                    </button>

                                    <button
                                        onClick={deleteSelected}
                                        className='w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 active:bg-red-100 active:scale-95 transition-all duration-200 border border-red-200'
                                        title="Delete"
                                    >
                                        <FaTrash className='text-red-600 text-xs' />
                                    </button>

                                    <button
                                        onClick={moveItemDown}
                                        className='w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-200'
                                        title="Move Down"
                                    >
                                        <FaArrowDown className='text-gray-700 text-xs' />
                                    </button>
                                </div>
                            </div>
                        );
                    })()}

                    <div className="bg-white shadow-lg relative">
                        <Stage
                            width={stageWidth}
                            height={stageHeight}
                            onMouseDown={handleStageMouseDown}
                            ref={stageRef}
                        >
                            <Layer>
                                {(() => {
                                    // Group items by groupId
                                    const groupedItems: { [key: string]: Item[] } = {};
                                    const ungroupedItems: Item[] = [];

                                    items
                                        .filter(item => item.visible ?? true)
                                        .sort((a, b) => (a.zIndex || 1) - (b.zIndex || 1))
                                        .forEach(item => {
                                            if (item.groupId) {
                                                if (!groupedItems[item.groupId]) {
                                                    groupedItems[item.groupId] = [];
                                                }
                                                groupedItems[item.groupId].push(item);
                                            } else {
                                                ungroupedItems.push(item);
                                            }
                                        });

                                    // Render ungrouped items
                                    const renderedUngrouped = ungroupedItems.map(item => renderItem(item));

                                    // Render grouped items
                                    const renderedGroups = Object.entries(groupedItems).map(([groupId, groupItems]) => {
                                        // Groups are now always positioned at (0,0), children contain absolute positions

                                        return (
                                            <Group
                                                key={groupId}
                                                id={groupId}
                                                name={groupId}
                                                x={0}
                                                y={0}
                                                draggable={true}
                                                onDragStart={(e) => {
                                                    const node = e.target;
                                                    groupDragStartRef.current[groupId] = { x: node.x(), y: node.y() };
                                                }}
                                                onDragEnd={(e) => {
                                                    const node = e.target;
                                                    const startPos = groupDragStartRef.current[groupId];
                                                    if (startPos && selectedGroupId === groupId) {
                                                        const deltaX = node.x() - startPos.x;
                                                        const deltaY = node.y() - startPos.y;

                                                        // Update all children positions by the drag delta
                                                        groupItems.forEach((child) => {
                                                            updateItem({
                                                                ...child,
                                                                x: child.x + deltaX,
                                                                y: child.y + deltaY,
                                                            });
                                                        });
                                                    }

                                                    // Reset group position to (0,0)
                                                    node.position({ x: 0, y: 0 });
                                                }}
                                            >
                                                {groupItems.map(item => {
                                                    // Position items at their absolute positions (Group is at 0,0)
                                                    return renderItem(item);
                                                })}
                                            </Group>
                                        );
                                    });

                                    return [...renderedUngrouped, ...renderedGroups];
                                })()}
                                <Transformer
                                    ref={trRef}
                                    anchorSize={8}
                                    rotateEnabled={false}
                                    resizeEnabled={false}
                                    enabledAnchors={[]}
                                    keepRatio={false}
                                    boundBoxFunc={(oldBox, newBox) => {
                                        if (newBox.width < 8 || newBox.height < 8) {
                                            return oldBox;
                                        }
                                        return newBox;
                                    }}
                                    onTransformEnd={() => {
                                        if (trRef.current) {
                                            const nodes = trRef.current.nodes();
                                            if (nodes.length > 0) {
                                                setItems((prevItems) => {
                                                    let updatedItems = [...prevItems];
                                                    let historyItemId = selectedId;

                                                    // Check if we're transforming a group (multiple items with same groupId)
                                                    const selectedItems = prevItems.filter(item => {
                                                        if (selectedId === item.id) return true;
                                                        return selectedId === item.id;
                                                    });
                                                    const groupIds = selectedItems.map(item => item.groupId).filter(Boolean);
                                                    const hasGroup = groupIds.length > 0 && new Set(groupIds).size === 1 && selectedItems.length > 1;
                                                    const groupId = hasGroup ? groupIds[0] : null;

                                                    if (hasGroup && groupId && nodes.length > 1) {
                                                        // Handle group transformation - maintain relative positions
                                                        const groupItems = prevItems.filter(item => item.groupId === groupId);

                                                        // Calculate original group bounds
                                                        const originalMinX = Math.min(...groupItems.map(item => item.x));
                                                        const originalMinY = Math.min(...groupItems.map(item => item.y));
                                                        const originalMaxX = Math.max(...groupItems.map(item => item.x + item.width));
                                                        const originalMaxY = Math.max(...groupItems.map(item => item.y + item.height));
                                                        const originalWidth = originalMaxX - originalMinX;
                                                        const originalHeight = originalMaxY - originalMinY;

                                                        // For pure translation (no scaling), just move all items by the same delta
                                                        const firstNode = nodes[0];
                                                        const scaleX = firstNode.scaleX();
                                                        const scaleY = firstNode.scaleY();

                                                        if (Math.abs(scaleX - 1) < 0.01 && Math.abs(scaleY - 1) < 0.01) {
                                                            // Pure translation - maintain relative positions
                                                            const deltaX = firstNode.x() - originalMinX;
                                                            const deltaY = firstNode.y() - originalMinY;

                                                            groupItems.forEach((groupItem) => {
                                                                updatedItems = updatedItems.map((item) => {
                                                                    if (item.id === groupItem.id) {
                                                                        return {
                                                                            ...item,
                                                                            x: snap(item.x + deltaX),
                                                                            y: snap(item.y + deltaY),
                                                                        };
                                                                    }
                                                                    return item;
                                                                });
                                                            });
                                                        } else {
                                                            // Scaling involved - scale and reposition relative to group
                                                            const transformedMinX = Math.min(...nodes.map(node => node.x()));
                                                            const transformedMinY = Math.min(...nodes.map(node => node.y()));
                                                            const transformedMaxX = Math.max(...nodes.map(node => node.x() + node.width() * node.scaleX()));
                                                            const transformedMaxY = Math.max(...nodes.map(node => node.y() + node.height() * node.scaleY()));
                                                            const newWidth = transformedMaxX - transformedMinX;
                                                            const newHeight = transformedMaxY - transformedMinY;

                                                            const scaleX = newWidth / originalWidth;
                                                            const scaleY = newHeight / originalHeight;
                                                            const deltaX = transformedMinX - originalMinX;
                                                            const deltaY = transformedMinY - originalMinY;

                                                            groupItems.forEach((groupItem) => {
                                                                const relativeX = groupItem.x - originalMinX;
                                                                const relativeY = groupItem.y - originalMinY;

                                                                const newX = originalMinX + deltaX + (relativeX * scaleX);
                                                                const newY = originalMinY + deltaY + (relativeY * scaleY);
                                                                const newWidth = Math.max(8, groupItem.width * scaleX);
                                                                const newHeight = Math.max(8, groupItem.height * scaleY);

                                                                updatedItems = updatedItems.map((item) => {
                                                                    if (item.id === groupItem.id) {
                                                                        // Handle text elements
                                                                        if (item.type === 'text') {
                                                                            return {
                                                                                ...item,
                                                                                x: snap(newX),
                                                                                y: snap(newY),
                                                                                width: newWidth,
                                                                                height: newHeight,
                                                                                fontSize: Math.max(8, ((item as TextItem).fontSize ?? 16) * scaleY),
                                                                            };
                                                                        }

                                                                        // Handle button elements
                                                                        if (item.type === 'button') {
                                                                            const buttonItem = item as ButtonItem;
                                                                            const newFontSize = buttonItem.fontSize
                                                                                ? Math.max(8, buttonItem.fontSize * scaleY)
                                                                                : Math.max(10, Math.min(18, newHeight * 0.35));

                                                                            return {
                                                                                ...buttonItem,
                                                                                x: snap(newX),
                                                                                y: snap(newY),
                                                                                width: newWidth,
                                                                                height: newHeight,
                                                                                fontSize: newFontSize,
                                                                            };
                                                                        }

                                                                        // Handle other elements
                                                                        return {
                                                                            ...item,
                                                                            x: snap(newX),
                                                                            y: snap(newY),
                                                                            width: newWidth,
                                                                            height: newHeight,
                                                                        };
                                                                    }
                                                                    return item;
                                                                });
                                                            });
                                                        }
                                                    } else {
                                                        // Handle individual item transformations (existing logic)
                                                        nodes.forEach((node) => {
                                                            const itemId = node.id();
                                                            const scaleX = node.scaleX();
                                                            const scaleY = node.scaleY();
                                                        
                                                            updatedItems = updatedItems.map((item) => {
                                                                if (item.id === itemId) {
                                                                    // For groups, scale children as well
                                                                    if (item.type === 'group' && (item as GroupItem).children) {
                                                                        const groupItem = item as GroupItem;
                                                                        const scaledChildren = groupItem.children.map((child) => {
                                                                            const scaledChild = {
                                                                                ...child,
                                                                                x: item.x + ((child.x - item.x) * scaleX),
                                                                                y: item.y + ((child.y - item.y) * scaleY),
                                                                                width: Math.max(5, child.width * scaleX),
                                                                                height: Math.max(5, child.height * scaleY),
                                                                            };
                                                                            
                                                                            // Scale font size for text elements
                                                                            if (child.type === 'text' && (child as TextItem).fontSize) {
                                                                                (scaledChild as TextItem).fontSize = Math.max(8, ((child as TextItem).fontSize ?? 16) * scaleY);
                                                                            }
                                                                            
                                                                            // Scale font size for button elements
                                                                            if (child.type === 'button') {
                                                                                const buttonChild = child as ButtonItem;
                                                                                const newHeight = Math.max(5, child.height * scaleY);
                                                                                (scaledChild as ButtonItem).fontSize = buttonChild.fontSize
                                                                                    ? Math.max(8, buttonChild.fontSize * scaleY)
                                                                                    : Math.max(10, Math.min(18, newHeight * 0.35));
                                                                            }
                                                                            
                                                                            return scaledChild;
                                                                        });
                                                                        
                                                                        return {
                                                                            ...groupItem,
                                                                            x: snap(node.x()),
                                                                            y: snap(node.y()),
                                                                            width: Math.max(8, Math.round(node.width() * scaleX)),
                                                                            height: Math.max(8, Math.round(node.height() * scaleY)),
                                                                            rotation: Math.round(node.rotation() || 0),
                                                                            children: scaledChildren,
                                                                        };
                                                                    }
                                                                    
                                                                    // For text elements, scale font size
                                                                    if (item.type === 'text') {
                                                                        return {
                                                                            ...item,
                                                                            x: snap(node.x()),
                                                                            y: snap(node.y()),
                                                                            width: Math.max(8, Math.round(node.width() * scaleX)),
                                                                            height: Math.max(8, Math.round(node.height() * scaleY)),
                                                                            rotation: Math.round(node.rotation() || 0),
                                                                            fontSize: Math.max(8, ((item as TextItem).fontSize ?? 16) * scaleY),
                                                                        };
                                                                    }
                                                                    
                                                                    // For button elements, scale font size
                                                                    if (item.type === 'button') {
                                                                        const buttonItem = item as ButtonItem;
                                                                        const newHeight = Math.max(8, Math.round(node.height() * scaleY));
                                                                        const newFontSize = buttonItem.fontSize 
                                                                            ? Math.max(8, buttonItem.fontSize * scaleY)
                                                                            : Math.max(10, Math.min(18, newHeight * 0.35));
                                                                        
                                                                        return {
                                                                            ...buttonItem,
                                                                            x: snap(node.x()),
                                                                            y: snap(node.y()),
                                                                            width: Math.max(8, Math.round(node.width() * scaleX)),
                                                                            height: newHeight,
                                                                            rotation: Math.round(node.rotation() || 0),
                                                                            fontSize: newFontSize,
                                                                        };
                                                                    }
                                                                    
                                                                    // For other elements
                                                                    return {
                                                                        ...item,
                                                                        x: snap(node.x()),
                                                                        y: snap(node.y()),
                                                                        width: Math.max(8, Math.round(node.width() * scaleX)),
                                                                        height: Math.max(8, Math.round(node.height() * scaleY)),
                                                                        rotation: Math.round(node.rotation() || 0),
                                                                    };
                                                                }
                                                                return item;
                                                            });
                                                            
                                                            if (!historyItemId) {
                                                                historyItemId = itemId;
                                                            }
                                                        });
                                                    }
                                                    
                                                    saveToHistory(updatedItems, historyItemId);
                                                    return updatedItems;
                                                });
                                                
                                                // Reset scales for all nodes
                                                nodes.forEach((node) => {
                                                    node.scaleX(1);
                                                    node.scaleY(1);
                                                });
                                            }
                                        }
                                    }}
                                />
                                <Transformer
                                    ref={groupTrRef}
                                    anchorSize={8}
                                    rotateEnabled={false}
                                    resizeEnabled={false}
                                    enabledAnchors={[]}
                                    keepRatio={false}
                                    boundBoxFunc={(oldBox, newBox) => {
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

            {/* Right Sidebar - Layers
             {items.length > 0 && (
            <div className='w-[280px] flex-shrink-0 h-full bg-[#F9F9FF]'>
               
                    <div className={`border border-[#CECECE] rounded-lg p-4 ${layersCollapsed ? 'h-auto' : 'h-screen'}`}>
                        <div className='mb-4 flex items-center justify-between cursor-pointer' onClick={() => setLayersCollapsed(!layersCollapsed)}>
                            <div>
                                <h3 className='text-[18px] leading-[24px] text-[#414141] font-semibold'>Layers</h3>
                                <p className='text-[12px] leading-[16px] text-[#818181] font-medium'>Manage your design layers</p>
                            </div>
                            <IoIosArrowDroprightCircle
                                className={`text-[22px] text-[#6F6B7D] transition-transform ${layersCollapsed ? 'rotate-0' : 'rotate-90'}`}
                            />
                        </div>

                        {layersCollapsed && (
                            <div className='space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto' key={items.length}>
                                {layers.length === 0 ? (
                                    <div className='text-center py-8'>
                                        <p className='text-[14px] text-[#999999]'>No layers yet</p>
                                        <p className='text-[12px] text-[#999999] mt-1'>Add elements to see layers</p>
                                    </div>
                                ) : (
                                    layers.map((layer, index) => (
                                        <div
                                            key={layer.id}
                                            draggable
                                            onDragStart={(e) => handleLayerDragStart(e, layer.id)}
                                            onDragOver={(e) => handleLayerDragOver(e, layer.id)}
                                            onDragLeave={handleLayerDragLeave}
                                            onDrop={(e) => handleLayerDrop(e, layer.id)}
                                            onDragEnd={handleLayerDragEnd}
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-move transition-all ${
                                                draggedLayerId === layer.id
                                                    ? 'opacity-50 bg-gray-100'
                                                    : dragOverLayerId === layer.id
                                                    ? 'border-blue-400 bg-blue-100 scale-105'
                                                    : selectedId === layer.id
                                                    ? 'bg-blue-50 border-blue-300'
                                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                                            }`}
                                            onClick={() => setSelectedId(layer.id)}
                                        >
                                            <div className='flex items-center gap-2'>
                                                <RiDraggable className='text-[#6F6B7D] text-lg cursor-grab active:cursor-grabbing' />
                                                <div className='w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-600'>
                                                    {layers.length - index}
                                                </div>
                                            </div>

                                            <div className='flex-1 min-w-0'>
                                                <p className='text-[14px] font-medium text-gray-800 truncate'>
                                                    {layer.name}
                                                </p>
                                                <p className='text-[12px] text-gray-500 truncate'>
                                                    {layer.type === 'text' ? (items.find(i => i.id === layer.id) as TextItem)?.text || 'Empty text' :
                                                     layer.type === 'image' ? 'Graphic element' :
                                                     layer.type === 'rect' ? 'Shape element' :
                                                     layer.type === 'button' ? 'Button element' : 'Unknown'}
                                                </p>
                                            </div>

                                            <div className='flex items-center gap-1'>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleLayerVisibility(layer.id);
                                                    }}
                                                    className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-colors ${
                                                        (items.find(i => i.id === layer.id)?.visible ?? true)
                                                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                                            : 'bg-red-100 hover:bg-red-200 text-red-600'
                                                    }`}
                                                    title={(items.find(i => i.id === layer.id)?.visible ?? true) ? 'Hide layer' : 'Show layer'}
                                                >
                                                    {(items.find(i => i.id === layer.id)?.visible ?? true) ? '👁️' : '🙈'}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleLayerLock(layer.id);
                                                    }}
                                                    className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-colors ${
                                                        (items.find(i => i.id === layer.id)?.locked ?? false)
                                                            ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                                    }`}
                                                    title={(items.find(i => i.id === layer.id)?.locked ?? false) ? 'Unlock layer' : 'Lock layer'}
                                                >
                                                    {(items.find(i => i.id === layer.id)?.locked ?? false) ? '🔒' : '🔓'}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteSelected();
                                                    }}
                                                    className='w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center text-xs transition-colors'
                                                    title='Delete layer'
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
               
            </div>
             )} */}
        </div>
        
    );
}

export default CanvasEditor;
