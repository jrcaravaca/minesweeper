import './style.css'
import { Board } from './classes/Board';
import { Timer } from './classes/Timer';
import { popup } from './ui/popup';

const button = document.querySelector('button'); 
const select = document.getElementById('board-size'); 
const time = document.getElementById('time'); 
const timer = new Timer(time); 



button.addEventListener('click', e => {
    let size = select.value; 
    e.preventDefault(); 
    const board = new Board(size);
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
                    popup(time.innerText)
                    timer.pause();
                }, 500); 
                board.isGameOver = true; 
            } else if (cell.adjacentMines === 0) {
                if (cell.reveal()) {
                    board.revealedCount +=1; 
                    if (board.checkWin()) {
                        popup(time.innerText, true)
                        timer.pause()
                    }
                }
                board.revealEmptyNeighbors(cell)
                if (board.checkWin()) {
                    popup(time.innerText); 
                    timer.pause()
                }
            } else {
                if (cell.reveal()) {
                    board.revealedCount += 1
                    if (board.checkWin()) {
                        popup(time.innerText, true)
                        timer.pause()
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
})

