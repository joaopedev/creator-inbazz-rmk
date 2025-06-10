const formatPhone = (input: string) => {
  let formatted = input.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (formatted.length <= 2) {
    return `+${formatted}`; // Formato de DDD
  }

  if (formatted.length <= 6) {
    return `+${formatted.slice(0, 2)} ${formatted.slice(2)}`; // Formato de (00) 0000
  }

  return `+${formatted.slice(0, 2)} ${formatted.slice(2, 7)}-${formatted.slice(
    7,
    11
  )}`; // Formato final de telefone
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

