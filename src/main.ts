import "./style.css";
import {comoBraille} from "./braille.ts";

const areaDeEntrada = document.getElementById('texto-entrada') as HTMLTextAreaElement;
const elementoResultado = document.getElementById('resultado-braille') as HTMLDivElement;

areaDeEntrada.addEventListener('input', () => {
    const textoEntrada = areaDeEntrada.value;

    try {
        elementoResultado.textContent = comoBraille(textoEntrada);
        areaDeEntrada.classList.remove('error');
        elementoResultado.classList.remove('error');
    } catch (error) {
        areaDeEntrada.classList.add('error');
        elementoResultado.classList.add('error');
        if (error instanceof Error) {
            elementoResultado.textContent = error.message;
        }
    }
});
