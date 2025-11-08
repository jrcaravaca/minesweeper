import { shuffle } from "../utils/shuffle";
import { Cell } from "./Cell";

export class Board {
    //Clase tablero, donde ocurre práticamente todo el juego. 
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
        //Generamos un tablero dependiendo el tamaño de tablero que haya elegido el usuario
        this.#configurarGrid(); 
        this.element.innerText = '';
        for (let i = 0; i < (this.size * this.size); i++) {
            const cell = new Cell(); 
            cell.element.classList.add('cell'); 
            this.cells.push(cell)
            this.element.appendChild(cell.element); 
        }
        
        // Aquí recorremos el array con las celdas y cogemos el indice de cada uno, para "barajarlo". 
        let cellIndex = [];
        for (let i = 0; i < this.cells.length; i++) {
            cellIndex.push(i)
        }; 
        shuffle(cellIndex); 

        // Una vez barajado, a los primeros indices se les pone mina, al estar barajado, garantizamos que sea aleatorio. 
        for (let i = 0; i < this.maxMines; i++) {
            let index = cellIndex[i]; 
            this.cells[index].setMine()
            this.cells[index].hasMine = true; 
        }; 
        this.#calculateAdjacentMines(); 
    }; 

    revealAllMines() {
        // Cuando clicamos en una mina, se revelan todas las minas
        this.cells.forEach(cell => {
            if (cell.hasMine) {
                cell.reveal(); 
            }
        })
    }

    #configurarGrid() {
        // Aquí configuramos el grid del tablero.  En función del tamaño elegido por el usuario
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
        // Recorre todas la celdas del tablero y calcula cuantas minas hay alrededor de cada una. 
        // Se obtiene la posición en el tablero (fila / columna) y a partir de su indice en el array de celdas, se recorren las 8 posiciones vecinas posibles usando (filaRelativa y colRelativa)
        // Se comprueba que cada posición vecina esté dentro de los limites del tablero y si alguna de las celdas vecinas tiene una mina, se incrementa el contador de minas de la celda. Así cada celda sabe el número de minas que tiene alrededor para mostrar el número correcto. 
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
        // Efecto cascada. Revela todas las celdas vacias conectadas
        // Obtenemos el indice y las coordenadas de la celda actual
        let index = this.cells.indexOf(cell); 
        let fila = Math.floor(index / this.size); 
        let col = index % this.size

        // Recorremos las 8 posibles vecinas
        for (let i = 0; i < 8; i++) {
            let filaVecina = fila + this.filaRelativa[i]; 
            let colVecina = col + this.colRelativa[i]; 

            // Comprobamos que la celda vecina está dentro de los limites del tablero
            if (filaVecina >= 0 && filaVecina < this.size && colVecina >= 0 && colVecina < this.size) {
                const indexVecina = filaVecina * this.size + colVecina; 
                // Si la celda vecina no ha sido revelada
                if (!this.cells[indexVecina].isRevealed) {
                    //Revelamos la celda y si es válida se incrementa el contador
                    if (this.cells[indexVecina].reveal()) {
                        this.revealedCount += 1; 
                        this.checkWin() // Se comprueba si con esta celda revelada se gana la partida
                    }
                    // Si la celda vecina también está vacia, repetimos el proceso recursivamente
                    if (this.cells[indexVecina].adjacentMines === 0) {
                        this.revealEmptyNeighbors(this.cells[indexVecina]); 
                    }
                } 
            }
        }
    }

    checkWin() {
        // Al revelar una celda, comprobamos si con esta celda ganamos la partida. 
        // La condición de victoria es que tenemos un número fijo de celdas seguras, y un contador, que se incrementa cada vez que revelamos una celda segura, cuando el contador sea igual que el número de celdas seguras, el resto todo son minas y hemos ganado
        if (this.revealedCount === this.safeCells) {
            this.isGameOver = true; 
            return this.isGameOver
        }
    }
    
    reset() {
        // Reseteamos el tablero
        this.element.innerText = "";
    }

    gameDifficulty() {
        // El nivel de dificultad del juego. Dependiendo de lo elegido se generan más o menos celdas con mina. 
        if (this.difficult === 'easy') {
            // Modo fácil 15% de celdas con mina
            return Math.round((this.size * this.size) * 0.15); 
        } else if (this.difficult === 'medium') {
            // Modo medio 25% de celdas con mina
            return Math.round((this.size * this.size) * 0.25); 
        } else if (this.difficult === 'hard') {
            // Mdo dificil 30% de celdas con mina
            return Math.round((this.size * this.size) * 0.30); 
        }
    }
}; 