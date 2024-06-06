export const calculateAge = (
  dataNascimento: Date,
  isBirthday: boolean = false,
) => {
  // Pega a data atual
  var hoje = new Date();

  // Pega o ano, mês e dia da data de nascimento
  var anoNasc = dataNascimento.getFullYear();
  var mesNasc = dataNascimento.getMonth();
  var diaNasc = dataNascimento.getDate();

  // Calcula a idade
  var age = hoje.getFullYear() - anoNasc;

  // Verifica se a pessoa já fez aniversário este ano
  if (
    hoje.getMonth() < mesNasc ||
    (hoje.getMonth() === mesNasc && hoje.getDate() < diaNasc)
  ) {
    age--;
  }

  // Verifica se hoje é o aniversário da pessoa
  var birthday = hoje.getMonth() === mesNasc && hoje.getDate() === diaNasc;

  // Retorna o resultado de acordo com a verificação de aniversário
  if (isBirthday) {
    return {
      age,
      birthday,
    };
  } else {
    return {
      age,
    };
  }
};

export const dateFormatter = (date: Date) => {
  let month: any = date.getMonth() + 1;
  if (month < 10) {
    month = `${0}${month}`;
  }
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
};

export const dateFormat = (date: string | Date | undefined) => {
  if (!date) return;
  return new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
};

export const convertDateUTC = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  return date;
};
