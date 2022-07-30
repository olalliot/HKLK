import MenuButton from "./components/MenuButton";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as helpers from "./utils/helpers";
import pokemon from "./utils/data.json";

interface CharacterImageInt {
    dexName: string;
    isPok1: boolean;
    selectPokemon: (select1: boolean) => void;
    dexBST: number;
    showBST: boolean;
}

function CharacterImage({dexName, isPok1, selectPokemon, dexBST, showBST}:CharacterImageInt) {
    return (
        <div onClick={() => selectPokemon(isPok1)} className="h-2/4 w-screen md:w-2/4 md:h-screen justify-center items-center flex flex-col cursor-pointer">
            <div className="opacity-0 w-screen md:w-2/4 h-2/4 md:h-screen bg-black absolute md:hover:opacity-30"/>
            <img alt={dexName} src={`/sprites/${dexName.toLowerCase()}.gif`} className="md:w-40"/>
            <p className="text-white font-press-start text-lg mt-5">{dexName}</p>
            {showBST ? <p className="text-white font-press-start text-md mt-5">{dexBST}</p> : <p className="opacity-0 mt-5">{dexBST}</p>}
        </div>
    )
}

function Game() {
    const [searchParams, _] = useSearchParams();
    const hardMode = searchParams.get("hardMode");

    const [currentScore, setCurrentScore] = useState(0);
    const [timerClock, setTimerClock] = useState(10);
    const [showBST, setShowBST] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [pok1, setPok1] = useState<{
        id: string;
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
        id: "1",
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
        id: string;
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
        id: "1",
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

    const generate = () => {
        setShowBST(false);
        if (!pok1.name && !pok2.name) { // First load
            const poke1 = pokemon[helpers.getRandomArbitrary(1, 902)]
            const poke1ID = typeof(poke1.id) === "number" ? poke1.id.toString() : poke1.id;
            setPok1({
                id: poke1ID,
                name: poke1.name,
                altForm: poke1.altForm,
                type1: poke1.type1,
                type2: poke1.type2,
                bst: poke1.bst,
                ability: poke1.ability,
                ability2: poke1.ability2,
                hiddenAbility: poke1.hiddenAbility,
                generation: poke1.generation,
                egg: poke1.egg,
                egg2: poke1.egg2
            });
    
            let poke2 = pokemon[helpers.getRandomArbitrary(1, 902)]
            while (poke2.id === poke1.id) poke2 = pokemon[helpers.getRandomArbitrary(1, 902)] // avoids having the two be equal
            const poke2ID = typeof(poke2.id) === "number" ? poke2.id.toString() : poke2.id;
            setPok2({
                id: poke2ID,
                name: poke2.name,
                altForm: poke2.altForm,
                type1: poke2.type1,
                type2: poke2.type2,
                bst: poke2.bst,
                ability: poke2.ability,
                ability2: poke2.ability2,
                hiddenAbility: poke2.hiddenAbility,
                generation: poke2.generation,
                egg: poke2.egg,
                egg2: poke2.egg2
            });

            return;
        }
        const coinFlip = Math.random();
        if (coinFlip < 0.5) {
            let poke1 = pokemon[helpers.getRandomArbitrary(1, 902)]
            const poke1ID = typeof(poke1.id) === "number" ? poke1.id.toString() : poke1.id;
            while (poke1ID === pok2.id) poke1 = pokemon[helpers.getRandomArbitrary(1, 902)]
            setPok1({
                id: poke1ID,
                name: poke1.name,
                altForm: poke1.altForm,
                type1: poke1.type1,
                type2: poke1.type2,
                bst: poke1.bst,
                ability: poke1.ability,
                ability2: poke1.ability2,
                hiddenAbility: poke1.hiddenAbility,
                generation: poke1.generation,
                egg: poke1.egg,
                egg2: poke1.egg2
            });
        } else {
            let poke2 = pokemon[helpers.getRandomArbitrary(1, 902)]
            const poke2ID = typeof(poke2.id) === "number" ? poke2.id.toString() : poke2.id;
            while (poke2ID === pok1.id) poke2 = pokemon[helpers.getRandomArbitrary(1, 902)] // avoids having the two be equal
            setPok2({
                id: poke2ID,
                name: poke2.name,
                altForm: poke2.altForm,
                type1: poke2.type1,
                type2: poke2.type2,
                bst: poke2.bst,
                ability: poke2.ability,
                ability2: poke2.ability2,
                hiddenAbility: poke2.hiddenAbility,
                generation: poke2.generation,
                egg: poke2.egg,
                egg2: poke2.egg2
            });    
        }
    }

    const compare = async (select1:boolean) => {
        const userChoice = select1? pok1 : pok2;
        const other = select1? pok2: pok1;
        setShowBST(true);
        await helpers.sleep(1000);
        if (userChoice.bst < other.bst) {
            endGame();
            return;
        } else {
            setTimerClock(10);
            setCurrentScore(currentScore + 1);
            generate();
        }
    }

    const restart = () => {
        generate();
        setTimerClock(10);
        setCurrentScore(0);
        setGameOver(false);
    }

    const endGame = () => {
        const currScore = currentScore;
        if (hardMode === "true") {
            const best = helpers.getHardHighScore();
            if (!best || parseInt(best) < currScore) helpers.setHardHighScore(currScore);
        } else {
            const best = helpers.getClassicHighScore();
            if (!best || parseInt(best) < currScore) helpers.setClassicHighScore(currScore)
        }
        setGameOver(true);
    }

    useEffect(() => { // onLoad
        generate()
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
            <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: `url("pikachu.gif")`}}>
                <div className="bg-black opacity-80 fixed top-0 left-0 h-screen w-screen"/>
                <div className="font-press-start text-white flex z-10 flex-col">
                    <p className="text-3xl font-bold mb-10">Game Over!</p>
                    <p className="mb-3">Final Score: {currentScore}</p>
                    <p>High Score: {hardMode === "true" ? helpers.getHardHighScore() : helpers.getClassicHighScore()}</p>
                    <button onClick={() => restart()} className="mt-10">
                        <MenuButton title="Play Again"/>
                    </button>
                    <Link to="/">
                        <MenuButton title="Exit"/>
                    </Link>
                </div>
            </div>
        )
    }

    return(
        <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: "url(detective-pikachu.png)"}}>
            <div className={`${hardMode === "true" ? 'opacity-100': 'opacity-0'} fixed top-5 right-5 z-20 font-press-start font-extrabold text-white text-lg`}>
                {timerClock}s
            </div>
            <div className="absolute flex flex-col md:flex-row justify-around md:justify-center min-h-screen w-screen items-center">
                <CharacterImage dexName={pok1.name} dexBST={pok1.bst} showBST={showBST} isPok1={true} selectPokemon={compare}/>
                <div className="absolute text-white text-lg h-full flex items-center justify-center z-10">
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

export default Game;