export {};

// Exercício 04 | Controle das compras da família
const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.90, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.90, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.50, quantidade: 1 }
];

// Transformação, seleção e soma feitas sem laço for.
const nomes: string[] = itens.map(({ nome }) => nome);
const caros = itens.filter(({ preco }) => preco > 10);
const total: number = itens.reduce((valor, { preco, quantidade }) => valor + preco * quantidade, 0);

const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Higiene'); // TS2339: Property 'push' does not exist on type 'readonly string[]'.
// readonly impede operações que alterariam o array.

const prateleiras: number[][] = [
  [2, 0, 1],
  [4, 4],
  [1]
];
const quantidadeGuardada = prateleiras
  .map((prateleira) => prateleira.reduce((soma, quantidade) => soma + quantidade, 0))
  .reduce((soma, quantidade) => soma + quantidade, 0);

// Desestruturação retira as duas primeiras referências da lista.
const [primeiro, segundo] = itens;
// Spread copia a lista; inserir o macarrão não altera o array original.
const listaComExtra = [...itens, { nome: 'Macarrão', preco: 6.30, quantidade: 1 }];

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map(({ nome }) => nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);
console.log(`Itens na despensa: ${quantidadeGuardada}`);
