export class Cell {
    //Clase celda, donde cada celda es responsable de sí misma. Sirve para tener controlado, la revelación de cada celda, si tiene mina o no y para ponder banderas. 
    constructor() {
        this.element = document.createElement('div'); 
        this.hasMine = false; 
        this.hasFlag = false; 
        this.isRevealed = false; 
        this.adjacentMines = 0; 

    }

    setMine() {
        this.hasMine = true; 
        this.element.dataset.mine = true; 
        this.element.classList.add('mine')
    }

    reveal(){
        if (this.isRevealed) return false;
        this.element.classList.add("revealed");
        this.isRevealed = true;
        if (this.adjacentMines > 0 && !this.hasMine) {
            this.element.innerText = `${this.adjacentMines}`
        }
        return !this.hasMine
    }

    toggleFlag() {
        if (!this.hasFlag) {
            this.element.classList.add('flag'); 
            this.hasFlag = true; 
        } else {
            this.element.classList.remove('flag'); 
            this.hasFlag = false; 
        }
    }
}