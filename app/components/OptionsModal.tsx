import React from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { Icon } from '@/components/ui/icon';
import { Ionicons } from '@expo/vector-icons';

export interface OptionModalType {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  variant?: 'default' | 'danger';
  showSeparator?: boolean;
}

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
  options: OptionModalType[];
  onSelectOption: (option: OptionModalType) => void;
}

export function OptionsModal({
  visible,
  onClose,
  options,
  onSelectOption,
}: OptionsModalProps) {
  return (
    <Actionsheet isOpen={visible} onClose={onClose} snapPoints={[25]}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="max-h-[25%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Box className="w-full">
          {options.map((option, index) => (
            <React.Fragment key={option.label}>
              {option.showSeparator && (
                <Divider className="my-2" />
              )}
              <ActionsheetItem
                onPress={() => {
                  onClose();
                  onSelectOption(option);
                }}
                className="py-4 px-4"
              >
                <Box className="mr-3">
                  <Ionicons
                    name={option.icon}
                    size={24}
                    color={option.variant === 'danger' ? '#dc3545' : '#333'}
                  />
                </Box>
                <ActionsheetItemText
                  className={`text-base ${
                    option.variant === 'danger' 
                      ? 'text-red-600' 
                      : 'text-gray-900'
                  }`}
                >
                  {option.label}
                </ActionsheetItemText>
              </ActionsheetItem>
            </React.Fragment>
          ))}
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
}

