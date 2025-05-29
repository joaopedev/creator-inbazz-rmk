export interface Sticker {
    id: number;
    name: string;
    image_url: string;
    sponsor: string;
    description: string;
    category: string;
    section: string;
    sub_category: string;
    links: any;
}

export interface UserSticker extends Sticker {
    pasted?: boolean;
    quantity?: number;
    sticker?: Sticker;
  }