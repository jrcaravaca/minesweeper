import './style.css'
import { Board } from './classes/Board';
import { Timer } from './classes/Timer';
import { popup } from './ui/popup';
import { bestTime } from './utils/timeScore';

const startButton = document.getElementById('start'); 
const resetButton = document.getElementById('reset');
resetButton.disabled = true; 
const boardSize = document.getElementById('board-size'); 
const difficult = document.getElementById('difficult')
const time = document.getElementById('time'); 
export const timer = new Timer(time); 
export let board; 



startButton.addEventListener('click', e => {
    let size = boardSize.value; 
    let gameDifficulty = difficult.value;  
    e.preventDefault(); 
    board = new Board(size, gameDifficulty);
    board.generar()
    timer.start(); 
    
    
    board.cells.forEach(cell => {
        // Evento click izquierdo
        cell.element.addEventListener('click', () => {
            
            if (board.isGameOver) return; 
            if (cell.hasFlag) return;

            if (cell.hasMine) {
                board.revealAllMines(); 
                setTimeout(() => {
                    popup(time.innerText,size)
                    timer.pause();
                }, 500); 
                board.isGameOver = true; 
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
            e.preventDefault()
            if (cell.isRevealed) return; 
            cell.toggleFlag()
        })

    })

    startButton.disabled = true; 
    boardSize.disabled = true; 
    resetButton.disabled = false; 
})

resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    timer.stop(); 
    board.reset()
    startButton.disabled = false; 
    boardSize.disabled = false; 
});

