/**
 * Program ma za zadanie obliczać pierwiastki równania
 * kwadratowego, poprzez obliczenie Delty, a następnie
 * obliczenie pierwiastków.
 * 
 * W razie Delty dodatniej, program zwróci dwuelementową
 * tablicę z obydwoma rozwiązaniami równania
 * 
 * Gdy Delta będzie równa zero, wynikiem będzie tablica 
 * z wartością logiczną True, oraz odpowiadnim pierwiastkiem
 * równania x₀.
 * 
 * Gdy Delta będzie mniejsza od zera, wynikiem będzie wartość
 * logiczna False.
 * 
 * Program generuje również wykres funkcji kwadratowej oraz zaznacza na nim:
 * - Wierzchołek funkcji
 * - Punkty przecięcia z osią X (jeżeli takie występują)
 * 
 * @author Antoni
 * @version 1.0 
 * 
 * @param {number} a        Współczynnik kierunkowy funkcji kwadratowej (przed x²).
 * @param {number} b        Współczynnik liniowy funkcji kwadratowej (przed x).
 * @param {number} c        Wyraz wolny (stały) funkcji kwadratowej.
 * 
 * @returns {void}
 */



/**
 * Funkcja wykonuje weryfikację współczynników a, b, c.
 * Sprawdza, czy wszystkie współczynniki są liczbami oraz czy a ≠ 0.
 * 
 * @param {number} a        Współczynnik a równania kwadratowego.
 * @param {number} b        Współczynnik b równania kwadratowego.
 * @param {number} c        Współczynnik c równania kwadratowego.
 * 
 * @returns {boolean}       Zwraca true, jeśli wszystkie współczynniki są liczbami i a ≠ 0, 
 *                          w przeciwnym razie zwraca false.
 */
function security_check(a, b, c) {
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("moj_div").innerHTML = "<p><strong>Błąd:</strong> Wszystkie współczynniki muszą być liczbami.</p>";
        return false;
    }
    else if (a === 0) {
        document.getElementById("moj_div").innerHTML = "<p><strong>Błąd:</strong> Współczynnik A nie może być równy 0.</p>";
        return false;
    }

    return true;
}


/**
 * Funkcja oblicza deltę równania kwadratowego na podstawie współczynników a, b, c.
 * 
 * @param {number} a        Współczynnik a równania kwadratowego.
 * @param {number} b        Współczynnik b równania kwadratowego.
 * @param {number} c        Współczynnik c równania kwadratowego.
 * 
 * @returns {number|null}   Zwraca wartość Delty lub null w przypadku błędu.
 */
function delta(a, b, c) {
    if (a === undefined || b === undefined || c === undefined) {
        a = parseFloat(document.getElementById("a").value);
        b = parseFloat(document.getElementById("b").value);
        c = parseFloat(document.getElementById("c").value);
    }

    if (!security_check(a, b, c)) return null;

    let deltaWartosc = b ** 2 - 4 * a * c;
    document.getElementById("moj_div").innerHTML = "Delta△ = " + deltaWartosc;
    return deltaWartosc;
}


/**
 * Funkcja oblicza pierwiastki równania kwadratowego na podstawie współczynników a, b, c.
 * Jeśli Delta jest dodatnia, zwraca tablicę z dwoma pierwiastkami.
 * Jeśli Delta wynosi zero, zwraca wartość logiczną true oraz pierwiastek x₀.
 * Jeśli Delta jest ujemna, zwraca wartość logiczną false.
 * 
 * @param {number} a        Współczynnik a równania kwadratowego.
 * @param {number} b        Współczynnik b równania kwadratowego.
 * @param {number} c        Współczynnik c równania kwadratowego.
 * 
 * @returns {array|boolean} Zwraca tablicę z pierwiastkami lub wartość logiczną false
 *                          w zależności od wartości Delty.
 */
function kwadratowe(a, b, c) {
    let x0, x1, x2;

    if (a === undefined || b === undefined || c === undefined) {
        a = parseFloat(document.getElementById("a").value);
        b = parseFloat(document.getElementById("b").value);
        c = parseFloat(document.getElementById("c").value);
    }

    if (!security_check(a, b, c)) return;

    let deltaWynik = delta(a, b, c);
    if (deltaWynik === null) return;

    let wynik;
    if (deltaWynik < 0) {
        wynik = "Delta ujemna. Brak pierwiastków równania.";
        document.getElementById("moj_div").innerHTML = 
            "<p><strong>Wynik: </strong>" + wynik + "</p>" +
            "<p><strong>Współczynniki:</strong><br>A: " + a + "<br>B: " + b + "<br>C: " + c + "</p>" +
            "<p><strong>Brak pierwiastków.</strong></p>";
            rysujWykres(a,b,c)
        return false;
    } 
    else if (deltaWynik == 0) {
        wynik = "Delta równa zero. Jedno rozwiązanie.";
        x0 = -b / (2 * a);
        document.getElementById("moj_div").innerHTML = 
            "<p><strong>Wynik: </strong>" + wynik + "</p>" +
            "<p><strong>Współczynniki:</strong><br>A: " + a + "<br>B: " + b + "<br>C: " + c + "</p>" +
            "<p><strong>Jedno rozwiązanie:</strong> x₀ = " + x0 + "</p>";
            rysujWykres(a,b,c)
        return [true, x0];
    } 
    else {
        wynik = "Delta dodatnia. Dwa rozwiązania.";
        x1 = (-b - Math.sqrt(deltaWynik)) / (2 * a);
        x2 = (-b + Math.sqrt(deltaWynik)) / (2 * a);
        document.getElementById("moj_div").innerHTML = 
            "<p><strong>Wynik: </strong>" + wynik + "</p>" +
            "<p><strong>Współczynniki:</strong><br>A: " + a + "<br>B: " + b + "<br>C: " + c + "</p>" +
            "<p><strong>Dwa rozwiązania:</strong><br>x₁ = " + x1 + "<br>x₂ = " + x2 + "</p>";
            rysujWykres(a,b,c)
        return [x1, x2];
    }
}



/**
 * Funkcja rysuje wykres funkcji kwadratowej y = ax² + bx + c w zakresie x = -25 do x = 25.
 * Zawiera również punkty wierzchołka funkcji oraz punkty przecięcia z osią X (jeśli istnieją).
 * 
 * @param {number} a        Współczynnik a równania kwadratowego.
 * @param {number} b        Współczynnik b równania kwadratowego.
 * @param {number} c        Współczynnik c równania kwadratowego.
 * 
 * @returns {void}
 */
function rysujWykres(a, b, c) {

    if (!security_check(a, b, c)) return;

    let wartosciXy = [];
    for (let x = -25; x <= 25; x += 0.01) {
        let y = a * x ** 2 + b * x + c;
        wartosciXy.push({ x: x, y: y });
    }

    let wierzcholekX = -b / (2 * a);
    let wierzcholekY = a * wierzcholekX ** 2 + b * wierzcholekX + c;

    let delta = b ** 2 - 4 * a * c;
    let punktyPrzeciecia = [];
    if (delta >= 0) {
        let x1 = (-b - Math.sqrt(delta)) / (2 * a);
        let x2 = (-b + Math.sqrt(delta)) / (2 * a);
        punktyPrzeciecia.push({ x: x1, y: 0 });
        if (delta > 0) punktyPrzeciecia.push({ x: x2, y: 0 });
    }

    new Chart("myChart", {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Wykres funkcji",
                    pointRadius: 2,
                    pointBackgroundColor: "rgb(0,0,255)",
                    data: wartosciXy
                },
                {
                    label: "Wierzchołek",
                    pointRadius: 6,
                    pointBackgroundColor: "rgb(255,0,0)",
                    data: [{ x: wierzcholekX, y: wierzcholekY }]
                },
                {
                    label: "Punkty przecięcia z osią X",
                    pointRadius: 6,
                    pointBackgroundColor: "rgb(0,255,0)",
                    data: punktyPrzeciecia
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'none',
                intersect: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        min: -25,
                        max: 25,
                        stepSize: 1
                    },
                    scaleLabel: { display: true, labelString: "X" },
                    gridLines: {
                        color: "#969696",
                        lineWidth: 0.7
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: -20,
                        max: 20,
                        stepSize: 1
                    },
                    scaleLabel: { display: true, labelString: "f(x)" },
                    gridLines: {
                        color: "#969669",
                        lineWidth: 0.7
                    }
                }],
            }
        }
    });
}
