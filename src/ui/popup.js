import { board, timer } from "../main";

export function popup(tiempo, size, winner = false) {
    const main = document.querySelector('main'); 
    const popup = document.createElement('div'); 
    popup.classList.add('popup','absolute', 'bg-gray-800','flex', 'flex-col', 'items-center', 'justify-center', 'rounded', 'w-[250]', 'h-[250', 'gap-2','p-3'); 
    const popuptitle = document.createElement('h2'); 
    popuptitle.classList.add('text-3xl')
    if (winner) {
        popuptitle.innerText = '¡Has ganado!'; 
    } else {
        popuptitle.innerText = '¡Has perdido!';
    }
    
    const popupText = document.createElement('p'); 
    popupText.innerText = `Tiempo de Juego: ${tiempo}`; 

    const bestTime = document.createElement('p'); 
    let storageTime = localStorage.getItem(size)
    
    if (storageTime === null) {
        bestTime.innerText = `Mejor tiempo: -`
    } else {
        bestTime.innerText = `Mejor tiempo: ${storageTime}`
    }
    

    const restartButton = document.createElement('button');
    restartButton.classList.add('rounded-ml-2', 'bg-gray-700','rounded', 'p-1')
    restartButton.innerText = 'Restart'; 
    restartButton.addEventListener('click', (e) => {
        //pendiente de ver si mejoro esto para que se reinicie con un tablero creado directamente
        e.preventDefault(); 
        board.reset(); 
        timer.stop();
        main.removeChild(popup); 
    }) 

    popup.appendChild(popuptitle)
    popup.appendChild(popupText)
    popup.appendChild(bestTime)
    popup.appendChild(restartButton)
    main.appendChild(popup)
}

