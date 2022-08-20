import { Link } from "react-router-dom";
import * as helpers from "../utils/helpers";
import ReactGA from "react-ga";
import MenuButton from "./MenuButton";

interface EndScreenProps {
    currentScore: number;
    hardMode: string;
    oneStat: boolean;
    start: () => void;
}

function EndScreen({currentScore, hardMode, oneStat, start}: EndScreenProps) {

    const highscore = () => {
        if (oneStat) {
            return hardMode === "true" ? helpers.getOneStatHardModeHighScore() : helpers.getOneStatHighScore();
        } else {
            return hardMode === "true" ? helpers.getBSTHardHighScore() : helpers.getBSTHighScore(); 
        }
    }

    const startNew = () => {
        ReactGA.event({
            category: "User",
            action: "Start Game"
        })
        start();
    }

    return (
        <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: `url("pikachu.gif")`}}>
            <div className="bg-black opacity-80 fixed top-0 left-0 h-screen w-screen"/>
            <div className="font-press-start text-white flex z-10 flex-col">
                <p className="text-3xl font-bold mb-10">Game Over!</p>
                <p className="mb-3">Final Score: {currentScore}</p>
                <p>High Score: {highscore()} </p>
                <button onClick={() => startNew()} className="mt-10">
                    <MenuButton title="Play Again"/>
                </button>
                <Link to="/">
                    <MenuButton title="Exit"/>
                </Link>
            </div>
        </div>
    )
}

export default EndScreen;