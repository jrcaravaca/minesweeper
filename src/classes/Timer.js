export class Timer {
    constructor(element) {
        this.seconds = 0; 
        this.mins = 0; 
        this.hours = 0; 
        this.startTimer = ""; 
        this.element = element; 
    }

    timer() {
        this.seconds +=1; 
        if (this.seconds === 60) {
            this.mins +=1; 
            this.seconds = 0; 
            if (this.mins === 60) {
                this.hours += 1; 
                this.mins = 0; 
                this.seconds = 0; 
            }
        }
    }

    start() {
        this.startTimer = setInterval(() => {
            this.timer(); 
            this.paintTimer(); 
        }, 1000); 
        
    }

    pause() {
        clearInterval(this.startTimer);
    }

    stop() {
        clearInterval(this.startTimer); 
        this.seconds = 0; 
        this.mins = 0; 
        this.hours = 0; 
    }

    paintTimer() {
        let h = String(this.hours).padStart(2, '0'); 
        let m = String(this.mins).padStart(2, '0'); 
        let s = String(this.seconds).padStart(2, '0');

        
        this.element.innerText = `${h}:${m}:${s}`; 

    }
}