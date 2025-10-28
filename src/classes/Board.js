export class Board {
    constructor(size) {
        this.size = size; 
        this.celdas = []; 
        this.element = document.getElementById('board'); 
    }

    generar(){
        this.#configurarGrid(); 
        this.element.innerText = '';
        for (let i = 0; i < (this.size * this.size); i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell'); 
            this.celdas.push(cell)
            this.element.appendChild(cell); 
        }
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
}; 