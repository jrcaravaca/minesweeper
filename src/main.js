import './style.css'
import { Board } from './classes/Board';
import { Timer } from './classes/Timer';
import { popup } from './ui/popup';
import { bestTime } from './utils/timeScore';

// VARIABLES
const startButton = document.getElementById('start'); 
const resetButton = document.getElementById('reset');
resetButton.disabled = true; 
const boardSize = document.getElementById('board-size'); 
const difficult = document.getElementById('difficult')
const time = document.getElementById('time'); 
export const timer = new Timer(time); 
export let board; 


// LISTENER PRINCIPAL
startButton.addEventListener('click', e => {
    let size = boardSize.value; 
    let gameDifficulty = difficult.value;  
    e.preventDefault(); 
    board = new Board(size, gameDifficulty);
    if (window.innerWidth < 800 && size >= 32) {
        // LIMITANDO EL TAMAÑO DE TABLERO EN DISPOSITIVOS MOVILES, ES INJUGABLE
        const table = document.getElementById('board'); 
        table.innerText = 'Ese tamaño de tablero solo está disponible en pantallas grandes'
    } else {
        board.generar(); 
    }
    timer.start(); 
    
    
    board.cells.forEach(cell => {
        // Evento click izquierdo
        cell.element.addEventListener('click', () => {
            // Comprobamos si ya esta el juego finalizado, esto es para que una vez que salte el popup de juego finalizado
            // No se pueda clicar en las celdas.
            if (board.isGameOver) return; 
            // Igualmente si una celda tiene bandera, no salta el listener. Para evitar missclicks
            if (cell.hasFlag) return;

            // Si la celda tiene una mina, se revelan todas, con un pequeño timeout para que de tiempo al jugador a ver 
            // la posición de todas las minas
            if (cell.hasMine) {
                board.revealAllMines(); 
                setTimeout(() => {
                    popup(time.innerText,(size + gameDifficulty))
                    timer.pause();
                    resetButton.disabled = true; 
                }, 500); 
                board.isGameOver = true; 
            // Si la celda, no tiene minas adjacentes se revela, se suma al contador de celdas reveladas y se comprueba
            // si se ha ganado la partida, además se revelan las celdas vecinas en cascada hasta que alguna tenga una mina
            // cerca
            } else if (cell.adjacentMines === 0) {
                if (cell.reveal()) {
                    board.revealedCount +=1; 
                    if (board.checkWin()) {
                        popup(time.innerText,size,true)
                        timer.pause()
                        bestTime((size+gameDifficulty), time.innerText)
                    }
                }
                board.revealEmptyNeighbors(cell)
                if (board.checkWin()) {
                    popup(time.innerText, size,true); 
                    timer.pause()
                    bestTime((size+gameDifficulty), time.innerText)
                }
            } else {
                // Si la celda es segúra pero tiene minas cerca, únicamente se revela, y se comprueba si con ella se gana
                // la partida
                if (cell.reveal()) {
                    board.revealedCount += 1
                    if (board.checkWin()) {
                        popup(time.innerText, size, true)
                        timer.pause()
                        bestTime((size+gameDifficulty), time.innerText)
                    }
                }
                
            }
        }); 

        //Evento click derecho
        cell.element.addEventListener('contextmenu', (e) => {
            // En este evento. ponemos bandera a una celda al hacer clic derecho en ella, en el caso de que 
            // la celda ya esté revelada, no hacemos nada
            e.preventDefault()
            if (cell.isRevealed) return; 
            cell.toggleFlag()
        })

    })

    // DESACTIVAMOS LOS INPUTS Y EL BOTON DE GENERAR CUANDO HAY UN TABLERO ACTIVO
    startButton.disabled = true; 
    boardSize.disabled = true; 
    // EL BOTÓN DE RESET SE ACTIVA
    resetButton.disabled = false; 
})

// LISTENER DEL BOTON DE RESET. 
resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    timer.stop(); 
    board.reset()
    startButton.disabled = false; 
    boardSize.disabled = false; 
});

