import { shuffle } from "../utils/shuffle";
import { Cell } from "./Cell";

export class Board {
    constructor(size) {
        this.size = size; 
        this.cells = []; 
        this.element = document.getElementById('board'); 
        this.maxMines = (this.size * this.size) * 0.15; 
        this.isGameOver = false; 
        this.filaRelativa = [-1,-1,-1,0,0,1,1,1];
        this.colRelativa = [-1,0,1,-1,1,-1,0,1]; 
    }

    generar(){
        this.#configurarGrid(); 
        this.element.innerText = '';
        for (let i = 0; i < (this.size * this.size); i++) {
            const cell = new Cell(); 
            cell.element.classList.add('cell'); 
            this.cells.push(cell)
            this.element.appendChild(cell.element); 
        }
        
        let cellIndex = [];
        for (let i = 0; i < this.cells.length; i++) {
            cellIndex.push(i)
        }; 
        shuffle(cellIndex); 

        for (let i = 0; i < this.maxMines; i++) {
            let index = cellIndex[i]; 
            this.cells[index].setMine()
            this.cells[index].hasMine = true; 
        }; 
        this.#calculateAdjacentMines(); 
    }; 

    revealAllMines() {
        this.cells.forEach(cell => {
            if (cell.hasMine) {
                cell.reveal(); 
            }
        })
    }

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

    #calculateAdjacentMines(){
        this.cells.forEach(cell => {
            cell.adjacentMines = 0; 
            let index = this.cells.indexOf(cell); 
            let fila = Math.floor(index / this.size); 
            let col = index % this.size

            for (let i = 0; i < 8; i++) {
                let filaVecina = fila + this.filaRelativa[i]; 
                let colVecina = col + this.colRelativa[i]; 

                if (filaVecina >= 0 && filaVecina < this.size && colVecina >= 0 && colVecina < this.size) {
                    const indexVecina = filaVecina * this.size + colVecina; 
                    if (this.cells[indexVecina].hasMine) {
                        cell.adjacentMines += 1; 
                    }
                }

            }
        });
    }

    revealEmptyNeighbors(cell) {
        let index = this.cells.indexOf(cell); 
        let fila = Math.floor(index / this.size); 
        let col = index % this.size

        for (let i = 0; i < 8; i++) {
            let filaVecina = fila + this.filaRelativa[i]; 
            let colVecina = col + this.colRelativa[i]; 

            if (filaVecina >= 0 && filaVecina < this.size && colVecina >= 0 && colVecina < this.size) {
                const indexVecina = filaVecina * this.size + colVecina; 
                if (!this.cells[indexVecina].isRevealed) {
                    this.cells[indexVecina].reveal(); 
                    if (this.cells[indexVecina].adjacentMines === 0) {
                        this.revealEmptyNeighbors(this.cells[indexVecina]); 
                    }
                } 
            }
        }
    }
}; 