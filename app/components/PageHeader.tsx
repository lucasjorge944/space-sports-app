import React from 'react';
import { StatusBar } from 'react-native';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  buttons?: React.ReactNode;
  backgroundColor?: string;
  variant?: 'default' | 'primary' | 'transparent';
}

export function PageHeader({
  title,
  subtitle,
  showBackButton = false,
  buttons,
  backgroundColor,
  variant = 'default',
}: PageHeaderProps) {
  const insets = useSafeAreaInsets();

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    switch (variant) {
      case 'primary':
        return 'bg-primary-500';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-background-0';
    }
  };

  const getTitleColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-white';
      case 'transparent':
        return 'text-typography-900';
      default:
        return 'text-primary-600';
    }
  };

  const getSubtitleColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary-100';
      case 'transparent':
        return 'text-typography-500';
      default:
        return 'text-typography-500';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return '#ffffff';
      case 'transparent':
        return '#374151';
      default:
        return '#1a73e8';
    }
  };

  return (
    <Box className={`${getBackgroundColor()} border-b border-background-200`}>
      <StatusBar
        barStyle={variant === 'primary' ? 'light-content' : 'dark-content'}
        backgroundColor={variant === 'primary' ? '#3B82F6' : '#ffffff'}
      />

      <Box style={{ paddingTop: insets.top }}>
        <HStack className="items-center justify-between px-5 py-4">
          {/* Left Section */}
          <HStack className="items-center flex-1" space="md">
            {showBackButton && (
              <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 items-center justify-center rounded-full bg-background-100 active:bg-background-200"
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={getIconColor()}
                />
              </Pressable>
            )}

            <VStack className="flex-1" space="xs">
              <Heading
                size="xl"
                className={`${getTitleColor()} font-bold`}
                numberOfLines={1}
              >
                {title}
              </Heading>
              {subtitle && (
                <Heading
                  size="sm"
                  className={`${getSubtitleColor()} font-normal`}
                  numberOfLines={1}
                >
                  {subtitle}
                </Heading>
              )}
            </VStack>
          </HStack>

          {/* Right Section */}
          {buttons && (
            <HStack space="sm" className="items-center">
              {buttons}
            </HStack>
          )}
        </HStack>
      </Box>
    </Box>
  );
}
