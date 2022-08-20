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

export function getBSTHighScore() {
    return localStorage.getItem("classicMode") || "";
}


export function setBSTHighScore(score: number) {
    localStorage.setItem("classicMode", JSON.stringify(score));
    return
}

export function getBSTHardHighScore() {
    return localStorage.getItem("hardMode") || "";
}

export function setBSTHardHighScore(score: number) {
    localStorage.setItem("hardMode", JSON.stringify(score));
    return;
}

export function getOneStatHighScore() {
    return localStorage.getItem("oneStat") || "";
}

export function setOneStatHighScore(score: number) {
    localStorage.setItem("oneStat", JSON.stringify(score))
    return;
}

export function getOneStatHardModeHighScore() {
    return localStorage.getItem("oneStatHard") || "";
}

export function setOneStatHardModeHighScore(score: number) {
    localStorage.setItem("oneStatHard", JSON.stringify(score));
    return;
}