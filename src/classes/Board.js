import { shuffle } from "../utils/shuffle";
import { Cell } from "./Cell";

export class Board {
    constructor(size) {
        this.size = size; 
        this.cells = []; 
        this.element = document.getElementById('board'); 
        this.totalMines = 0; 
        this.maxMines = 10; 
    }

    generar(){
        this.#configurarGrid(); 
        this.element.innerText = '';
        for (let i = 0; i < (this.size * this.size); i++) {
            const cell = new Cell(); 
            cell.element.classList.add('cell'); 
            this.cells.push(cell)
            this.element.appendChild(cell); 
        }
        
        let cellIndex = [];
        for (let i = 0; i < this.cells.length; i++) {
            cellIndex.push(i)
        }; 
        shuffle(cellIndex); 

        for (let i = 0; i < this.maxMines; i++) {
            let index = cellIndex[i]; 
            this.cells[index].setMine()
        }; 
    }; 

    #configurarGrid() {
        if (this.element.classList.contains('grid-cols-8')) {
            this.element.classList.replace('grid-cols-8', `grid-cols-${this.size}`)
        } else if (this.element.classList.contains('grid-cols-16')){
            this.element.classList.replace('grid-cols-16', `grid-cols-${this.size}`)
        } else if (this.element.classList.contains('grid-cols-32')) {
            this.element.classList.replace('grid-cols-32', `grid-cols-${this.size}`)
        } else {
            this.element.classList.add(`grid-cols-${this.size}`)
        }; 
    }
}; 