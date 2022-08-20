import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import { useEffect } from "react";
import MenuButton from "./components/MenuButton";

interface MenuItem {
    value: string;
}

function RuleItem({value}:MenuItem) {
    return(
        <p className="mb-5 stroke-black">
            {value}
        </p>
    )
}

function Rules() {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    return(
        <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: "url(detective-pikachu.png)"}}>
            <div className="absolute flex-col flex p-10 md:p-48">
                <div className="mb-8 flex">
                    <p className="text-2xl text-white font-press-start pb-2 border-b-8 max-w-2">
                            Rules
                    </p>
                </div>
                <div className="text-white text-sm font-press-start">
                    <RuleItem value="Each round, you will be presented with 2 Pokémon. In BST mode, select the Pokémon with the higher Base Stat Total. In One Stat, select the Pokémon according to the current stat."/>
                    <RuleItem value="If two Pokémon have the same stat value, you can select either one" />
                    <RuleItem value="There are no altered forms (i.e.: Megas, Dynamax, Fusions, etc.)" />
                    <RuleItem value="With the Timer, you have to select an answer before the clock runs out. If it hits 0, the game is over!" />
                </div>
                <div className="flex justify-center mt-8">
                    <Link to="/">
                        <MenuButton title="Go Back"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Rules;