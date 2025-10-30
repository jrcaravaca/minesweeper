export class Cell {
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
        this.element.classList.add("revealed");
        if (this.adjacentMines > 0 && !this.hasMine) {
            this.element.innerText = `${this.adjacentMines}`
        }
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