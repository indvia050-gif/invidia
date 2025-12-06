
export type BaseItem = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    zIndex?: number;
    visible?: boolean;
    locked?: boolean;
    resizable?: boolean;
    badge?: boolean;
    groupId?: string;
};

export type RectItem = BaseItem & { type: "rect"; fill: string };
export type ImageItem = BaseItem & { type: "image"; src: string };
export type TextItem = BaseItem & {
    type: "text";
    text: string;
    fontSize?: number;
    fontFamily?: string;
    fill?: string;
    align?: "left" | "center" | "right";
    fontStyle?: "normal" | "bold" | "italic";
};
export type ButtonItem = BaseItem & {
    type: "button";
    text: string;
    fill?: string;
    textColor?: string;
    borderRadius?: number;
    fontSize?: number;
};
export type GroupItem = BaseItem & {
    type: "group";
    children: Item[];
};

export type Item = RectItem | ImageItem | TextItem | ButtonItem | GroupItem;