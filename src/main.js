import './style.css'
import { Board } from './classes/Board';
import { Timer } from './classes/Timer';

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
        /// TENGO QUE CORREGIR ESTO TRABAJO PARA MAÑANA
        cell.element.addEventListener('click', () => {
            if (board.isGameOver) return; 
            if (cell.hasFlag) return;

            if (cell.hasMine) {
                board.revealAllMines(); 
                setTimeout(() => {
                    alert("¡Has perdido!");
                    timer.pause();
                }, 500); 
                board.isGameOver = true; 
            } else if (cell.adjacentMines === 0) {
                board.revealEmptyNeighbors(cell)
            } else {
                cell.reveal(); 
                if (cell.reveal()) {
                    board.revealedCount += 1
                    board.checkWin(); 
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

