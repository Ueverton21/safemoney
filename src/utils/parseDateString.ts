export function parseDateString(dateStr: string, language: string): Date | null {
  const parts = dateStr.split("/").map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) return null;

  let day: number, month: number, year: number;

  if (language === 'en') {
    // MM/DD/YYYY
    [month, day, year] = parts;
  } else {
    // DD/MM/YYYY
    [day, month, year] = parts;
  }

  const date = new Date(year, month - 1, day); // JS usa meses de 0 a 11

  // Validação extra: checa se a data gerada realmente bate com a entrada
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null; // data inválida (ex: 02/30/2024 ou 31/02/2024)
  }

  return date;
}
