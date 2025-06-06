export function decimalMask(value: string) {
  return value.replace(/\D/g, "").replace(/^(\d+)(\d{2})$/, "$1,$2");
  //.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function dateMask(value: string, language: string) {
  const cleaned = value.replace(/\D/g, "").slice(0, 8); // Apenas números, máx 8 dígitos

  if (language === 'en') {
    let month = cleaned.slice(0, 2);
    let day = cleaned.slice(2, 4);
    let year = cleaned.slice(4, 8);

    let monthNum = parseInt(month);
    let dayNum = parseInt(day);
    let yearNum = parseInt(year);

    // Corrige mês inválido
    if (month.length === 2 && monthNum > 12) {
      month = "12";
      monthNum = 12;
    }

    // Define o dia máximo com base no mês e (se aplicável) no ano
    let maxDay = 31;
    if ([4, 6, 9, 11].includes(monthNum)) {
      maxDay = 30;
    } else if (monthNum === 2 && year.length === 4) {
      const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
      maxDay = isLeapYear ? 29 : 28;
    }

    // Corrige dia inválido (somente após mês e — para fevereiro — após ano)
    if (day.length === 2) {
      if (monthNum === 2 && year.length < 4) {
        // ainda não valida o dia (aguarda o ano)
      } else if (dayNum > maxDay) {
        day = maxDay.toString().padStart(2, "0");
      }
    }

    // Aplica máscara com /
    let masked = month;
    if (day) masked += "/" + day;
    if (year) masked += "/" + year;
    return masked;
  } else {
    let day = cleaned.slice(0, 2);
    let month = cleaned.slice(2, 4);
    let year = cleaned.slice(4, 8);

    let dayNum = parseInt(day);
    let monthNum = parseInt(month);
    let yearNum = parseInt(year);

    if (month.length === 2 && monthNum > 12) {
      month = "12";
      monthNum = 12;
    }

    let maxDay = 31;
    if ([4, 6, 9, 11].includes(monthNum)) {
      maxDay = 30;
    } else if (monthNum === 2 && year.length === 4) {
      const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
      maxDay = isLeapYear ? 29 : 28;
    }

    if (day.length === 2) {
      if (monthNum === 2 && year.length < 4) {
        // ainda não valida o dia (aguarda o ano)
      } else if (dayNum > maxDay) {
        day = maxDay.toString().padStart(2, "0");
      }
    }

    let masked = day;
    if (month) masked += "/" + month;
    if (year) masked += "/" + year;
    return masked;
  }
}





