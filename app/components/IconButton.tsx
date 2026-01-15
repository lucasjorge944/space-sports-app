import { Pressable } from '@/components/ui/pressable';
import { Ionicons } from '@expo/vector-icons';

type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type IconButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline';

interface IconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  color?: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  selected?: boolean;
  disabled?: boolean;
}

const BUTTON_SIZES = {
  sm: {
    button: 32,
    icon: 16,
    className: 'w-8 h-8',
  },
  md: {
    button: 40,
    icon: 20,
    className: 'w-10 h-10',
  },
  lg: {
    button: 48,
    icon: 24,
    className: 'w-12 h-12',
  },
  xl: {
    button: 56,
    icon: 28,
    className: 'w-14 h-14',
  },
};

export function IconButton({
  name,
  onPress,
  color,
  size = 'md',
  variant = 'default',
  selected = false,
  disabled = false,
}: IconButtonProps) {
  const getVariantClasses = () => {
    const baseClasses = 'items-center justify-center rounded-full';

    if (selected) {
      return `${baseClasses} bg-primary-600 data-[hover=true]:bg-primary-700 data-[active=true]:bg-primary-800`;
    }

    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-primary-600 data-[hover=true]:bg-primary-700 data-[active=true]:bg-primary-800`;
      case 'secondary':
        return `${baseClasses} bg-background-200 data-[hover=true]:bg-background-300 data-[active=true]:bg-background-400`;
      case 'ghost':
        return `${baseClasses} bg-transparent data-[hover=true]:bg-background-100 data-[active=true]:bg-background-200`;
      case 'outline':
        return `${baseClasses} bg-transparent border border-background-300 data-[hover=true]:bg-background-50 data-[active=true]:bg-background-100`;
      default:
        return `${baseClasses} bg-background-100 data-[hover=true]:bg-background-200 data-[active=true]:bg-background-300`;
    }
  };

  const getIconColor = () => {
    if (color) return color;
    if (selected || variant === 'primary') return '#ffffff';
    return '#374151';
  };

  const getDisabledClasses = () => {
    return disabled ? 'opacity-40' : '';
  };

  return (
    <Pressable
      className={`${BUTTON_SIZES[size].className} ${getVariantClasses()} ${getDisabledClasses()}`}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Ionicons
        name={name}
        size={BUTTON_SIZES[size].icon}
        color={getIconColor()}
      />
    </Pressable>
  );
}
