interface CharacterImageInt {
    dexName: string;
    isPok1: boolean;
    selectPokemon: (select1: boolean) => void;
    dexBST: number;
    showBST: boolean;
}

export function CharacterImage({dexName, isPok1, selectPokemon, dexBST, showBST}:CharacterImageInt) {
    return (
        <div className="h-2/4 w-screen md:w-2/4 md:h-screen justify-center items-center flex flex-col cursor-pointer">
            <div onClick={() => selectPokemon(isPok1)} className="z-10 opacity-100 w-screen md:w-2/4 h-1/2 md:h-screen bg-transparent absolute md:hover:opacity-30 md:hover:bg-black"/>
            <img alt={dexName} src={`/sprites/${dexName.toLowerCase()}.gif`} className="w-auto md:w-40 h-auto"/>
            <p className="text-white font-press-start text-lg my-5">{dexName}</p>
            {showBST ? <p className="text-white font-press-start text-md">{dexBST}</p> : <p className="opacity-0">{dexBST}</p>}
        </div>
    )
}