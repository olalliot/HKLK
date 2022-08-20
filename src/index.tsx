import ReactDOM from 'react-dom/client';
import ReactGA from "react-ga";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Rules from './rules';
import BST from './BST';
import OneStat from './OneStat';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const TRACKING_ID = "UA-148838947-2";
ReactGA.initialize(TRACKING_ID);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<App />}/>
      </Route>
      <Route path="bst" element={<BST/>}/>
      <Route path="onestat" element={<OneStat/>}/>
      <Route path="rules" element={<Rules/>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
