export {};

// Exercício 09 | Conferência das respostas recebidas de uma API
const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// any aparece aqui somente porque o exercício pede uma demonstração do risco.
function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(dados.temperatura.toFixed(1));
}
// Com respostaQuebrada, não há erro de compilação; em execução ocorre:
// TypeError: dados.temperatura.toFixed is not a function.
// A string 'quente' não possui o método numérico toFixed.

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

function lerClima(json: string): { cidade: string; temperatura: number } {
  let resposta: unknown;
  try {
    resposta = JSON.parse(json) as unknown;
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) return falhar('JSON malformado');
    throw erro;
  }

  if (typeof resposta !== 'object' || resposta === null || Array.isArray(resposta)) {
    return falhar('resposta inválida');
  }
  if (!('cidade' in resposta) || typeof resposta.cidade !== 'string') {
    return falhar('campo "cidade" inválido');
  }
  if (!('temperatura' in resposta) || typeof resposta.temperatura !== 'number') {
    return falhar('campo "temperatura" inválido');
  }

  return { cidade: resposta.cidade, temperatura: resposta.temperatura };
}

// Os erros são recebidos como unknown e examinados antes de usar .message.
for (const json of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const registro = lerClima(json);
    console.log(`${registro.cidade}: ${registro.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    console.log(`Erro: ${erro instanceof Error ? erro.message : 'desconhecido'}`);
  }
}

// Executa a versão insegura e captura a falha, sem mudar a saída do relatório.
try {
  lerComAny(respostaQuebrada);
} catch (erro: unknown) {
  if (erro instanceof Error) {
    // Erro de execução observado e explicado no comentário acima.
  }
}
