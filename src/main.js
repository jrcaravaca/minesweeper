import './style.css'
import { Board } from './classes/Board';

const button = document.querySelector('button'); 
const select = document.getElementById('board-size'); 

button.addEventListener('click', e => {
    let size = select.value; 
    e.preventDefault(); 
    const board = new Board(size);
    board.generar()
})
