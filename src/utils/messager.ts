import nodemailer from "nodemailer";

export async function sendEmail({
  subject,
  contact,
  message,
}: {
  subject: string;
  contact: string;
  message?: string;
}) {
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: contact,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: message,
  };

  let result;
  let error;
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    }
    result = response;
  });

  return { result, error };
}

// export async function sendEmail(costumer: Costumer, debt: Debt, msg?: string) {
//   const name = costumer.name;
//   const from = "Heron";
//   const message = `Sua divida de ${
//     debt.description
//   } chegou ao prazo final, por isso foi acrescentado uma multa de R$${debt.late_fee.toFixed(
//     2,
//   )} por dia de atraso e agora o valor total é R$${debt.value}`;
//   const to = costumer.email;
//   const smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   const mailOptions = {
//     from: from,
//     to: to,
//     subject: name + " | new message !",
//     text: msg,
//   };

//   let result;
//   let error;
//   smtpTransport.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//     }
//     result = response;
//   });

//   return { result, error };
// }
export async function sendRecoverEmail(email: string, msg?: string) {
  const from = "Heron";
  const message = msg;
  const to = email;
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: from,
    to: to,
    subject: "Recuperação de senha - Payments - Não responda",
    text: message,
  };

  let result;
  let error;
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    }
    result = response;
  });

  return { result, error };
}

const emailExample: {
  [key: string]: (details: {
    [key: string]: string | number | Date | undefined;
  }) => string;
} = {
  late: ({ value, date, description, name }) => `Prezado(a) Sr. ${name}
  Esperamos que este e-mail o encontre bem. Estamos escrevendo para lembrá-lo(a) de que sua dívida conosco venceu.
  Detalhes da dívida:
  
    Novo Valor: R$${Number(value).toFixed(2)}
    Data de Vencimento: ${String(date).split("T")[0].split("-").join("/")}
    Descrição da Dívida: ${description}
  
  Por favor, tome as medidas necessárias para garantir que o pagamento seja feito até a data de vencimento mencionada acima. Se você já efetuou o pagamento, por favor, desconsidere esta mensagem.
  Se precisar de mais informações ou se tiver alguma dúvida, não hesite em nos contatar. Estamos aqui para ajudar.
  Atenciosamente, Heron Amaral
`,
};
