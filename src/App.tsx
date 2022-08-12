import MenuButton from "./components/MenuButton";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: "url(detective-pikachu.png)"}}>
      <div className="absolute flex justify-center top-10">
          <img src="/Logo.png" alt="Hi Kick Low Kick" className="w-96 md:w-2/6" />
        </div>
      <div className="absolute">
        <Link to="/game?hardMode=false">
          <MenuButton title="CLassic Mode"/>
        </Link>
        <Link to="/game?hardMode=true">
          <MenuButton title="Hard Mode"/>
        </Link>
        <Link to="/rules">
          <MenuButton title="Rules"/>
        </Link>
      </div>
      <div className="fixed bottom-5 left-5 font-press-start text-white text-xs hidden">
        Built by <a href="https://twitter.com/OLalliot" className="text-[#1DA1F2]" target="_blank" rel="noopener">@Olalliot</a>
      </div>
    </div>
  );
}

export default App;
