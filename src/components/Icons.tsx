import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export type VariantIconName =
  'credit-card'
  | 'car-side'
  | 'piggy-bank'
  | 'plane-departure'
  | 'house-chimney'
  | 'briefcase-medical'
  | 'book'
  | 'mobile-screen-button'
  | 'hourglass-half'
  | 'cart-shopping'
  | 'map-location'
  ;

interface IconsProps {
  variant: VariantIconName
}

export function Icons({ variant }: IconsProps) {
  return (
    <FontAwesome6
      name={variant}
      size={16}
      color={'white'}
    />
  )
}