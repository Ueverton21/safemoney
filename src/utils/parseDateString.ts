export function parseDateString(dateStr: string): Date | null {
  const [day, month, year] = dateStr.split("/").map(Number);

  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day); // JS usa meses de 0 a 11

  // Validação extra: checa se a data gerada realmente bate com a entrada
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null; // data inválida (ex: 31/02/2024)
  }

  return date;
}