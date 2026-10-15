export {};

// Exercício 08 | Cadastro de uma loja virtual
let codigo: number | string = 'CLI-0042';

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${c.toString().padStart(4, '0')}`;
  }
  const codigoSemPrefixo = c.startsWith('CLI-') ? c.slice(4) : c;
  return `CLI-${codigoSemPrefixo.padStart(4, '0')}`;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
let tamanho: TamanhoCamiseta = 'M';
// tamanho = 'XG'; // TS2322: Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

// O frete só aceita um dos cinco nomes literais de região.
type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';
function calcularFrete(regiao: Regiao): number {
  const precos: Record<Regiao, number> = {
    norte: 25,
    nordeste: 20,
    'centro-oeste': 18,
    sudeste: 12,
    sul: 15
  };
  return precos[regiao];
}

const complemento: string | null = null;
const textoComplemento = complemento ?? '(sem complemento)';

function limparTelefone(tel: string | number): string {
  const texto = typeof tel === 'number' ? tel.toString() : tel;
  return texto.replace(/[^0-9]/g, '');
}

// Reflexão sobre inferência de literais:
const r = 'sul'; // O tipo de r é o literal 'sul' (const impede reatribuição).
let regiaoGenerica = 'sul'; // O tipo inferido é string, pois let permite outros textos.
// calcularFrete(regiaoGenerica);
// TS2345: Argument of type 'string' is not assignable to parameter of type 'Regiao'.
// 'as const' mantém o valor como o literal 'sul', mesmo usando let.
let r2 = 'sul' as const;

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: Rua das Flores, 100 - ${textoComplemento}`);
console.log(`Frete para o ${r}: R$ ${calcularFrete(r2).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone(69999990000)}`);
