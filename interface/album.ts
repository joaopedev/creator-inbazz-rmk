export interface AreaProgress {
    section: string;
    category: string;
    totalStickers: number;
    glued: number;
    progress: number;
    categoryIndex?: number
}

export interface AlbumPage {
    section: string;
    category: string;
    sub_category: string;
    stickers: {
        id: number;
        pasted: boolean;
        image_url: string;
    }[];
}
