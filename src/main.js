import './style.css'
import { Board } from './classes/Board';

const button = document.querySelector('button'); 
const select = document.getElementById('board-size'); 
const tableBoard = document.getElementById('board')



button.addEventListener('click', e => {
    let size = select.value; 
    e.preventDefault(); 
    const board = new Board(size);
    board.generar()
    
    board.cells.forEach(cell => {
        cell.element.addEventListener('click', () => {
            if (board.isGameOver) return; 

            if (cell.hasMine) {
                board.revealAllMines(); 
                setTimeout(() => {
                    alert("¡Has perdido!")
                }, 500)
                board.isGameOver = true; 
            } else {
                cell.reveal(); 
            }
        }); 

    })
})

