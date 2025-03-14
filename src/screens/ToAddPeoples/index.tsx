import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { useLanguageStore } from "@/stores/LanguageStore";

import { ScreenBackground } from "@/components/Background/ScreenBackground";
import { Input } from "@/components/Inputs/Input";
import { ListButton } from "@/components/Buttons/ListButton";
import { styles } from "./style";
import { MyTheme } from "../Theme";
import { MyPicker } from "@/components/Picker/MyPicker";
import { ButtonSubmit } from "@/components/Buttons/ButtonSubmit";

export default function ToAddPeople() {

  const [name, setName] = useState('');

  const { language } = useLanguageStore();

  const peoples = [{ name: 'Welington Carmo', }, { name: 'Ueverton Carmo', }, { name: 'Weldys Carmo', }, { name: 'Evaristo Souza', }];
  const [filteredPeoples, setFilteredPeoples] = useState(peoples)


  function handleAddPeople(name: string) {
    console.log(name)
  }

  function handleSearch(text: string) {
    const filterPeoples = peoples.filter(item => item.name.toLowerCase().startsWith(text.toLowerCase()))
    setFilteredPeoples(filterPeoples)
    setName(text);
  }

  return (
    <ScreenBackground title={language!.ToAddPeople.title}>
      <Input
        placeholder={language?.ToAddPeople.search}
        setValue={handleSearch}
        value={name}
      />
      <FlatList
        data={filteredPeoples}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <MyPicker
            list={[{ name: "Sim", value: "sim" }, { name: "Não", value: "não" }]}
            onValueChange={(value) => {
              if (value === 'sim') {
                return handleAddPeople(item.name);
              }
            }}
          >
            <ListButton title={item.name} disabled>
              <Ionicons
                name="person-circle-outline"
                size={38}
                color={MyTheme.colors.white}
              />
            </ListButton>
          </MyPicker>
        )}
      />
    </ScreenBackground>
  );
}