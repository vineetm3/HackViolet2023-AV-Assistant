//import logo from './logo.svg';
import './App.css';
import { gestureMap, gestureMapKey } from '../../src/trackingLogic/gestures.jsx';
import { GetTextFromHTML } from "../../src/trackingLogic/extension.jsx";
import Tracking from "../../src/trackingLogic/tracking.jsx";

console.log("yo2");

function App() {
  console.log("TEST: ");
  console.log(gestureMapKey);
  const gestureImgLink = gestureMap.get(gestureMapKey)[0]; //Determine which image to display
  const gestureImgAltText = gestureMap.get(gestureMapKey)[1]; //Determine what alt text to display if image fails
  const gestureImgCommand = gestureMap.get(gestureMapKey)[2];
  console.log(gestureImgLink);
  console.log(gestureImgAltText);
  console.log(gestureImgCommand);

  return (
    <div className="App">
      { console.log("TEST: ")}
      <header className="App-header">
        <Tracking />
        Welcome to the Auditory-Assistant Google Extension!
          <GetTextFromHTML />
      </header>
      <div className="App-Gesture-Img-and-Description">
        <img src={gestureImgLink} className="App-Gesture-Img" alt={gestureImgAltText} />
        <p>
          {gestureImgCommand}
        </p>
      </div>
    </div>
  );
}

export default App;
