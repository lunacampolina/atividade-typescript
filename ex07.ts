export {};

// Exercício 07 | Avisos enviados pela escola
// void indica que o programa não utilizará um valor retornado pelo callback.
type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, texto) => {
  console.log(`[E-MAIL] para ${destinatario}: ${texto}`);
};

const porSms: Notificador = (destinatario, texto) => {
  if (texto.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return; // Sai da função antes de enviar um SMS grande.
  }
  console.log(`[SMS] para ${destinatario}: ${texto}`);
};

const porApp: Notificador = (destinatario, texto) => {
  console.log(`[APP] para ${destinatario}: ${texto}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((pessoa) => enviar(pessoa, mensagem));
}

// Erro provocado, mantido comentado:
// function teste(): void { return 10; }
// TS2322: Type 'number' is not assignable to type 'void'.

const contar: Notificador = (destinatario, texto) => texto.length;
// Reflexão: atribuir essa função a Notificador é permitido porque um callback
// com retorno number pode ser utilizado onde se espera retorno void.
// Quem recebe o callback não aproveita o número retornado. Isso não significa
// que uma função declarada explicitamente como ': void' possa retornar 10.

const recado = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], recado, porEmail);
notificarTodos(['joao.resp'], recado, porApp);
notificarTodos(['(69) 99999-0000'], 'A'.repeat(161), porSms);
