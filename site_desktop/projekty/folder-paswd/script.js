/**
 * Obiekt z regułami walidacji haseł dla różnych poziomów trudności.
 * Każdy poziom to tablica funkcji sprawdzających różne warunki na haśle.
 * @type {Object<string, Array<function(string): boolean>>}
 */
const reguly = {
    "Łatwy": [
        (h) => h.length >= 8,
        (h) => /\d/.test(h)
    ],
    "Średni": [
        (h) => h.length >= 10,
        (h) => /[A-Z]/.test(h),
        (h) => (h.match(/\d/g) || []).length >= 2,
        (h) => /[^A-Za-z0-9]/.test(h)
    ],
    "Trudny": [
        (h) => h.length >= 12,                              
        (h) => (h.match(/[A-Z]/g) || []).length >= 2,           
        (h) => (h.match(/\d/g) || []).length >= 3,             
        (h) => (h.match(/[^A-Za-z0-9]/g) || []).length >= 2
    ],
    "S.I.G.M.A": [
        (h) => h.length >= 14,                                     
        (h) => (h.match(/[A-Z]/g) || []).length >= 3,            
        (h) => (h.match(/\d/g) || []).length >= 4,                
        (h) => (h.match(/[^A-Za-z0-9]/g) || []).length >= 3,      
        (h) => new Set(h).size === h.length                        
    ]
};

/**
 * Aktualnie wybrany poziom trudności hasła.
 * @type {string}
 */
let aktualnyPoziom = "Średni";


/**
 * Sprawdza siłę hasła na podstawie aktualnego poziomu trudności,
 * aktualizuje pasek postępu oraz listę wymagań wizualnie.
 * @param {string} haslo - Hasło do sprawdzenia.
 * @returns {void}
 */
function haslo(haslo) {
    const progressBar = document.querySelector('#progress > div');
    const regulyPoziomu = reguly[aktualnyPoziom];
    const wyniki = regulyPoziomu.map(fn => fn(haslo));
    const spelnione = wyniki.filter(x => x).length;
    const procent = (spelnione / regulyPoziomu.length) * 100;

    progressBar.style.width = procent + "%";

    if (procent === 100) {
        progressBar.style.backgroundColor = "gold";
    } else if (procent >= 66) {
        progressBar.style.backgroundColor = "green";
    } else if (procent >= 33) {
        progressBar.style.backgroundColor = "orange";
    } else {
        progressBar.style.backgroundColor = "red";
    }

    const wymaganiaLista = document.querySelectorAll("#wymagania li");
    wymaganiaLista.forEach((li, index) => {
        if (wyniki[index]) {
            li.classList.add("spelnione");
        } else {
            li.classList.remove("spelnione");
        }
    });
}

/**
 * Przełącza widoczność wprowadzanego hasła (pokazuje/ukrywa),
 * a także zmienia ikonę oka.
 * @returns {void}
 */
function toggleEye() {
    const input = document.getElementById('paswd');
    const eye = document.getElementById("eyeToggle");

    let eyeOpen = false;

    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";

    eyeOpen = !eyeOpen;
    eye.src = eyeOpen ? "icons/eye.png" : "icons/closed-eye.png";
}

/**
 * Ustawia wymagania hasła dla wybranego poziomu trudności
 * i wyświetla je w formie listy na stronie.
 * @param {string} poziom - Poziom trudności ("Łatwy", "Średni", "Trudny", "S.I.G.M.A").
 * @returns {void}
 */
function trudnosc(poziom){
    const slownik = {
        "Łatwy":        ["Minimum 8 znaków", "Minimum 1 cyfra",],
        "Średni":       ["Minimum 10 znaków", "Minimum 1 duża litera", "Minimum 2 cyfry", "Minimum 1 znak specjalny"],
        "Trudny":       ["Minimum 12 znaków", "Minimum 2 duże litery", "Minimum 3 cyfra", "Minimum 2 znaki specjalne"],
        "S.I.G.M.A":    ["Minimum 14 znaków", "Minimum 3 duże litery", "Minimum 4 cyfra", "Minimum 3 znaki specjalne", "Znaki nie mogą się powtarzać"]
    };
    const wymagania = document.getElementById('wymagania');

    wymagania.innerHTML = "";

    slownik[poziom].forEach(warunek => {
        const li = document.createElement("li");
        li.textContent = warunek;
        wymagania.appendChild(li);
    })

    aktualnyPoziom = poziom
}
window.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("poziom");
    trudnosc(select.value);
});