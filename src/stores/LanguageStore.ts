import { Language, selectLanguage } from "@/translate/language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LanguageState {
  language: Language | undefined;
  getLanguage: () => void;
  setLanguage: (name: string) => void;
}

export const useLanguageStore = create<LanguageState>()((set) => ({
  language: undefined,
  getLanguage: async () => {
    const languageStorage = await AsyncStorage.getItem("language");

    var lang = selectLanguage(languageStorage);

    set({ language: lang });
  },
  setLanguage: async (name: string) => {
    await AsyncStorage.setItem("language", name);

    var lang = selectLanguage(name);

    set({ language: lang });
  },
}));
