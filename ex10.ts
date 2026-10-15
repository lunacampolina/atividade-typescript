export {};

// Exercício 10 | Sistema de estacionamento do shopping
// Modelagem: aliases, literais, campos imutáveis e união discriminada.
type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO'
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// A primeira hora tem preço próprio; as demais usam a tarifa adicional.
function calcularTarifa(v: Veiculo, horas: number): number {
  const quantidadeHoras = Math.max(1, Math.ceil(horas));
  const adicionais = quantidadeHoras - 1;
  switch (v.tipo) {
    case 'carro': return 8 + adicionais * 5;
    case 'moto': return 4 + adicionais * 2;
    case 'caminhao': return 15 + adicionais * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

// Teste de exaustividade solicitado:
// type Van = { readonly placa: Placa; tipo: 'van'; passageiros: number };
// Se adicionarmos Van à união Veiculo, sem um case 'van' no switch,
// aparece TS2322: Type 'Van' is not assignable to type 'never'.
// O never identifica que o switch deixou de tratar um tipo permitido.

// O spread mantém o ticket anterior intacto e produz um novo ticket pago.
function fecharTicket(t: Ticket): Ticket {
  const horasDePermanencia = Math.max(1, t.periodo[1] - t.periodo[0]);
  const precoCheio = calcularTarifa(t.veiculo, horasDePermanencia);
  return {
    ...t,
    situacao: SituacaoTicket.Pago,
    valor: t.selo ? precoCheio / 2 : precoCheio
  };
}

function registrar(msg: string): void {
  console.log(msg);
}

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// JSON externo é lido como unknown e validado antes de virar Veiculo.
function lerVeiculo(json: string): Veiculo {
  let recebido: unknown;
  try {
    recebido = JSON.parse(json) as unknown;
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) return falhar('JSON malformado');
    throw erro;
  }

  if (typeof recebido !== 'object' || recebido === null || Array.isArray(recebido)) {
    return falhar('dados do veículo inválidos');
  }
  if (!('placa' in recebido) || typeof recebido.placa !== 'string' || recebido.placa.trim() === '') {
    return falhar('placa inválida');
  }
  if (!('tipo' in recebido) || typeof recebido.tipo !== 'string') {
    return falhar('tipo inválido');
  }

  const placa: Placa = recebido.placa;
  if (recebido.tipo === 'carro') {
    if (!('portas' in recebido) || (recebido.portas !== 2 && recebido.portas !== 4)) {
      return falhar('quantidade de portas inválida');
    }
    return { placa, tipo: 'carro', portas: recebido.portas };
  }
  if (recebido.tipo === 'moto') {
    if (!('cilindradas' in recebido) || typeof recebido.cilindradas !== 'number'
      || !Number.isFinite(recebido.cilindradas) || recebido.cilindradas <= 0) {
      return falhar('cilindradas inválidas');
    }
    return { placa, tipo: 'moto', cilindradas: recebido.cilindradas };
  }
  if (recebido.tipo === 'caminhao') {
    if (!('eixos' in recebido) || typeof recebido.eixos !== 'number'
      || !Number.isInteger(recebido.eixos) || recebido.eixos <= 0) {
      return falhar('número de eixos inválido');
    }
    return { placa, tipo: 'caminhao', eixos: recebido.eixos };
  }
  return falhar(`tipo "${recebido.tipo}" desconhecido`);
}

// Cada entrada reúne JSON, período de permanência e presença do selo.
type Entrada = [dadosJson: string, periodo: Periodo, selo: boolean];
const entradasExternas: Entrada[] = [
  ['{"placa":"ABC1D23","tipo":"carro","portas":4}', [8, 11], false],
  ['{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', [9, 10], false],
  ['{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', [7, 12], false],
  ['{"placa":"XYZ4E56","tipo":"carro","portas":2}', [14, 16], true]
];

const ticketsAbertos: Ticket[] = entradasExternas.map(([json, periodo, selo]) => ({
  veiculo: lerVeiculo(json),
  periodo,
  selo,
  situacao: SituacaoTicket.Aberto
}));

// map fecha as entradas; filter seleciona os pagos; reduce gera os totais.
const ticketsFechados = ticketsAbertos.map((ticket) => fecharTicket(ticket));
const ticketsPagos = ticketsFechados.filter((ticket) => ticket.situacao === SituacaoTicket.Pago);

const linhas = ticketsPagos.map((ticket) => {
  const horas = Math.max(1, ticket.periodo[1] - ticket.periodo[0]);
  const selo = ticket.selo ? ' (selo -50%)' : '';
  return `[${ticket.situacao}] ${ticket.veiculo.placa} (${ticket.veiculo.tipo}) - ${horas}h - R$ ${(ticket.valor ?? 0).toFixed(2)}${selo}`;
});
linhas.forEach(registrar);

const faturamento = ticketsPagos.reduce((soma, ticket) => soma + (ticket.valor ?? 0), 0);
const contagem = ticketsAbertos.reduce((atual, ticket) => {
  atual[ticket.veiculo.tipo]++;
  return atual;
}, { carro: 0, moto: 0, caminhao: 0 });

registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);
registrar(`Entradas: carro=${contagem.carro}, moto=${contagem.moto}, caminhao=${contagem.caminhao}`);

try {
  lerVeiculo('{"placa":"BIC1234","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) registrar(`Erro ao ler veículo: ${erro.message}`);
}
