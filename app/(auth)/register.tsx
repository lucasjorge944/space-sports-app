import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { Pressable } from '@/components/ui/pressable';

import { useState } from 'react';
import { Alert, Image, StatusBar } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, preencha todos os campos.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Senha muito curta',
        'A senha deve ter pelo menos 6 caracteres.',
      );
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
    } catch (error: any) {
      Alert.alert('Erro no cadastro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box className="flex-1 bg-background-0">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Center className="flex-1 px-6">
        <VStack space="2xl" className="w-full max-w-md">
          {/* Header Section */}
          <VStack space="lg" className="items-center">
            <Box className="mb-4">
              <Image
                source={require('@/assets/images/logo.jpeg')}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                }}
                resizeMode="cover"
              />
            </Box>

            <VStack space="xs" className="items-center">
              <Heading size="3xl" className="text-typography-900 font-bold">
                Criar Conta
              </Heading>
              <Text size="md" className="text-typography-500 text-center">
                Cadastre-se para começar sua jornada
              </Text>
            </VStack>
          </VStack>

          {/* Form Section */}
          <VStack space="lg" className="w-full">
            {/* Email Input */}
            <Input
              variant="outline"
              size="xl"
              isDisabled={isLoading}
              className="bg-background-50 border-background-300"
            >
              <InputSlot className="pl-4">
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
              </InputSlot>
              <InputField
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                className="text-typography-900 ml-2"
              />
            </Input>

            {/* Password Input */}
            <Input
              variant="outline"
              size="xl"
              isDisabled={isLoading}
              className="bg-background-50 border-background-300"
            >
              <InputSlot className="pl-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#6B7280"
                />
              </InputSlot>
              <InputField
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                className="text-typography-900 ml-2 flex-1"
              />
              <InputSlot className="pr-4" onPress={togglePasswordVisibility}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#6B7280"
                />
              </InputSlot>
            </Input>

            {/* Confirm Password Input */}
            <Input
              variant="outline"
              size="xl"
              isDisabled={isLoading}
              className="bg-background-50 border-background-300"
            >
              <InputSlot className="pl-4">
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#6B7280"
                />
              </InputSlot>
              <InputField
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoComplete="password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                className="text-typography-900 ml-2 flex-1"
              />
              <InputSlot
                className="pr-4"
                onPress={toggleConfirmPasswordVisibility}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#6B7280"
                />
              </InputSlot>
            </Input>

            {/* Password Requirements */}
            <Text size="xs" className="text-typography-400 px-1">
              A senha deve ter pelo menos 6 caracteres
            </Text>
          </VStack>

          {/* Buttons Section */}
          <VStack space="md" className="w-full">
            {/* Register Button */}
            <Button
              variant="solid"
              size="lg"
              action="primary"
              onPress={handleRegister}
              isDisabled={isLoading}
              className="w-full bg-primary-600 rounded-xl"
            >
              {isLoading ? (
                <HStack space="sm" className="items-center">
                  <Ionicons name="refresh" size={18} color="white" />
                  <ButtonText className="text-white font-semibold">
                    Criando conta...
                  </ButtonText>
                </HStack>
              ) : (
                <ButtonText className="text-white font-semibold text-base">
                  Criar Conta
                </ButtonText>
              )}
            </Button>

            {/* Divider */}
            <HStack space="md" className="items-center my-2">
              <Divider className="flex-1 bg-background-300" />
              <Text size="sm" className="text-typography-400 px-2">
                ou
              </Text>
              <Divider className="flex-1 bg-background-300" />
            </HStack>

            {/* Google Register Button */}
            <Button
              variant="outline"
              size="lg"
              action="secondary"
              onPress={() => router.push('/(auth)/login')}
              isDisabled={isLoading}
              className="w-full border-background-300 rounded-xl"
            >
              <HStack space="sm" className="items-center">
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <ButtonText className="text-typography-700 font-medium text-base">
                  Cadastrar com Google
                </ButtonText>
              </HStack>
            </Button>
          </VStack>

          {/* Login Link */}
          <Center className="mt-4">
            <HStack space="xs" className="items-center">
              <Text size="sm" className="text-typography-500">
                Já tem uma conta?
              </Text>
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <Text size="sm" className="text-primary-600 font-semibold">
                  Fazer login
                </Text>
              </Pressable>
            </HStack>
          </Center>
        </VStack>
      </Center>
    </Box>
  );
}
