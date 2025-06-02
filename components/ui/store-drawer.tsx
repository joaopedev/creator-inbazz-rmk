/**
 * Componente de Drawer para seleção de lojas
 */

import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";

import { useStore } from "@/hooks/useStore";
import { Store } from "@/types/auth-data";
import { Ticket } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, ButtonText } from "./button";

interface StoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoreDrawer({ isOpen, onClose }: StoreDrawerProps) {
  const { stores, selectedStore, selectStore } = useStore();
  const insets = useSafeAreaInsets();

  const handleSelectStore = (store: Store) => {
    selectStore(store);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="lg" anchor="bottom">
      <DrawerBackdrop style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
      <DrawerContent className="bg-white border-0 rounded-t-lg shadow-background-dark">
        <SafeAreaView edges={["bottom"]} className="h-full bg-white">
          <DrawerHeader className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-text-primary">
              Selecione uma marca
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-text-primary ">Fechar</Text>
            </TouchableOpacity>
          </DrawerHeader>

          <DrawerBody>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-4 py-2">
                {stores.length === 0 ? (
                  <Text className="text-gray-500 py-4 text-center">
                    Você não participa de nenhuma comunidade de marca
                  </Text>
                ) : (
                  stores.map((storeItem) => (
                    <TouchableOpacity
                      key={storeItem.store_id}
                      onPress={() => handleSelectStore(storeItem.store)}
                      className={`flex-row items-center rounded-lg border-2 p-3 ${
                        selectedStore?.id === storeItem.store_id
                          ? "border-blue bg-blue-dim"
                          : "border-border"
                      }`}
                    >
                      <Image
                        source={{
                          uri:
                            storeItem.store.logo ||
                            "https://placehold.co/40x40",
                        }}
                        alt={storeItem.store.name}
                        className="h-[40px] w-[40px] rounded-full"
                      />
                      <View className="ml-3 flex-1">
                        <Text className="text-text-primary font-semibold">
                          {storeItem.store.name}
                        </Text>
                        {storeItem.store.username && (
                          <Text className="text-text-primary text-xs">
                            @{storeItem.store.username}
                          </Text>
                        )}
                      </View>
                      {storeItem.coupon_code && (
                        <View className="bg-gray-100 flex-row items-center gap-2 rounded-md px-2 py-1">
                          <Text className="text-gray-700 text-xs">
                            {storeItem.coupon_code}
                          </Text>
                          <Ticket
                            className={"text-gray-700 text-xs "}
                            color={
                              selectedStore?.id === storeItem.store_id
                                ? "#546ADA"
                                : "#4E4E4E"
                            }
                            size={14}
                            strokeWidth={
                              selectedStore?.id === storeItem.store_id ? 3 : 1
                            }
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </ScrollView>
          </DrawerBody>

          <DrawerFooter>
            <Button className="h-12 w-full" onPress={onClose}>
              <ButtonText className="text-white">Confirmar</ButtonText>
            </Button>
          </DrawerFooter>
        </SafeAreaView>
      </DrawerContent>
    </Drawer>
  );
}
