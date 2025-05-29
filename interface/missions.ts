import { ImageSourcePropType } from "react-native";

export interface Missions {
    id: number;
    title: string;
    subtitle: string;
    image: ImageSourcePropType;
    quantity: ImageSourcePropType;
    status: "done" | "pending";
}