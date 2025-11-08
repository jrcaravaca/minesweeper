import { board, timer } from "../main";

//
export function popup(tiempo, size, winner = false) {
    // Ventana emergente para cuando se gana / pierde

    const main = document.querySelector('main'); 
    const popup = document.createElement('div'); 
    popup.classList.add('popup','absolute','top-40', 'left-20', '2xl:top-100','2xl:left-180','xl:left-110', 'md:left-70','lg:left-100','lg:top-100','bg-gray-800','flex', 'flex-col', 'items-center', 'justify-center', 'rounded', 'xl:w-[500px]','gap-2','p-3',); 
    const popuptitle = document.createElement('h2'); 
    popuptitle.classList.add('text-3xl')
    // Dependiendo del si ganamos o perdemos se muestra un mensaje diferente
    if (winner) {
        popuptitle.innerText = '¡Has ganado!'; 
    } else {
        popuptitle.innerText = '¡Has perdido!';
    }
    
    // Tiempo de juego actual
    const popupText = document.createElement('p'); 
    popupText.innerText = `Tiempo de Juego: ${tiempo}`; 

    // Mejor tiempo, sacado de localstorage
    const bestTime = document.createElement('p'); 
    let storageTime = localStorage.getItem(size)
   
    if (storageTime === null) {
        bestTime.innerText = `Mejor tiempo: -`
    } else {
        bestTime.innerText = `Mejor tiempo: ${storageTime}`
    }
    
    //Botón de reiniciar
    const restartButton = document.createElement('button');
    restartButton.classList.add('rounded-ml-2', 'bg-gray-700','rounded', 'p-1')
    restartButton.innerText = 'Restart'; 
    restartButton.addEventListener('click', (e) => {
        //Cuando se decide reiniciar, se hace location.reload(), no se si es lo más eficiente o correcto, pero soluciona el problema que tenía a la hora de reiniciar el juego y reactivar todos los botones y listeners. Al ser un proyecto "sencillo" que no requiere mucha carga de memoria, no debe generar ralentizaciones extrañas ni exagerar los tiempos de carga. 
        e.preventDefault(); 
        location.reload(); 
    }) 

    popup.appendChild(popuptitle)
    popup.appendChild(popupText)
    popup.appendChild(bestTime)
    popup.appendChild(restartButton)
    main.appendChild(popup)
}

