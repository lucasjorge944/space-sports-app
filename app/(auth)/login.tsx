import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';

import { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signInWithGoogle } = useAuth();

  const handleEmailLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Erro no login', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert('Erro no login com Google', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Heading size="2xl" style={{ textAlign: 'center' }}>
        Sports Space
      </Heading>
      <Image
        source={require('@/assets/images/logo.jpeg')}
        resizeMode="cover"
        style={{
          width: 140,
          height: 140,
          borderRadius: 100,
          marginHorizontal: 'auto',
        }}
      />
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Input
          variant="outline"
          size="xxl"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            accessibilityLabel="Campo de email"
            accessibilityHint="Digite seu endereço de email"
          />
        </Input>

        <Input
          variant="outline"
          size="xxl"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoComplete="password"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            accessibilityLabel="Campo de senha"
            accessibilityHint="Digite sua senha"
          />
        </Input>
      </View>
      <Button
        variant="solid"
        size="xl"
        action="primary"
        onPress={handleEmailLogin}
      >
        <ButtonText>Entrar</ButtonText>
      </Button>

      <Button
        variant="outline"
        size="xl"
        action="primary"
        onPress={handleGoogleLogin}
      >
        <ButtonText>Entrar com Google</ButtonText>
      </Button>

      <Button
        variant="link"
        size="lg"
        action="primary"
        onPress={() => router.push('/(auth)/register')}
      >
        <ButtonText>Não tem uma conta? Cadastre-se</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    gap: 14,
  },
});
