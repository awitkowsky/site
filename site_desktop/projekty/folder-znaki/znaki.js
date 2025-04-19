/**
 * Skrypt obsługujący dynamiczne liczenie pozostałych znaków w polach formularza.
 *
 * Po załadowaniu strony skrypt automatycznie znajduje wszystkie pola `<input>` oraz `<textarea>`
 * z atrybutem `maxlength` i aktualizuje ich powiązane etykiety `<label>`, wyświetlając liczbę
 * pozostałych znaków do wpisania. Aktualizacja odbywa się na bieżąco podczas wpisywania tekstu.
 *
 * Działanie:
 * - Po wprowadzeniu tekstu do pola, skrypt pobiera jego długość
 * - Odejmuje ją od wartości `maxlength`
 * - Aktualizuje treść etykiety `<label>` powiązanej z danym polem
 *
 * @author Antoni
 * @version 1.0
 */

window.onload = function () {
    document.querySelectorAll('input, textarea').forEach(input => {
        znaki({ target: input });
    });
};

/**
 * Aktualizuje etykietę `<label>` powiązaną z polem formularza,
 * wyświetlając liczbę pozostałych znaków do maksymalnej dozwolonej wartości.
 *
 * @param {Event} event - Obiekt zdarzenia zawierający element wejściowy (`input` lub `textarea`).
 */
function znaki(event) {
    const element = event.target;
    const label = document.querySelector(`label[for="${element.id}"]`);

    if (!label) return; // Zapobiega błędom, jeśli label nie istnieje

    let maxlength = element.getAttribute("maxlength");
    let remainingChars = maxlength - element.value.length;

    label.textContent = `${label.textContent.split(":")[0]}: Pozostało znaków: ${remainingChars}`;
}
