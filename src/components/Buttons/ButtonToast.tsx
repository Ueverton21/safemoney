import { Animated, StyleSheet } from "react-native";
import { ButtonSubmit } from "./ButtonSubmit";
import { MyTheme } from "@/screens/Theme";
import { useEffect, useRef } from "react";

type ActionType = 'close' | 'open';

interface ButtonToastProps {
  action: ActionType;
  confirm: () => Promise<void>;
}
export function ButtonToast({ action, confirm }: ButtonToastProps) {
  const bottom = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    if (action === "open") {
      Animated.timing(bottom, {
        toValue: 31,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else if (action === "close") {
      Animated.timing(bottom, {
        toValue: -350,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [action]);

  return (
    <Animated.View
      style={[styles.container, { bottom }]}

    >
      <ButtonSubmit color={MyTheme.colors.primary} text=" Confirmar " onPress={confirm} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  }
});