/**
 * Prosta gra w Pong, w której gracz kontroluje paletkę za pomocą myszy,
 * a przeciwnik sterowany jest automatycznie.
 * 
 * Gra kończy się, gdy piłka dotknie dolnej lub górnej krawędzi ekranu.
 * Przeciwnik śledzi pozycję piłki, a jej prędkość stopniowo wzrasta w trakcie gry.
 * 
 * @author Antoni
 * @version 1.0
 */
let interwal; // Zmienna przechowująca interwał gry
let pierwszeUruchomienie = true; // Flaga określająca, czy gra się już rozpoczęła
// WSPÓŁRZĘDNE
let kierunekPoziomo, kierunekPionowo; // Kierunki ruchu piłki
let i, j;           // Współrzędne piłki
let x, y;           // Współrzędne myszy (gracza)
let przeciwnik;     // Współrzędne przeciwnika
// PRĘDKOŚĆ
let predkosc = 2;               // Początkowa prędkość piłki
let predkoscPrzeciwnika = 5;    // Początkowa prędkość przeciwnika
let przyspieszenie = 0.005;     // Stopniowe przyspieszanie piłki
// WIELKOŚCI
let szerokoscPaletek = 150;   // Szerokość paletek gracza i przeciwnika
let rozmiarPilki = 8;         // Rozmiar piłki
function katToRad(kat) {
    return kat * (Math.PI / 180);
}
// Rysowanie elementów gry
function draw() {
    let canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        let c = canvas.getContext('2d');
        // Czyszczenie ekranu
        c.fillStyle = 'rgb(255,255,255)';
        c.fillRect(0, 0, 1000, 800);
        c.strokeRect(0, 0, 1000, 800);
        // Rysowanie paletki gracza
        c.fillStyle = 'rgb(0,0,0)';
        c.fillRect(x - szerokoscPaletek / 2, 770, szerokoscPaletek, 10);
        // Rysowanie paletki przeciwnika
        c.fillRect(przeciwnik - szerokoscPaletek / 2, 20, szerokoscPaletek, 10);
        // Rysowanie piłki
        c.beginPath();
        c.arc(i, j, rozmiarPilki, katToRad(0), katToRad(360), false);
        c.fill();
        c.closePath();
        // Kolizje piłki ze ścianami bocznymi
        if (i <= rozmiarPilki || i >= 1000 - rozmiarPilki) {
            kierunekPoziomo *= -1;
        }
        // Kolizje piłki z paletkami
        if (j >= 760 && j <= 770 && i >= x - szerokoscPaletek / 2 && i <= x + szerokoscPaletek / 2) {
            kierunekPionowo = -1;
        }
        if (j <= 30 && j >= 20 && i >= przeciwnik - szerokoscPaletek / 2 && i <= przeciwnik + szerokoscPaletek / 2) {
            kierunekPionowo = 1;
        }
        // Ruch przeciwnika w kierunku piłki
        przeciwnik += przeciwnik < i ? predkoscPrzeciwnika : -predkoscPrzeciwnika;
        // Aktualizacja pozycji piłki
        if (!pierwszeUruchomienie) {
            predkosc += przyspieszenie;
            i += kierunekPoziomo * predkosc;
            j += kierunekPionowo * predkosc;
            // Sprawdzenie, czy piłka dotknęła górnej lub dolnej krawędzi (koniec gry)
            if (j <= rozmiarPilki || j >= 800 - rozmiarPilki) {
                clearInterval(interwal);
                alert('Koniec gry!');
            }
        }
    }
}
// Rozpoczęcie gry
function pong() {
    i = 500;
    j = 400;
    przeciwnik = 500;
    kierunekPionowo = 0;
    kierunekPoziomo = 0;
    predkosc = 2;
    pierwszeUruchomienie = false;
    draw();
    setTimeout(() => {
        kierunekPionowo = Math.random() > 0.5 ? 1 : -1;
        kierunekPoziomo = Math.random() > 0.5 ? 1 : -1;
        interwal = setInterval(draw, 10);
    }, 1337);
}
// Śledzenie pozycji myszy
function pozycjaMyszki(e) {
    if (!e) e = window.event;
    let pozX = e.pageX - (screen.width - 1000) / 2;
    let pozY = e.pageY;
    x = pozX;
    y = pozY;
    return { pozX, pozY };
}
document.onmousemove = pozycjaMyszki;