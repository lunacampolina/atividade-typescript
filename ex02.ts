export {};

// Exercício 02 | Emissão de cupom fiscal
const nomeDigitado: string = ' maria da silva ';

function formatarNome(nome: string): string {
  // Primeiro limpa os espaços e padroniza todas as palavras em minúsculas.
  const palavras = nome.trim().toLowerCase().split(' ').filter((parte) => parte !== '');
  return palavras.map((parte) => {
    if (parte === 'da' || parte === 'de' || parte === 'do') {
      return parte;
    }
    return parte[0].toUpperCase() + parte.substring(1);
  }).join(' ');
}

const precoLido: string = '12.40';
const quantidadeLida: string = '3un';
const valorUnitario: number = Number(precoLido);
const unidades: number = parseInt(quantidadeLida, 10);
const clienteFidelidade: boolean = true;

const valorBruto = unidades * valorUnitario;
const valorDesconto = valorBruto * (clienteFidelidade ? 0.05 : 0);
const valorLiquido = valorBruto - valorDesconto;
const numeroFormatado = (42).toString().padStart(6, '0');

// O cupom inteiro é construído em uma única template string de múltiplas linhas.
const cupom = `CUPOM Nº ${numeroFormatado}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${unidades} x R$ ${valorUnitario.toFixed(2)}
Subtotal: R$ ${valorBruto.toFixed(2)}
Desconto fidelidade: R$ ${valorDesconto.toFixed(2)}
TOTAL: R$ ${valorLiquido.toFixed(2)}`;

console.log(cupom);
