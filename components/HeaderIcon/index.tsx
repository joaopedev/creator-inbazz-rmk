import { useState } from "react";
import { TouchableOpacity, Image, ImageSourcePropType, Text } from "react-native";
import { PopoverMenu } from "../PopoverMenu";


interface MenuItem {
    label: string;
    onPress: () => void;
}

interface HeaderIconProps {
    items?: MenuItem[];
    source?: ImageSourcePropType
    text?: string;
}

export default function HeaderIcon({ items, source, text }: HeaderIconProps) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)} style={{ marginRight: 0 }}>
                <Image
                    source={source}
                    style={{ width: 42, height: 42 }}
                />
            </TouchableOpacity>
            <PopoverMenu
                visible={visible}
                onClose={() => setVisible(false)}
                items={items}
            />
            <Text>{text}</Text>
        </>
    );
}
