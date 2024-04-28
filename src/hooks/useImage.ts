import { create } from "zustand";

export type Colors = "gray" | "grayOriginal";

export interface ImageStore {
    url: string;
    colors: {
        gray: string;
        grayOriginal: string;
    };
    setColorUrl: (newUrl: string) => void;
    setGrayImage: (newUrl: string) => void;
    setUrl: (newUrl: string) => void;
}

export const useImage = create<ImageStore>((set) => ({
    url: "",
    colors: {
        gray: "",
        grayOriginal: "",
    },
    setColorUrl: (newUrl: string) =>
        set((state) => ({
            colors: { ...state.colors, gray: newUrl, grayOriginal: newUrl },
        })),
    setGrayImage: (newUrl: string) =>
        set((state) => ({
            colors: { ...state.colors, gray: newUrl },
        })),
    setUrl: (newUrl: string) => set(() => ({ url: newUrl })),
}));
