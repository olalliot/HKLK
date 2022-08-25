/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactGA from 'react-ga';
import EndScreen from "./components/EndScreen";
import pokemon from "./utils/csvjson.json";
import * as helpers from "./utils/helpers";
import { CharacterImage } from "./components/CharacterImage";

function OneStat() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams();
    const hardMode = searchParams.get("timer") || "false";
    const includeLegendaries = searchParams.get("legendaries");

    const [currentScore, setCurrentScore] = useState(0);
    const [timerClock, setTimerClock] = useState(5);
    const [showStat, setShowStat] = useState(false);
    const [selectedStat, setSelectedStat] = useState("attack");
    const [gameOver, setGameOver] = useState(false);
    const [pok1, setPok1] = useState<{
        id: number;
        name: string;
        altForm: string;
        type1: string;
        type2: string;
        attack: number;
        defense: number;
        speAttack: number;
        speDefense: number;
        speed: number;
        health: number;
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
        attack: 0,
        defense: 0,
        speAttack: 0,
        speDefense: 0,
        speed: 0,
        health: 0,
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
        attack: number;
        defense: number;
        speAttack: number;
        speDefense: number;
        speed: number;
        health: number;
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
        attack: 0,
        defense: 0,
        speAttack: 0,
        speDefense: 0,
        speed: 0,
        health: 0,
        ability: "",
        ability2: "",
        hiddenAbility: "",
        generation: "",
        egg: "",
        egg2: ""
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        start();
    }, []);

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

    const start = () => {
        // Sets up a new game
        setShowStat(false);
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
        pickStat();
    }

    const pickStat = () => {
        const stat = helpers.getRandomArbitrary(0, 6);
        if (stat === 0) setSelectedStat("HP");
        else if (stat === 1) setSelectedStat("attack");
        else if (stat === 2) setSelectedStat("defense")
        else if (stat === 3) setSelectedStat("speAttack")
        else if (stat === 4) setSelectedStat("speDefense")
        else if (stat === 5) setSelectedStat("speed")
    }

    const displayStat = (isPok1: boolean) => {
        if (isPok1) {
            if (selectedStat === "HP") return pok1.health;
            else if (selectedStat === "attack") return pok1.attack;
            else if (selectedStat === "defense") return pok1.defense;
            else if (selectedStat === "speAttack") return pok1.speAttack;
            else if (selectedStat === "speDefense") return pok1.speDefense;
            else if (selectedStat === "speed") return pok1.speed;
        } else {
            if (selectedStat === "HP") return pok2.health;
            else if (selectedStat === "attack") return pok2.attack;
            else if (selectedStat === "defense") return pok2.defense;
            else if (selectedStat === "speAttack") return pok2.speAttack;
            else if (selectedStat === "speDefense") return pok2.speDefense;
            else if (selectedStat === "speed") return pok2.speed;
        }
    }

    const generate = () => {
        // Randomly selects one of the two options and finds new pokemon
        setShowStat(false);
        const coinFlip = Math.random();
        if (coinFlip < 0.5) {
            let poke1 = pokemon[helpers.getRandomArbitrary(0, 960)]
            while (poke1.id === pok2.id) poke1 = pokemon[helpers.getRandomArbitrary(0, 960)];
            if (includeLegendaries === "false") {
                // Prevents it from pickign a legendary
                while (poke1.legendary!== "NULL") poke1 = pokemon[helpers.getRandomArbitrary(0, 960)];
            }
            setPok1(poke1);
        } else {
            let poke2 = pokemon[helpers.getRandomArbitrary(0, 960)]
            while (poke2.id === pok1.id) poke2 = pokemon[helpers.getRandomArbitrary(0, 960)] // avoids having the two be equal
            if (includeLegendaries === "false") {
                // Prevents it from pickign a legendary
                while (poke2.legendary!== "NULL") poke2 = pokemon[helpers.getRandomArbitrary(0, 960)];
            }
            setPok2(poke2);     
        }
        pickStat();
    }

    const compare = async (select1:boolean) => {
        const userChoice = select1? pok1 : pok2;
        const other = select1? pok2: pok1;
        let res = false;
        if (selectedStat === "HP") res = userChoice.health < other.health;
        else if (selectedStat === "attack") res = userChoice.attack < other.attack;
        else if (selectedStat === "defense") res = userChoice.defense < other.defense;
        else if (selectedStat === "speAttack") res = userChoice.speAttack < other.speAttack;
        else if (selectedStat === "speDefense") res = userChoice.speDefense < other.speDefense;
        else if (selectedStat === "speed") res = userChoice.speed < other.speed;
        setShowStat(true);
        await helpers.sleep(1000);
        if (res) {
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
            const best = helpers.getOneStatHardModeHighScore();
            if (!best || parseInt(best) < currScore) helpers.setOneStatHardModeHighScore(currScore);
        } else {
            const best = helpers.getOneStatHighScore();
            if (!best || parseInt(best) < currScore) helpers.setOneStatHighScore(currScore)
        }
        setGameOver(true);
    }

    if (gameOver) { //Game Over screen
        return (
            <EndScreen currentScore={currentScore} hardMode={hardMode} start={start} oneStat={true}/>
        )
    }

    return(
        <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: "url(detective-pikachu.png)"}}>
            <div className={`${hardMode === "true" ? 'opacity-100': 'opacity-0'} fixed top-5 right-5 z-20 font-press-start font-extrabold text-white text-lg`}>
                {timerClock}s
            </div>
            <div className="absolute flex flex-col md:flex-row justify-around md:justify-center h-screen w-screen items-center">
                <CharacterImage dexName={pok1.name} dexBST={displayStat(true) || pok2.health} showBST={showStat} isPok1={true} selectPokemon={compare}/>
                <div className="absolute flex flex-row md:flex-col gap-x-2 gap-y-2">
                    <div className="relative text-white text-lg h-auto flex items-center justify-center z-10">
                        <div className="z-10 h-16 w-16 flex justify-center items-center font-extrabold font-press-start">
                            {currentScore}
                        </div>
                        <img alt="Pokeball" src="/pokeball.png" className="h-16 w-16 absolute"/>
                    </div>
                    <div className="relative text-white h-auto flex items-center justify-center z-10 text-lg font-press-start">
                        {selectedStat}
                    </div>
                </div>
                <CharacterImage dexName={pok2.name} dexBST={displayStat(false) || pok2.health} showBST={showStat} isPok1={false} selectPokemon={compare}/>
            </div>
        </div>
    )

}

export default OneStat;