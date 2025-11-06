import { shuffle } from "../utils/shuffle";
import { Cell } from "./Cell";

export class Board {
    constructor(size, difficult) {
        this.size = size; 
        this.difficult = difficult; 
        this.cells = []; 
        this.element = document.getElementById('board'); 
        this.maxMines = this.gameDifficulty()
        this.isGameOver = false; 
        this.filaRelativa = [-1,-1,-1,0,0,1,1,1];
        this.colRelativa = [-1,0,1,-1,1,-1,0,1]; 
        this.safeCells = (this.size * this.size) - this.maxMines; 
        this.revealedCount = 0; 
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
                    if (this.cells[indexVecina].reveal()) {
                        this.revealedCount += 1; 
                        this.checkWin()
                    }
                    if (this.cells[indexVecina].adjacentMines === 0) {
                        this.revealEmptyNeighbors(this.cells[indexVecina]); 
                    }
                } 
            }
        }
    }

    checkWin() {
        if (this.revealedCount === this.safeCells) {
            this.isGameOver = true; 
            return this.isGameOver
        }
    }
    
    reset() {
        this.element.innerText = "";
    }

    gameDifficulty() {
        if (this.difficult === 'easy') {
            return Math.round((this.size * this.size) * 0.15); 
        } else if (this.difficult === 'medium') {
            return Math.round((this.size * this.size) * 0.25); 
        } else if (this.difficult === 'hard') {
            return Math.round((this.size * this.size) * 0.30); 
        }
    }
}; 