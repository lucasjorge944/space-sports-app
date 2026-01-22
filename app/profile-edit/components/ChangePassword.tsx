import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Loading } from '../../components/Loading';
import { useAuth } from '../../contexts/AuthContext';

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePassword({
  isOpen,
  onClose,
}: ChangePasswordProps) {
  const { changePassword, user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validações
    if (!currentPassword.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua senha atual.');
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert('Erro', 'Por favor, digite a nova senha.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Erro', 'A nova senha deve ser diferente da senha atual.');
      return;
    }

    try {
      setIsLoading(true);
      await changePassword(currentPassword, newPassword);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            handleClose();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível alterar a senha.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Resetar campos ao fechar
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <>
      <Loading visible={isLoading} message="Alterando senha..." />
      <Actionsheet isOpen={isOpen} onClose={handleClose} snapPoints={[75]}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[75%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack space="lg" className="w-full px-6 pb-6">
            {/* Header */}
            <VStack space="xs" className="items-center">
              <Heading size="xl" className="text-gray-900">
                Redefinir Senha
              </Heading>
              <Text size="sm" className="text-gray-600 text-center">
                Preencha os campos abaixo para alterar sua senha
              </Text>
            </VStack>

            {/* Formulário */}
            <VStack space="md">
              {/* Senha Atual */}
              <VStack space="xs">
                <Text size="sm" className="text-gray-700 font-medium px-1">
                  Senha Atual
                </Text>
                <Input variant="outline" size="lg">
                  <InputField
                    secureTextEntry={!showCurrentPassword}
                    placeholder="Digite sua senha atual"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                  />
                  <InputSlot
                    className="pr-3"
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    <InputIcon
                      as={showCurrentPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
              </VStack>

              {/* Nova Senha */}
              <VStack space="xs">
                <Text size="sm" className="text-gray-700 font-medium px-1">
                  Nova Senha
                </Text>
                <Input variant="outline" size="lg">
                  <InputField
                    secureTextEntry={!showNewPassword}
                    placeholder="Digite a nova senha"
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  <InputSlot
                    className="pr-3"
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    <InputIcon as={showNewPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
                <Text size="xs" className="text-gray-500 px-1">
                  Mínimo de 6 caracteres
                </Text>
              </VStack>

              {/* Confirmar Nova Senha */}
              <VStack space="xs">
                <Text size="sm" className="text-gray-700 font-medium px-1">
                  Confirmar Nova Senha
                </Text>
                <Input variant="outline" size="lg">
                  <InputField
                    secureTextEntry={!showConfirmPassword}
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <InputSlot
                    className="pr-3"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <InputIcon
                      as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
              </VStack>
            </VStack>

            {/* Botões */}
            <VStack space="sm" className="pt-4">
              <Button
                size="lg"
                action="primary"
                onPress={handleSubmit}
                isDisabled={isLoading}
                className="w-full"
              >
                <ButtonText>Alterar Senha</ButtonText>
              </Button>
              <Button
                size="lg"
                variant="outline"
                action="secondary"
                onPress={handleClose}
                isDisabled={isLoading}
                className="w-full"
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
