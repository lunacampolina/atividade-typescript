export {};

// Exercício 05 | Temperaturas do dia
const leituras: [cidade: string, temperatura: number][] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29]
];

function extremos(temps: number[]): [number, number] {
  if (temps.length === 0) {
    throw new Error('A lista de temperaturas não pode estar vazia');
  }
  let menor = temps[0];
  let maior = temps[0];
  for (const temperatura of temps) {
    if (temperatura < menor) menor = temperatura;
    if (temperatura > maior) maior = temperatura;
  }
  return [menor, maior];
}

const temperaturas = leituras.map(([, valor]) => valor);
const [minima, maxima] = extremos(temperaturas);
const media = temperaturas.reduce((acumulado, valor) => acumulado + valor, 0) / temperaturas.length;

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// A terceira posição (e-mail) é opcional nas tuplas a seguir.
const contato1: [nome: string, telefone: string, email?: string] =
  ['Júlia', '(69) 99999-1111', 'julia@noticias.com'];
const contato2: [nome: string, telefone: string, email?: string] =
  ['Roberto', '(69) 99999-2222'];

// Rest permite guardar a cidade seguida de várias temperaturas da semana.
const semana: [string, ...number[]] = ['Porto Velho', 32, 33, 31, 34, 35, 33, 34];
const [cidadeDaSemana, ...registros] = semana;
const mediaDaSemana = registros.reduce((total, temperatura) => total + temperatura, 0) / registros.length;
// Média semanal calculada e guardada em mediaDaSemana.

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[1] = 'Manaus'; // TS2540: Cannot assign to '1' because it is a read-only property.
// Uma tupla readonly não autoriza modificar seus elementos.
