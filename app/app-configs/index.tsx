import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { BellIcon, CalendarIcon, MoonIcon, SunIcon } from 'lucide-react-native';
import colors from 'tailwindcss/colors';
import { PageHeader } from '../components/PageHeader';
import { useAppConfig } from '../contexts/AppConfigContext';

export default function AppConfigs() {
  const {
    config,
    updateThemeMode,
    updateNotifyClassStart,
    updateNotifyReservationStart,
    loading,
  } = useAppConfig();

  const ConfigItem = ({
    icon,
    title,
    description,
    value,
    onToggle,
    disabled = false,
  }: {
    icon: any;
    title: string;
    description?: string;
    value: boolean;
    onToggle: (value: boolean) => void;
    disabled?: boolean;
  }) => (
    <Box className="bg-white rounded-lg border border-gray-100 p-4">
      <HStack space="md" className="items-center justify-between">
        <HStack space="md" className="items-center flex-1">
          <Box className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
            <Icon as={icon} size="sm" className="text-blue-600" />
          </Box>
          <VStack className="flex-1" space="xs">
            <Text size="md" className="text-gray-900 font-medium">
              {title}
            </Text>
            {description && (
              <Text size="sm" className="text-gray-500">
                {description}
              </Text>
            )}
          </VStack>
        </HStack>
        <Switch
          value={value}
          onToggle={onToggle}
          isDisabled={disabled || loading}
          trackColor={{
            false: colors.gray[300],
            true: colors.blue[500],
          }}
          thumbColor={colors.white}
          ios_backgroundColor={colors.gray[300]}
        />
      </HStack>
    </Box>
  );

  const ThemeModeItem = () => {
    const isDark = config.themeMode === 'dark';

    return (
      <Box className="bg-white rounded-lg border border-gray-100 p-4">
        <HStack space="md" className="items-center justify-between">
          <HStack space="md" className="items-center flex-1">
            <Box className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
              <Icon
                as={isDark ? MoonIcon : SunIcon}
                size="sm"
                className="text-blue-600"
              />
            </Box>
            <VStack className="flex-1" space="xs">
              <Text size="md" className="text-gray-900 font-medium">
                Modo Escuro
              </Text>
              <Text size="sm" className="text-gray-500">
                {isDark ? 'Tema escuro ativado' : 'Tema claro ativado'}
              </Text>
            </VStack>
          </HStack>
          <Switch
            value={isDark}
            onToggle={(value) => updateThemeMode(value ? 'dark' : 'light')}
            isDisabled={loading}
            trackColor={{
              false: colors.gray[300],
              true: colors.blue[500],
            }}
            thumbColor={colors.white}
            ios_backgroundColor={colors.gray[300]}
          />
        </HStack>
      </Box>
    );
  };

  return (
    <Box className="flex-1 bg-gray-50">
      <PageHeader title="Configurações" showBackButton />
      <ScrollView className="flex-1">
        <VStack className="p-4" space="md">
          <VStack space="sm">
            <Text size="sm" className="text-gray-600 font-medium px-2">
              Aparência
            </Text>
            <ThemeModeItem />
          </VStack>

          <VStack space="sm">
            <Text size="sm" className="text-gray-600 font-medium px-2">
              Notificações
            </Text>
            <ConfigItem
              icon={BellIcon}
              title="Notificar início de aulas"
              description="Receba notificações quando suas aulas estiverem prestes a começar"
              value={config.notifyClassStart}
              onToggle={updateNotifyClassStart}
            />
            <ConfigItem
              icon={CalendarIcon}
              title="Notificar início de reservas"
              description="Receba notificações quando suas reservas estiverem prestes a começar"
              value={config.notifyReservationStart}
              onToggle={updateNotifyReservationStart}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}
