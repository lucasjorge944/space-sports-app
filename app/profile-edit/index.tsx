import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';
import { app } from '../config/firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { formatPhoneNumber } from '../utils/formatters';
import ChangePassword from './components/ChangePassword';

export default function ProfileEditScreen() {
  const { user, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      // Aplicar máscara no telefone se existir
      const phone = user.phoneNumber || '';
      setPhoneNumber(formatPhoneNumber(phone));
      setPhotoURL(user.photoURL || null);
    }
  }, [user]);

  const handlePhoneChange = (text: string) => {
    // Remove caracteres não numéricos e limita a 11 dígitos
    const numbers = text.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(formatPhoneNumber(numbers));
  };

  const pickImage = async () => {
    try {
      // Solicitar permissão
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar suas fotos.'
        );
        return;
      }

      // Abrir seletor de imagem
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsUploadingPhoto(true);
        await uploadImage(result.assets[0].uri);
        setIsUploadingPhoto(false);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
      setIsUploadingPhoto(false);
    }
  };

  const takePhoto = async () => {
    try {
      // Solicitar permissão
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar sua câmera.'
        );
        return;
      }

      // Abrir câmera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsUploadingPhoto(true);
        await uploadImage(result.assets[0].uri);
        setIsUploadingPhoto(false);
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
      setIsUploadingPhoto(false);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      if (!user) return;

      // Converter URI para blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Criar referência no Firebase Storage
      const storage = getStorage(app);
      const imageRef = ref(storage, `profile-photos/${user.uid}`);

      // Fazer upload
      await uploadBytes(imageRef, blob);

      // Obter URL de download
      const downloadURL = await getDownloadURL(imageRef);

      // Atualizar estado local
      setPhotoURL(downloadURL);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      Alert.alert('Erro', 'Não foi possível fazer upload da imagem.');
      throw error;
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Atualizar perfil no Firebase Auth
      await updateUserProfile({
        displayName: displayName.trim() || undefined,
        photoURL: photoURL || undefined,
      });

      // TODO: Atualizar phoneNumber no Firestore ou outro serviço
      // Por enquanto, apenas atualizamos displayName e photoURL

      Alert.alert('Sucesso', 'Perfil atualizado!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert(
        'Erro',
        error.message || 'Não foi possível atualizar o perfil.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Selecionar Foto',
      'Escolha uma opção',
      [
        {
          text: 'Câmera',
          onPress: takePhoto,
        },
        {
          text: 'Galeria',
          onPress: pickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Box className="flex-1 bg-gray-50">
      <PageHeader title="Editar Perfil" showBackButton />

      <Loading visible={isLoading || isUploadingPhoto} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space="lg">
          {/* Foto do Perfil */}
          <VStack space="md" className="items-center py-4">
            <Pressable onPress={showImagePickerOptions}>
              <Box className="relative">
                {photoURL ? (
                  <Image
                    source={{ uri: photoURL }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 60,
                    }}
                    className="border-4 border-blue-500"
                  />
                ) : (
                  <Box className="w-[120px] h-[120px] bg-blue-100 rounded-full items-center justify-center border-4 border-blue-500">
                    <Ionicons name="person" size={48} color="#2563eb" />
                  </Box>
                )}
                <Box className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full items-center justify-center border-4 border-white">
                  <Ionicons name="camera" size={20} color="#ffffff" />
                </Box>
              </Box>
            </Pressable>
            <Text size="sm" className="text-gray-600 text-center">
              Toque na foto para alterar
            </Text>
          </VStack>

          {/* Campos do Formulário */}
          <VStack space="md">
            {/* Nome */}
            <VStack space="xs">
              <Text size="sm" className="text-gray-700 font-medium px-1">
                Nome
              </Text>
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="Digite seu nome"
                  value={displayName}
                  onChangeText={setDisplayName}
                />
              </Input>
            </VStack>

            {/* Email */}
            <VStack space="xs">
              <Text size="sm" className="text-gray-700 font-medium px-1">
                Email
              </Text>
              <Input variant="outline" size="lg" isReadOnly>
                <InputField
                  placeholder="Email"
                  value={email}
                  editable={false}
                  className="bg-gray-100"
                />
              </Input>
              <Text size="xs" className="text-gray-500 px-1">
                O email não pode ser alterado
              </Text>
            </VStack>

            {/* Telefone */}
            <VStack space="xs">
              <Text size="sm" className="text-gray-700 font-medium px-1">
                Telefone
              </Text>
              <Input variant="outline" size="lg">
                <InputField
                  placeholder="(00) 00000-0000"
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </Input>
            </VStack>
          </VStack>

          {/* Botão Redefinir Senha */}
          <Box className="pt-2">
            <Button
              size="lg"
              variant="outline"
              action="secondary"
              onPress={() => setShowChangePassword(true)}
              isDisabled={isLoading || isUploadingPhoto}
              className="w-full"
            >
              <ButtonText>Redefinir Senha</ButtonText>
            </Button>
          </Box>

          {/* Botão Salvar */}
          <Box className="pt-4">
            <Button
              size="lg"
              action="primary"
              onPress={handleSave}
              isDisabled={isLoading || isUploadingPhoto}
              className="w-full"
            >
              <ButtonText>Salvar Alterações</ButtonText>
            </Button>
          </Box>
        </VStack>
      </ScrollView>

      {/* Change Password ActionSheet */}
      <ChangePassword
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </Box>
  );
}
