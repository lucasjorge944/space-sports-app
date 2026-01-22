/**
 * Formata um número de telefone brasileiro
 * @param value - String com o número de telefone (pode conter caracteres não numéricos)
 * @returns String formatada no padrão brasileiro: (00) 00000-0000 ou (00) 0000-0000
 */
export const formatPhoneNumber = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  // Aplica a máscara baseada no tamanho
  if (numbers.length <= 2) {
    return numbers.length > 0 ? `(${numbers}` : '';
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    // Celular com 11 dígitos
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
};
