function esDígito(caracter: string) {
    return /[0-9]/.test(caracter);
}

function esLetra(caracter: string) {
    return /[a-záéíóúñ]/.test(caracter.toLowerCase());
}

function esMayúscula(caracter: string) {
    return caracter === caracter.toUpperCase() && caracter.toLowerCase() !== caracter;
}

const mapaBraille: { [clave: string]: string } = {
    // Letras
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'x': '⠭', 'y': '⠽', 'z': '⠵', 'w': '⠺',

    // Acentos y modificadores
    'á': '⠷', 'é': '⠮', 'í': '⠌', 'ó': '⠬', 'ú': '⠾',
    'ü': '⠳', 'ñ': '⠻',

    // Dígitos
    '0': '⠚', '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊',

    // Signos de puntuación
    ',': '⠂', ';': '⠆', ':': '⠒', '.': '⠄', '?': '⠢', '¿': '⠢', '!': '⠖', '¡': '⠖', '\'': '⠄', '"': '⠦',
    '«': '⠦', '»': '⠦', '(': '⠣', ')': '⠜', '*': '⠔', '-': '⠤', '/': '⠠⠂', '—': '⠤⠤',

    // Operadores matemáticos
    '+': '⠖', '=': '⠶', '×': '⠦', '÷': '⠐⠂',

    // Espacio
    ' ': '⠀'
};

const indicadorMayúscula = '⠨';
const indicadorNúmero = '⠼';
const indicadorLetra = '⠐';
const indicadorCursiva = '⠔';

export function comoBraille(textoAConvertir: string): string {
    let resultado = '';
    let escribiendoNúmero = false;

    for (const caracterAConvertir of textoAConvertir) {
        if (/\s/.test(caracterAConvertir)) {
            escribiendoNúmero = false;
            if (caracterAConvertir !== ' ') {
                resultado += caracterAConvertir;
                continue;
            }
        } else if (esDígito(caracterAConvertir)) {
            if (!escribiendoNúmero) {
                resultado += indicadorNúmero;
                escribiendoNúmero = true;
            }
        } else {
            if (escribiendoNúmero) {
                if (/[a-j]/.test(caracterAConvertir)) {
                    resultado += indicadorLetra;
                } else if (caracterAConvertir !== ',' && !esLetra(caracterAConvertir)) {
                    escribiendoNúmero = false;
                }
            }
            if (esMayúscula(caracterAConvertir)) {
                resultado += indicadorMayúscula;
            }
        }

        const caracterConvertido = mapaBraille[caracterAConvertir.toLowerCase()];
        if (!caracterConvertido) throw new Error(`Carácter desconocido: ${caracterAConvertir}`);
        resultado += caracterConvertido;
    }

    return resultado;
}