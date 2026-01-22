import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  CalendarDaysIcon,
  ChevronRightIcon,
  Icon,
  SettingsIcon,
} from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const MenuItem = ({
    icon,
    title,
    onPress,
  }: {
    icon: any;
    title: string;
    onPress?: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-4 px-4 bg-white rounded-lg border border-gray-100 active:bg-gray-50"
    >
      <Box className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-4">
        <Icon as={icon} size="sm" className="text-blue-600" />
      </Box>
      <Text size="md" className="flex-1 text-gray-900 font-medium">
        {title}
      </Text>
      <Icon as={ChevronRightIcon} size="sm" className="text-gray-400" />
    </Pressable>
  );

  return (
    <Box className="flex-1 bg-gray-50">
      <VStack space="lg" className="px-4 pt-12 pb-6">
        {/* Header/Profile Section */}
        <VStack space="md" className="items-center py-8">
          <Box className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Icon as={SettingsIcon} size="xl" className="text-blue-600" />
          </Box>

          <VStack space="xs" className="items-center">
            <Heading size="xl" className="text-gray-900">
              {user?.displayName}
            </Heading>
            <Text size="md" className="text-gray-600">
              {user?.email}
              {user?.phoneNumber}
            </Text>
          </VStack>
        </VStack>

        {/* Menu Items */}
        <VStack space="sm">
          <MenuItem
            icon={SettingsIcon}
            title="Editar Perfil"
            onPress={() => router.push('/profile-edit')}
          />

          <MenuItem
            icon={CalendarDaysIcon}
            title="Métodos de Pagamento"
            onPress={() => router.push('/payment-methods')}
          />

          <MenuItem
            icon={CalendarDaysIcon}
            title="Meus Planos"
            onPress={() => router.push('/plans')}
          />

          <MenuItem icon={SettingsIcon} title="Configurações" />
        </VStack>

        {/* Logout Button */}
        <Box className="mt-8">
          <Button
            variant="outline"
            action="secondary"
            size="lg"
            onPress={handleLogout}
            className="w-full border-red-200 bg-red-50"
          >
            <Icon as={SettingsIcon} size="sm" className="text-red-600 mr-2" />
            <ButtonText className="text-red-600 font-medium">Sair</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
