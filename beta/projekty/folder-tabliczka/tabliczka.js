/**
 * Program generuje tabliczkę mnożenia w formie tabeli HTML na podstawie 
 * podanych zakresów dla osi poziomej (X) i pionowej (Y). Jeśli nie zostaną 
 * wprowadzone żadne dane lub dane będą niepoprawne, wygenerowana zostanie 
 * domyślna tabliczka o wymiarach 10x10.
 * 
 * Uwaga: w przypadku podania liczb zmiennoprzecinkowych brana jest pod uwagę 
 * jedynie część całkowita. Przykładowo, 2.5 zostanie zaokrąglone do 2.
 *
 * 
 * @author Antoni
 * @version 1.0 
 * 
 * @param {number} [PoczątkowaX=1]  - Początkowa wartość na osi poziomej (X)    (domyślnie 1).
 * @param {number} [KońcowaX=10]    - Końcowa wartość na osi poziomej (X)       (domyślnie 10).  
 * @param {number} [PoczątkowaY=1]  - Początkowa wartość na osi pionowej (Y)    (domyślnie 1).
 * @param {number} [KońcowaY=10]    - Końcowa wartość na osi pionowej (Y)       (domyślnie 10).
 * 
 * @returns {void}
 */

let tabela = document.getElementById("tabela");
function tabliczka(PoczątkowaX = 1, KońcowaX = 10, PoczątkowaY = 1, KońcowaY = 10) {

    // Pobranie wartości z formularza
    KońcowaY = parseInt(document.getElementById('KońcowaY').value) || 10;
    KońcowaX = parseInt(document.getElementById('KońcowaX').value) || 10;
    PoczątkowaY = parseInt(document.getElementById('PoczątkowaY').value) || 1;
    PoczątkowaX = parseInt(document.getElementById('PoczątkowaX').value) || 1;
    
        // Pierwszy wiersz
        let headerRow = "<tr><td></td>";
        for (let j = PoczątkowaX; j <= KońcowaX; j++) {
            headerRow += "<td>" + j + "</td>";
        }
        headerRow += "<td></td>";
        headerRow += "</tr>";
        tabela.innerHTML += headerRow;

        // Ciało tabeli
        for (let i = PoczątkowaY; i <= KońcowaY; i++) {
            let row = "<tr><td>" + i + "</td>"; 
            for (let j = PoczątkowaX; j <= KońcowaX; j++) {
                row += "<td>" + i*j + "</td>";
            }
            row += "<td>" + i + "</td>";
            row += "</tr>";
            tabela.innerHTML += row;
        }

        // Ostatni wiersz
        let footerRow = "<tr><td></td>";
        for (let j = PoczątkowaX; j <= KońcowaX; j++) {
            footerRow += "<td>" + j + "</td>";
        }
        footerRow += "<td></td>";
        footerRow += "</tr>";
        tabela.innerHTML += footerRow;
}