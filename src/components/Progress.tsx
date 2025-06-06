import { MyTheme } from "@/screens/Theme";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ProgressProps {
  progress: number;
}

export function Progress({ progress }: ProgressProps) {

  const width = useRef(new Animated.Value(0)).current;


  const widthInterpolated = width.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',

  });

  useEffect(() => {
    Animated.timing(width, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress])

  return (
    <View style={styles.progressContainer}>
      <Animated.View style={[styles.progress, { width: widthInterpolated }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    width: '100%',
    backgroundColor: MyTheme.colors.secondary,
    height: 4,
  },
  progress: {
    backgroundColor: MyTheme.colors.primary,
    height: 4,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
});