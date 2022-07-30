export function getRandomArbitrary(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


////////////////////////////////////////
//Helper Functions for high score tracking
///////////////////////////////////////

export function getClassicHighScore() {
    return localStorage.getItem("classicMode") || "";
}


export function setClassicHighScore(score: number) {
    localStorage.setItem("classicMode", JSON.stringify(score));
    return
}

export function getHardHighScore() {
    return localStorage.getItem("hardMode") || "";
}

export function setHardHighScore(score: number) {
    localStorage.setItem("hardMode", JSON.stringify(score));
    return;
}