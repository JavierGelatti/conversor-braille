import {describe, expect, test} from "vitest";
import {comoBraille} from "../src/braille.ts";

describe('conversión a braille', () => {
  test('devuelve una cadena vacía para una entrada vacía', () => {
    expect(comoBraille(''))
        .toBe('');
  });

  test('convierte el alfabeto en minúsculas correctamente', () => {
    expect(comoBraille('abcdefghijklmnopqrstuvwxyz'))
      .toBe('⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵');
  });

  test('los espacios se convierten a espacios de braille', () => {
    expect(comoBraille(`a b c`))
        .toBe(`⠁⠀⠃⠀⠉`);
  });

  test('los tabs y saltos de línea se mantienen', () => {
    expect(comoBraille(`a\tb\nc`))
        .toBe(`⠁\t⠃\n⠉`);
  });

  test('convierte el alfabeto en mayúsculas con indicadores de mayúscula', () => {
    expect(comoBraille('ABC'))
      .toBe('⠨⠁⠨⠃⠨⠉');
  });

  test('convierte caracteres especiales (del español)', () => {
    expect(comoBraille('áéíóúüñ'))
      .toBe('⠷⠮⠌⠬⠾⠳⠻');
  });

  test('convierte caracteres acentuados en mayúsculas correctamente', () => {
    expect(comoBraille('ÁÉÍ'))
      .toBe('⠨⠷⠨⠮⠨⠌');
  });

  test('convierte un solo dígito con indicador de número', () => {
    expect(comoBraille('5'))
      .toBe('⠼⠑');
  });

  test('convierte números de varios dígitos con un solo indicador de número', () => {
    expect(comoBraille('2023'))
      .toBe('⠼⠃⠚⠃⠉');
  });

  test('si hay un espacio, vuelve a aparecer el indicador de número', () => {
    expect(comoBraille('20 23'))
        .toBe('⠼⠃⠚⠀⠼⠃⠉');
  });

  test('luego de un número, si no hay un espacio y aparece una letra minúscula de la a-j, se agrega el indicador de letra', () => {
    expect(comoBraille('20aj23'))
        .toBe('⠼⠃⠚⠐⠁⠐⠚⠃⠉');
  });

  test('luego de un número, si no hay un espacio y aparece una letra minúscula no entre a-j, no se agrega el indicador de letra', () => {
    expect(comoBraille('20kz23'))
        .toBe('⠼⠃⠚⠅⠵⠃⠉');
  });

  test('luego de un número, si no hay un espacio y aparece una letra mayúscula, se agrega el indicador de mayúscula', () => {
    expect(comoBraille('20AZ23'))
        .toBe('⠼⠃⠚⠨⠁⠨⠵⠃⠉');
  });

  test('convierte los signos de puntuación', () => {
    expect(comoBraille(`,.;:'"()*/¿?¡!«»`))
      .toBe('⠂⠄⠆⠒⠄⠦⠣⠜⠔⠠⠂⠢⠢⠖⠖⠦⠦');
  });

  test('convierte los puntos suspensivos correctamente', () => {
    expect(comoBraille('...'))
      .toBe('⠄⠄⠄');
  });

  test('convierte la raya', () => {
    expect(comoBraille('—'))
      .toBe('⠤⠤');
  });

  test('convierte el guión', () => {
    expect(comoBraille('-'))
      .toBe('⠤');
  });

  test('convierte signos matemáticos', () => {
    expect(comoBraille('-+=×÷'))
        .toBe('⠤⠖⠶⠦⠐⠂');
  });

  test('luego de un número, si hay una coma seguida de otros dígitos, se interpreta como un único número decimal', () => {
    expect(comoBraille('20,23'))
        .toBe('⠼⠃⠚⠂⠃⠉');
  });

  test('luego de un número, si hay un operador seguido de otros dígitos, se interpreta como un número separado', () => {
    expect(comoBraille('20=23'))
        .toBe('⠼⠃⠚⠶⠼⠃⠉');
  });

  test('no se pueden convertir caracteres desconocidos', () => {
    expect(() => comoBraille('❦'))
        .toThrowError('Carácter desconocido: ❦');
  });

  test('ejemplos específicos', () => {
    expect(comoBraille('¡Hola, María! ¿Cómo estás?'))
      .toBe('⠖⠨⠓⠕⠇⠁⠂⠀⠨⠍⠁⠗⠌⠁⠖⠀⠢⠨⠉⠬⠍⠕⠀⠑⠎⠞⠷⠎⠢');
    expect(comoBraille('Tengo 25 años.'))
        .toBe('⠨⠞⠑⠝⠛⠕⠀⠼⠃⠑⠀⠁⠻⠕⠎⠄');
    expect(comoBraille('LaS NaRaNjAs'))
        .toBe('⠨⠇⠁⠨⠎⠀⠨⠝⠁⠨⠗⠁⠨⠝⠚⠨⠁⠎');
  });
});