import { Image, Linking, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import { Badge, BadgeText } from '@/components/ui/badge';

// Mapeamento estático das imagens (require não aceita caminhos dinâmicos)
const ADS_IMAGES: Record<string, ImageSourcePropType> = {
  'ads-1.jpg': require('@/assets/images/ads/ads-1.jpg'),
  'ads-2.jpg': require('@/assets/images/ads/ads-2.jpg'),
};

interface ADSBannerProps {
  uri: string;
  link: string;
}

export function ADSBanner({ uri, link }: ADSBannerProps) {
  const handlePress = () => {
    if (link) {
      Linking.openURL(link);
    }
  };

  const imageSource = ADS_IMAGES[uri];

  if (!imageSource) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!link}
      className="rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100 transition-transform"
    >
      <View className="relative">
        <Image
          source={imageSource}
          className="w-full h-48"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Badge de anúncio */}
        <Badge action="muted" size="sm" className="absolute top-2 left-2 bg-black/80">
          <BadgeText className="text-white">Anúncio</BadgeText>
        </Badge>
      </View>
    </TouchableOpacity>
  );
}

