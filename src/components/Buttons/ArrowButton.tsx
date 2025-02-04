import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type ArrowButtonProps = TouchableOpacityProps & {
  direction: 'left' | 'down' | 'up';
  smallSize?: boolean;
}
export function ArrowButton({ direction, smallSize = false, ...rest }: ArrowButtonProps) {
  return (
    <TouchableOpacity {...rest}>
      <FontAwesome5 name={direction === 'left' ? 'chevron-back' : direction === 'down' ? 'chevron-down' : 'chevron-up'} size={smallSize ? 20 : 24} color="white" />
    </TouchableOpacity>
  );
}