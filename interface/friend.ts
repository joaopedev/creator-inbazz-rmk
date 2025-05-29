export interface Friend {
    id: number;
    nome: string;
    username: string;
    nivel: number;
    imagem: string;
    status: "accepted" | "pending";
}