interface ButtonContent {
    title: string;
}

function MenuButton({title}: ButtonContent) {
    return(
        <div className="font-press-start text-lg mb-5 cursor-pointer px-5 py-3 text-[#2a75bb] bg-[#ffcb05] flex items-center justify-center rounded-full hover:bg-[#c7a008] hover:text-[#3c5aa6] hover:scale-110 transform transition duration-250">
            {title}
        </div>
    );
}

export default MenuButton;