import { useState, useEffect } from "react";
import ReactGA from "react-ga";
import MenuButton from "./components/MenuButton";
import { Link } from "react-router-dom";

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [timerMode, setTimerMode] = useState(false);
  const [includeLegendaries, setIncludeLegendaries] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="flex min-h-screen justify-center items-center bg-cover" style={{backgroundImage: "url(detective-pikachu.png)"}}>
      <div className={showSettings ? "absolute flex top-0 left-0 z-20 font-press-start" : "hidden"}>
        <div className="opacity-50 bg-black h-screen w-screen absolute t-0 l-0" onClick={() => setShowSettings(false)}/>
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="flex flex-col justify-between w-5/6 md:w-2/6 h-4/6 md:h-3/6 p-10 rounded-md h-auto bg-[#4073b6] text-[#f7cd46] z-30">
            <div className="text-2xl">
              Settings
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between" onClick={() => setIncludeLegendaries(!includeLegendaries)}>
                Legendaries
                <img src={includeLegendaries? "/checkbox.png" : "/box.png"} alt="checkbox" className="w-10 h-auto"/>
              </div>
              <div className="flex items-center justify-between" onClick={() => setTimerMode(!timerMode)}>
                Timer
                <img src={timerMode? "/checkbox.png" : "/box.png"} alt="checkbox" className="w-10 h-auto"/>
              </div>
            </div>
            <div className="flex justify-center bg-[#f7cd46] hover:bg-[#c7a008] hover:text-[#3c5aa6] text-[#4073b6] hover:cursor-pointer py-2 px-5 rounded-lg" onClick={() => setShowSettings(false)}>
              Close
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex right-5 top-10 z-10">
        <img src="/settings.png" alt="Settings" className="w-10 md:w-2/6 hover:cursor-pointer" onClick={() => setShowSettings(true)}/>
      </div>
      <div className="absolute flex justify-center top-10">
          <img src="/Logo.png" alt="Hi Kick Low Kick" className="w-96 md:w-2/6" />
        </div>
      <div className="absolute">
        <Link to={`/bst?timer=${timerMode ? "true": "false"}&legendaries=${includeLegendaries ? "true": "false"}`}>
          <MenuButton title="BST Mode"/>
        </Link>
        <Link to={`/onestat?timer=${timerMode ? "true": "false"}&legendaries=${includeLegendaries ? "true": "false"}`}>
          <MenuButton title="One Stat Mode"/>
        </Link>
        <Link to="/rules">
          <MenuButton title="Rules"/>
        </Link>
      </div>
      <div className="fixed bottom-5 left-5 font-press-start text-white text-xs hidden">
        Built by <a href="https://twitter.com/OLalliot" className="text-[#1DA1F2]" target="_blank" rel="noopener noreferrer">@Olalliot</a>
      </div>
    </div>
  );
}

export default App;
