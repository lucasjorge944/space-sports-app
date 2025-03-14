import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomTextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  inputProps?: TextInputProps;
}

export function CustomTextInput({
  placeholder,
  value,
  onChangeText,
  label,
  icon,
  inputProps,
}: CustomTextInputProps) {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {icon && (
          <Ionicons name={icon} size={20} color="#666" style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          {...inputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  icon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
});
