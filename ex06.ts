export {};

// Exercício 06 | Acompanhamento de entrega
// Os valores numéricos começam em 1 e aumentam automaticamente.
enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado
}

enum FormaPagamento {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO'
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido: return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo: return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega: return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue: return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado: return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Recebido) return StatusPedido.EmPreparo;
  if (status === StatusPedido.EmPreparo) return StatusPedido.SaiuParaEntrega;
  if (status === StatusPedido.SaiuParaEntrega) return StatusPedido.Entregue;
  return status; // Os estados Entregue e Cancelado não podem avançar.
}

const formaEscolhida: FormaPagamento = FormaPagamento.PIX;
// const pagamentoInvalido: FormaPagamento = 'PIX';
// TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Mesmo com valor igual, um enum de string exige o membro FormaPagamento.PIX.

let etapaAtual = StatusPedido.Recebido;
while (true) {
  // Enum numérico tem mapeamento reverso: StatusPedido[2] === 'EmPreparo'.
  const nomeEtapa = StatusPedido[etapaAtual];
  console.log(`[${etapaAtual} - ${nomeEtapa}] ${mensagem(etapaAtual)}`);
  if (etapaAtual === StatusPedido.Entregue) break;
  etapaAtual = avancar(etapaAtual);
}
console.log(`Pagamento: ${formaEscolhida}`);
