import { Item } from "./type";
import useId from "./constants";

export interface ModuleTemplate {
    id: string;
    name: string;
    category: string;
    items: Item[];
}

// Helper to create module templates
const createModule = (name: string, category: string, items: Item[]): ModuleTemplate => ({
    id: useId("mod_"),
    name,
    category,
    items,
});

// Empty Block
export const emptyBlockModule = createModule("Empty Block", "Basic", [
    {
        id: useId("r_"),
        type: "rect",
        x: 0,
        y: 0,
        width: 200,
        height: 150,
        fill: "#f3f4f6",
    }
]);

// Item Recommendation - Layout 1 (Image + Headline + Button)
export const itemRecommendation1 = createModule("Layout 1", "Item recommendation", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 200,
        height: 180,
        children: [
            {
                id: useId("r_"),
                type: "rect",
                x: 20,
                y: 20,
                width: 80,
                height: 80,
                fill: "#e5e7eb",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 110,
                y: 30,
                width: 80,
                height: 30,
                text: "Headline",
                fontSize: 14,
                fontStyle: "bold",
                fill: "#000000",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 110,
                y: 60,
                width: 80,
                height: 20,
                text: "Description",
                fontSize: 11,
                fill: "#6b7280",
            },
            {
                id: useId("b_"),
                type: "button",
                x: 110,
                y: 90,
                width: 70,
                height: 28,
                text: "Button",
                fill: "#3b82f6",
                textColor: "#ffffff",
            },
        ],
    }
]);

// Item Recommendation - Layout 2 (Image + Headline + Button, vertical)
export const itemRecommendation2 = createModule("Layout 2", "Item recommendation", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 150,
        height: 200,
        children: [
            {
                id: useId("r_"),
                type: "rect",
                x: 10,
                y: 10,
                width: 130,
                height: 100,
                fill: "#e5e7eb",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 120,
                width: 130,
                height: 25,
                text: "Headline",
                fontSize: 14,
                fontStyle: "bold",
                fill: "#000000",
                align: "center",
            },
            {
                id: useId("b_"),
                type: "button",
                x: 40,
                y: 155,
                width: 70,
                height: 28,
                text: "Button",
                fill: "#3b82f6",
                textColor: "#ffffff",
            },
        ],
    }
]);

// Item Recommendation - Layout 3 (Large Image + Headline + Button)
export const itemRecommendation3 = createModule("Layout 3", "Item recommendation", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 200,
        height: 180,
        children: [
            {
                id: useId("r_"),
                type: "rect",
                x: 10,
                y: 10,
                width: 180,
                height: 100,
                fill: "#e5e7eb",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 120,
                width: 180,
                height: 20,
                text: "Headline",
                fontSize: 14,
                fontStyle: "bold",
                fill: "#000000",
            },
            {
                id: useId("b_"),
                type: "button",
                x: 65,
                y: 145,
                width: 70,
                height: 28,
                text: "Button",
                fill: "#3b82f6",
                textColor: "#ffffff",
            },
        ],
    }
]);

// Reswift Block Layout
export const reswiftBlockLayout = createModule("Reswift Layout 1", "Reswift Block", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 280,
        height: 120,
        children: [
            {
                id: useId("r_"),
                type: "rect",
                x: 10,
                y: 10,
                width: 60,
                height: 60,
                fill: "#e5e7eb",
            },
            {
                id: useId("r_"),
                type: "rect",
                x: 80,
                y: 10,
                width: 60,
                height: 60,
                fill: "#e5e7eb",
            },
            {
                id: useId("r_"),
                type: "rect",
                x: 150,
                y: 10,
                width: 60,
                height: 60,
                fill: "#e5e7eb",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 80,
                width: 200,
                height: 30,
                text: "Reswift Layout 1",
                fontSize: 12,
                fill: "#000000",
                align: "center",
            },
        ],
    }
]);

// Product Usage Block
export const productUsageBlock = createModule("Product usage block", "Product usage", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 220,
        height: 140,
        children: [
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 10,
                width: 200,
                height: 25,
                text: "Headline",
                fontSize: 16,
                fontStyle: "bold",
                fill: "#000000",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 40,
                width: 80,
                height: 20,
                text: "Subdata",
                fontSize: 12,
                fill: "#6b7280",
            },
            {
                id: useId("r_"),
                type: "rect",
                x: 100,
                y: 40,
                width: 110,
                height: 90,
                fill: "#e5e7eb",
            },
        ],
    }
]);

// Social Proof Block
export const socialProofBlock = createModule("Social Proof Block", "Social Proof", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        children: [
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 10,
                width: 180,
                height: 25,
                text: "⭐⭐⭐⭐⭐",
                fontSize: 18,
                fill: "#fbbf24",
                align: "center",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 45,
                width: 180,
                height: 20,
                text: "5 stars!",
                fontSize: 14,
                fontStyle: "bold",
                fill: "#000000",
                align: "center",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 70,
                width: 180,
                height: 20,
                text: "Customer review",
                fontSize: 11,
                fill: "#6b7280",
                align: "center",
            },
        ],
    }
]);

// Ingredient Spotlight Block 1
export const ingredientSpotlight1 = createModule("Ingredient Spotlight Block", "Ingredient Spotlight", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 200,
        height: 150,
        children: [
            {
                id: useId("r_"),
                type: "rect",
                x: 10,
                y: 10,
                width: 80,
                height: 80,
                fill: "#e5e7eb",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 100,
                y: 20,
                width: 90,
                height: 25,
                text: "Headline",
                fontSize: 14,
                fontStyle: "bold",
                fill: "#000000",
            },
        ],
    }
]);

// Ingredient Spotlight Block 2
export const ingredientSpotlight2 = createModule("Ingredient Spotlight Block 2", "Ingredient Spotlight", [
    {
        id: useId("g_"),
        type: "group",
        x: 0,
        y: 0,
        width: 180,
        height: 120,
        children: [
            {
                id: useId("r_"),
                type: "rect",
                x: 10,
                y: 10,
                width: 160,
                height: 100,
                fill: "#e5e7eb",
            },
            {
                id: useId("t_"),
                type: "text",
                x: 10,
                y: 40,
                width: 160,
                height: 30,
                text: "Image",
                fontSize: 16,
                fill: "#9ca3af",
                align: "center",
            },
        ],
    }
]);

// Export all modules
export const allModules: ModuleTemplate[] = [
    emptyBlockModule,
    itemRecommendation1,
    itemRecommendation2,
    itemRecommendation3,
    reswiftBlockLayout,
    productUsageBlock,
    socialProofBlock,
    ingredientSpotlight1,
    ingredientSpotlight2,
];

// Group modules by category
export const modulesByCategory = allModules.reduce((acc, module) => {
    if (!acc[module.category]) {
        acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
}, {} as Record<string, ModuleTemplate[]>);
