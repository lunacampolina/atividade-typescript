export {};

// Exercício 03 | Dados da clínica
// O tipo do primeiro paciente foi escrito na própria declaração do objeto.
const paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '12345678900',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Paulo Souza', telefone: '(69) 99999-0000' }
};

// typeof preserva o mesmo formato do primeiro cadastro.
const outroPaciente: typeof paciente = {
  cpf: '98765432100',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const informacao = p.alergias?.length
    ? `Alergias: ${p.alergias.join(', ')}`
    : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${informacao}`;
}

// Erros solicitados, deixados como comentário:
// paciente.cpf = '00000000000'; // TS2540: Cannot assign to 'cpf' because it is a read-only property.
// paciente.peso = 70;          // TS2339: Property 'peso' does not exist on type of paciente.

let dados: object = paciente;
// console.log(dados.nome); // TS2339: Property 'nome' does not exist on type 'object'.
// Reflexão: object diz apenas que dados é não primitivo; não descreve a propriedade nome.

let x: {} = 10;
// {} admite valores não nulos (inclusive números), por isso essa atribuição funciona.
// let y: object = 10; // TS2322: Type 'number' is not assignable to type 'object'.
// Um number é primitivo; já object exige um valor não primitivo.
let exemploMaiusculo: Object = 10;
// Object (O maiúsculo) representa a interface genérica e também aceita 10.

console.log(resumo(paciente));
console.log(resumo(outroPaciente));
