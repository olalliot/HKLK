import { Link } from "react-router-dom";

import Background from "./components/Background";
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
    return(
        <div className="flex min-h-screen justify-center items-center">
            <Background/>
            <div className="absolute flex-col flex p-10 md:p-48">
                <div className="mb-8 flex">
                    <p className="text-2xl text-white font-press-start pb-2 border-b-8 max-w-2">
                            Rules
                    </p>
                </div>
                <div className="text-white text-sm font-press-start">
                    <RuleItem value="Each round, you will be presented with 2 Pokémon. Select the one you think has the higher Base Stat Total (BST)"/>
                    <RuleItem value="If two Pokémon have the same BST, you can select either one" />
                    <RuleItem value="There are no regional forms (i.e.: Vulpix & Alolan Vulpix)" />
                    <RuleItem value="In Hard mode, you have to select an answer before the clock runs out. If it hits 0, the game is over!" />
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