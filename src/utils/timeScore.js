import { toSeconds } from "./toSeconds";

export function bestTime(key, value) {
    const bestTime = localStorage.getItem(key); 
    if (!bestTime) {
        localStorage.setItem(key, value); 
    } else {
        if (toSeconds(value) < toSeconds(bestTime)) {
            localStorage.setItem(key, value);
        }
    }
    
}