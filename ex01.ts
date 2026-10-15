export {};

// Exercício 01 | Controle de vendas da padaria
// As informações dos produtos recebem tipos explícitos.
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.50;
const quantidade2: number = 2;

let aberta = true;
// Inferência: ao receber true, a variável aberta é do tipo boolean.

const subtotal1 = quantidade1 * precoUnitario1;
const subtotal2 = quantidade2 * precoUnitario2;
const total = subtotal1 + subtotal2;
const paesNoAno: number = 1_250_000;
const codigoPanificacao: number = 0x1A; // Em decimal, 0x1A = 26.

// Teste de erro (linha desativada para permitir a compilação):
// quantidade1 = 'doze'; // TS2322: Type 'string' is not assignable to type 'number'.

// Apresentação dos valores com duas casas decimais.
function descreverVenda(nome: string, qtd: number, unitario: number): string {
  return `${nome}: ${qtd} x R$ ${unitario.toFixed(2)} = R$ ${(qtd * unitario).toFixed(2)}`;
}

console.log(descreverVenda(nomeProduto1, quantidade1, precoUnitario1));
console.log(descreverVenda(nomeProduto2, quantidade2, precoUnitario2));
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesNoAno}`);
console.log(`Categoria: ${codigoPanificacao}`);
