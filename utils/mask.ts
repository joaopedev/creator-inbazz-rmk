const formatPhone = (input: string) => {
  let formatted = input.replace(/\D/g, ""); // Remove all non-digits
  
  // For 9-digit numbers (like 9999-3344)
  if (formatted.length <= 4) {
    return formatted;
  }
  if (formatted.length <= 8) { // Up to 8 digits before the hyphen (e.g., 99993344)
    return `${formatted.slice(0, 4)}-${formatted.slice(4)}`;
  }
  // For 10-digit numbers (like 99999-3344)
  if (formatted.length <= 9) { // Up to 9 digits before the hyphen (e.g., 999993344)
      return `${formatted.slice(0, 5)}-${formatted.slice(5)}`;
  }
  // Handles cases where the number is longer, truncating to 10 digits
  return `${formatted.slice(0, 5)}-${formatted.slice(5, 9)}`; 
};

// Função para formatar a data de nascimento
const formatBirthDate = (input: string) => {
  let formatted = input.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (formatted.length <= 2) {
    return formatted; // Formato de dia
  }

  if (formatted.length <= 4) {
    return `${formatted.slice(0, 2)}/${formatted.slice(2)}`; // Formato de dd/mm
  }

  return `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}/${formatted.slice(
    4,
    8
  )}`; // Formato de dd/mm/aaaa
};

const formatCpf = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "").slice(0, 11);

  return cleanedValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export { formatBirthDate, formatCpf, formatPhone };

