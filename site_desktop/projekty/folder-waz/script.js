/**
 * Gra w węża z dwoma trybami trudności (Easy i Hard).
 * 
 * W trybie Easy wąż rośnie, zbierając jedzenie, a gra kończy się przy kolizji ze ścianą lub przeciwnikiem.
 * W trybie Hard dodatkowo przeciwnicy zmieniają swoje pozycje co jakiś czas.
 * 
 * @author Antoni
 * @version 1.0
 */

let myGamePiece; // Obiekt reprezentujący główną część węża
let kierunek = 'right'; // Początkowy kierunek ruchu
let gameInterval; // Zmienna przechowująca interwał gry
let score = 0; // Wynik gracza
let food; // Obiekt jedzenia
let dangerPoints = []; // Tablica przechowująca punkty niebezpieczne
let snakeBody = []; // Tablica reprezentująca ciało węża
let dangerCount = 1; // Początkowa liczba punktów niebezpiecznych


//STEROWANIE
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            if (kierunek !== 'right') {
                myGamePiece.speedX = -4;
                myGamePiece.speedY = 0;
                kierunek = 'left';
            }
            break;
        case 38:
            if (kierunek !== 'down') {
                myGamePiece.speedX = 0;
                myGamePiece.speedY = -4;
                kierunek = 'up';
            }
            break;
        case 39:
            if (kierunek !== 'left') {
                myGamePiece.speedX = 4;
                myGamePiece.speedY = 0;
                kierunek = 'right';
            }
            break;
        case 40:
            if (kierunek !== 'up') {
                myGamePiece.speedX = 0;
                myGamePiece.speedY = 4;
                kierunek = 'down';
            }
            break;
    }
};

// ANIMACJE
document.addEventListener('DOMContentLoaded', () => {
    const startButtonEasy = document.getElementById('startButtonEasy');
    startButtonEasy.addEventListener('click', function () {
        startButtonHard.style.display = "none";
        this.classList.add('start-animation');
        this.addEventListener('animationend', () => {
            startGameEasy();
        }, { once: true });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const startButtonHard = document.getElementById('startButtonHard');
    startButtonHard.addEventListener('click', function () {
        startButtonEasy.style.display = "none";
        this.classList.add('start-animation');
        this.addEventListener('animationend', () => {
            startGameHard();
        }, { once: true });
    });
});

            // ↓ EASY MODE  ↓ //

function startGameEasy() {
    // SETUP
    const startButtonEasy = document.getElementById("startButtonEasy");
    startButtonEasy.style.display = "none";

    myGamePiece = { x: 10, y: 210, width: 40, height: 40, speedX: 4, speedY: 0, color: "green" };
    food = createFood();
    createDangerPoints();

    let canvas = document.createElement("canvas");
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    canvas.width = 500;
    canvas.height = 500;
    let ctx = canvas.getContext("2d");


    // GIERKA
    gameInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // KOLIZJA ZE ŚCIANĄ
        if (myGamePiece.x < 0 || myGamePiece.x + myGamePiece.width > canvas.width || myGamePiece.y < 0 || myGamePiece.y + myGamePiece.height > canvas.height) {
            koniecGry();
        } else {
            // RUCH
            myGamePiece.x += myGamePiece.speedX;
            myGamePiece.y += myGamePiece.speedY;

            snakeBody.push({ x: myGamePiece.x, y: myGamePiece.y, width: myGamePiece.width, height: myGamePiece.height });
            if (snakeBody.length > 1) {
                snakeBody.shift();
            }

            // Rysowanie ciała węża
            for (let i = 0; i < snakeBody.length; i++) {
                ctx.fillStyle = myGamePiece.color;
                ctx.fillRect(snakeBody[i].x, snakeBody[i].y, snakeBody[i].width, snakeBody[i].height);
            }

            // Rysowanie jedzenia
            ctx.fillStyle = "green";
            ctx.fillRect(food.x, food.y, food.width, food.height);

            // Rysowanie punktów niebezpiecznych
            ctx.fillStyle = "red";
            for (let i = 0; i < dangerPoints.length; i++) {
                ctx.fillRect(dangerPoints[i].x, dangerPoints[i].y, dangerPoints[i].width, dangerPoints[i].height);
            }

            // JEDZENIE ... JEDZENIA
            if (myGamePiece.x < food.x + food.width &&
                myGamePiece.x + myGamePiece.width > food.x &&
                myGamePiece.y < food.y + food.height &&
                myGamePiece.y + myGamePiece.height > food.y) {
                increaseScore();
                food = createFood();
            }

            // KOLIZJA Z WROGIEM
            for (let i = 0; i < dangerPoints.length; i++) {
                if (myGamePiece.x < dangerPoints[i].x + dangerPoints[i].width &&
                    myGamePiece.x + myGamePiece.width > dangerPoints[i].x &&
                    myGamePiece.y < dangerPoints[i].y + dangerPoints[i].height &&
                    myGamePiece.y + myGamePiece.height > dangerPoints[i].y) {
                    koniecGry();
                }
            }

            // WYNIKI
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("Gruziki: " + score, 10, 20);
        }
    }, 20);

    //WIĘCEJ WROGÓW
    function increaseScore() {
        score += 1;
        createDangerPoints();
    }

    // TWORZENIE JEDZENIA (w losowym miejscu)
    function createFood() {
        let foodX = Math.floor(Math.random() * (500 / 40)) * 40;
        let foodY = Math.floor(Math.random() * (500 / 40)) * 40;
        return { x: foodX, y: foodY, width: 20, height: 20 };
    }

    // TWORZENIE WROGA (w losowym miejscu)
    function createDangerPoints() {
        for (let i = 0; i < dangerCount; i++) {
            let validPosition = false;
            let dangerX, dangerY;

            // SPRAWDZANIE CZY MOŻE SIĘ TAM ZRESPIĆ
            while (!validPosition) {
                dangerX = Math.floor(Math.random() * (500 / 40)) * 40;
                dangerY = Math.floor(Math.random() * (500 / 40)) * 40;

                const isOnPlayer = dangerX < myGamePiece.x + myGamePiece.width &&
                                dangerX + 20 > myGamePiece.x &&
                                dangerY < myGamePiece.y + myGamePiece.height &&
                                dangerY + 20 > myGamePiece.y;

                const isOnFood = dangerX < food.x + food.width &&
                                dangerX + 20 > food.x &&
                                dangerY < food.y + food.height &&
                                dangerY + 20 > food.y;

                if (!isOnPlayer && !isOnFood) {
                    validPosition = true;
                }
            }
            dangerPoints.push({ x: dangerX, y: dangerY, width: 20, height: 20 });
        }
    }
}

            // ↓ HARD MODE  ↓ //

function startGameHard() {
    //SETUP
    const startButtonHard = document.getElementById("startButtonHard");
    startButtonHard.style.display = "none";

    myGamePiece = { x: 10, y: 210, width: 40, height: 40, speedX: 4, speedY: 0, color: "green" };
    food = createFood();
    createDangerPoints();

    let canvas = document.createElement("canvas");
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    canvas.width = 500;
    canvas.height = 500;
    let ctx = canvas.getContext("2d");

    // GIERKA
    gameInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // KOLIZJA ZE ŚCIANĄ
        if (myGamePiece.x < 0 || myGamePiece.x + myGamePiece.width > canvas.width || myGamePiece.y < 0 || myGamePiece.y + myGamePiece.height > canvas.height) {
            koniecGry();
        } else {
            // RUCH
            myGamePiece.x += myGamePiece.speedX;
            myGamePiece.y += myGamePiece.speedY;

            snakeBody.push({ x: myGamePiece.x, y: myGamePiece.y, width: myGamePiece.width, height: myGamePiece.height });
            if (snakeBody.length > 1) {
                snakeBody.shift();
            }

            // Rysowanie ciała węża
            for (let i = 0; i < snakeBody.length; i++) {
                ctx.fillStyle = myGamePiece.color;
                ctx.fillRect(snakeBody[i].x, snakeBody[i].y, snakeBody[i].width, snakeBody[i].height);
            }

            // Rysowanie jedzenia
            ctx.fillStyle = "green";
            ctx.fillRect(food.x, food.y, food.width, food.height);

            // Rysowanie punktów niebezpiecznych
            ctx.fillStyle = "red";
            for (let i = 0; i < dangerPoints.length; i++) {
                ctx.fillRect(dangerPoints[i].x, dangerPoints[i].y, dangerPoints[i].width, dangerPoints[i].height);
            }

            // JEDZENIE ... JEDZENIA
            if (myGamePiece.x < food.x + food.width &&
                myGamePiece.x + myGamePiece.width > food.x &&
                myGamePiece.y < food.y + food.height &&
                myGamePiece.y + myGamePiece.height > food.y) {
                increaseScore();
                food = createFood();
            }

            // KOLIZJA Z WROGIEM
            for (let i = 0; i < dangerPoints.length; i++) {
                if (myGamePiece.x < dangerPoints[i].x + dangerPoints[i].width &&
                    myGamePiece.x + myGamePiece.width > dangerPoints[i].x &&
                    myGamePiece.y < dangerPoints[i].y + dangerPoints[i].height &&
                    myGamePiece.y + myGamePiece.height > dangerPoints[i].y) {
                    koniecGry();
                }
            }

            // WYNIKI
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("Gruziki: " + score, 10, 20);
        }
    }, 20);
    
    // COOLDOWN OPONENTÓW
    setInterval(() => {
        changeDangerPointsPosition();
    }, 1500);


    //WIĘCEJ WROGÓW
    function increaseScore() {
        score += 1;
        if (score % 3 === 0) {
            dangerCount++;
            createDangerPoints();
        }
    }
    // TWORZENIE JEDZENIA (w losowym miejscu)
    function createFood() {
        let foodX = Math.floor(Math.random() * (500 / 40)) * 40;
        let foodY = Math.floor(Math.random() * (500 / 40)) * 40;
        return { x: foodX, y: foodY, width: 20, height: 20 };
    }

    // TWORZENIE WROGA (w losowym miejscu)
    function createDangerPoints() {
        for (let i = 0; i < dangerCount; i++) {
            let validPosition = false;
            let dangerX, dangerY;

            // SPRAWDZANIE CZY MOŻE SIĘ TAM ZRESPIĆ
            while (!validPosition) {
                dangerX = Math.floor(Math.random() * (500 / 40)) * 40;
                dangerY = Math.floor(Math.random() * (500 / 40)) * 40;

                const isOnPlayer = dangerX < myGamePiece.x + myGamePiece.width &&
                                dangerX + 20 > myGamePiece.x &&
                                dangerY < myGamePiece.y + myGamePiece.height &&
                                dangerY + 20 > myGamePiece.y;

                const isOnFood = dangerX < food.x + food.width &&
                                dangerX + 20 > food.x &&
                                dangerY < food.y + food.height &&
                                dangerY + 20 > food.y;

                if (!isOnPlayer && !isOnFood) {
                    validPosition = true;
                }
            }
            dangerPoints.push({ x: dangerX, y: dangerY, width: 20, height: 20 });
        }
    }

    // ZMIANA POZYCJI OPONENTA
    function changeDangerPointsPosition() {
        for (let i = 0; i < dangerPoints.length; i++) {
            dangerPoints[i].x = Math.floor(Math.random() * (500 / 40)) * 40; 
            dangerPoints[i].y = Math.floor(Math.random() * (500 / 40)) * 40; 
        }
    }
}

//GAME OVER
function koniecGry() {
    clearInterval(gameInterval);
    alert("Koniec gry! Masz " + score + (score === 1 ? " gruzikopunkt" : score < 5 ? " gruzikopunkty" : " gruzikopunktów"));
}