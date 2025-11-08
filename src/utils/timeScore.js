import { toSeconds } from "./toSeconds";

export function bestTime(key, value) {
    // Función guarda el mejor tiempo en LocalStorage
    const bestTime = localStorage.getItem(key); 
    if (!bestTime) {
        localStorage.setItem(key, value); 
    } else {
        if (toSeconds(value) < toSeconds(bestTime.time)) {
            localStorage.setItem(key, value);
        }
    }
    
}