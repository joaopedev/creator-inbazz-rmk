export interface User {
    id: string;
    name: string;
    avatar: string;
    username: string;
    level: number;
}

export interface Sticker {
    id: string;
    name: string;
}

export type ExchangeStatus = 'pending' | 'completed' | 'rejected';

export interface ExchangeOffer {
    id: string;
    sender: User;
    receiver: User;
    offerSticker: Sticker;
    requestSticker: Sticker;
    status?: ExchangeStatus;
    date?: string | null;
}

export type ExchangeTabType = "ENVIADAS" | "RECEBIDAS" | "HISTÓRICO";