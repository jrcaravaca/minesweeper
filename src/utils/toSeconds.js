export function toSeconds(time) {
    // Función que coge el tiempo formateado, y lo pasa a segundos, útil para guardar el mejor tiempo
    const [hours, minutes, seconds] = time.split(':').map(Number); 
    return hours * 3600 + minutes + 60 + seconds; 
}