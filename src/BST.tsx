/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactGA from "react-ga";
import * as helpers from "./utils/helpers";
import pokemon from "./utils/csvjson.json";
import { CharacterImage } from "./components/CharacterImage";
import EndScreen from "./components/EndScreen";

function BST() {
    const [searchParams, _] = useSearchParams();
    const hardMode = searchParams.get("timer") || "false";
    const includeLegendaries = searchParams.get("legendaries");

    const [currentScore, setCurrentScore] = useState(0);
    const [timerClock, setTimerClock] = useState(5);
    const [showBST, setShowBST] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [pok1, setPok1] = useState<{
        id: number;
        name: string;
        altForm: string;
        type1: string;
        type2: string;
        bst: number;
        ability: string;
        ability2: string;
        hiddenAbility: string;
        generation: string;
        egg: string;
        egg2: string;
    }>({
        id: 0,
        name: "",
        altForm: "",
        type1: "",
        type2: "",
        bst: 0,
        ability: "",
        ability2: "",
        hiddenAbility: "",
        generation: "",
        egg: "",
        egg2: ""
    });
    const [pok2, setPok2] = useState<{
        id: number;
        name: string;
        altForm: string;
        type1: string;
        type2: string;
        bst: number;
        ability: string;
        ability2: string;
        hiddenAbility: string;
        generation: string;
        egg: string;
        egg2: string;
    }>({
        id: 0,
        name: "",
        altForm: "",
        type1: "",
        type2: "",
        bst: 0,
        ability: "",
        ability2: "",
        hiddenAbility: "",
        generation: "",
        egg: "",
        egg2: ""
    });

    const start = () => {
        // Sets up a new game
        setShowBST(false);
        setTimerClock(5);
        setCurrentScore(0);
        setGameOver(false);
        let poke1 = pokemon[helpers.getRandomArbitrary(0, 960)]
        if (includeLegendaries === "false") {
            // Prevents it from pickign a legendary
            while (poke1.legendary !== "NULL") poke1 = pokemon[helpers.getRandomArbitrary(0, 960)];
        }
        setPok1(poke1);
        let poke2 = pokemon[helpers.getRandomArbitrary(0, 960)]
        while (poke2.id === poke1.id) poke2 = pokemon[helpers.getRandomArbitrary(1, 902)] // avoids having the two be equal
        if (includeLegendaries === "false") {
            // Prevents it from pickign a legendary
            while (poke2.legendary!== "NULL") poke2 = pokemon[helpers.getRandomArbitrary(0, 960)];
        }
        setPok2(poke2);
    }

    const generate = () => {
        // Randomly selects one of the two options and finds new pokemon
        setShowBST(false);
        const coinFlip = Math.random();
        if (coinFlip < 0.5) {
            let poke1 = pokemon[helpers.getRandomArbitrary(0, 960)]
            while (pok1.id === pok2.id) poke1 = pokemon[helpers.getRandomArbitrary(0, 960)];
            if (includeLegendaries === "false") {
                // Prevents it from pickign a legendary
                while (poke1.legendary!== "NULL") poke1 = pokemon[helpers.getRandomArbitrary(0, 960)];
            }
            setPok1(poke1);
        } else {
            let poke2 = pokemon[helpers.getRandomArbitrary(0, 960)]
            while (pok2.id === pok1.id) poke2 = pokemon[helpers.getRandomArbitrary(0, 960)] // avoids having the two be equal
            if (includeLegendaries === "false") {
                // Prevents it from pickign a legendary
                while (poke2.legendary!== "NULL") poke2 = pokemon[helpers.getRandomArbitrary(0, 960)];
            }
            setPok2(poke2);    
        }
    }

    const compare = async (select1:boolean) => {
        // Compares user selected option with other to see if BST is higher. Ends game if strictly less
        const userChoice = select1? pok1 : pok2;
        const other = select1? pok2: pok1;
        setShowBST(true);
        await helpers.sleep(1000);
        if (userChoice.bst < other.bst) {
            endGame();
            return;
        } else {
            if (hardMode === "true") setTimerClock(5);
            setCurrentScore(currentScore + 1);
            generate();
        }
    }

    const endGame = () => {
        const currScore = currentScore;
        if (hardMode === "true") {
            const best = helpers.getBSTHardHighScore();
            if (!best || parseInt(best) < currScore) helpers.setBSTHardHighScore(currScore);
        } else {
            const best = helpers.getBSTHighScore();
            if (!best || parseInt(best) < currScore) helpers.setBSTHighScore(currScore)
        }
        setGameOver(true);
    }

    useEffect(() => { // onLoad
        start();
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    useEffect(() => { // Timer for hard mode
        if (gameOver || hardMode === "false") {
            return
        }
        if (timerClock < 0) {
            endGame();
            return;
        }
        const timer = setInterval(function() {
            setTimerClock(timerClock - 1);
        }, 1000)
    
        return () => { // this runs as the clean up function for the useEffect
           clearInterval(timer)
        }
       }, [timerClock]);

    if (gameOver) { //Game Over screen
        return (
            <EndScreen currentScore={currentScore} hardMode={hardMode} start={start} oneStat={false}/>
        )
    }

    return(
        <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: "url(detective-pikachu.png)"}}>
            <div className={`${hardMode === "true" ? 'opacity-100': 'opacity-0'} fixed top-5 right-5 z-20 font-press-start font-extrabold text-white text-lg`}>
                {timerClock}s
            </div>
            <div className="absolute flex flex-col md:flex-row justify-around md:justify-center h-screen w-screen items-center">
                <CharacterImage dexName={pok1.name} dexBST={pok1.bst} showBST={showBST} isPok1={true} selectPokemon={compare}/>
                <div className="absolute text-white text-lg h-auto flex items-center justify-center z-10">
                    <div className="z-10 h-16 w-16 flex justify-center items-center font-extrabold font-press-start">
                        {currentScore}
                    </div>
                    <img alt="Pokeball" src="/pokeball.png" className="h-16 w-16 absolute"/>
                </div>
                <CharacterImage dexName={pok2.name} dexBST={pok2.bst} showBST={showBST} isPok1={false} selectPokemon={compare}/>
            </div>
        </div>
    )
}

export default BST;