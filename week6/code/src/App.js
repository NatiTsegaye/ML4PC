import "./App.css";
import Buttons from "./Buttons";
import Trial2 from "./Trial2";

function App() {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  return (
    <div className="App">
      <div style={{ display: "flex" }} className="p5">
        <div id="btn" className="buttons">
          {alphabet.map((elem) => {
            return (
              <div key={elem + elem + elem}>
                <Buttons key={elem} name={elem} />
                <div id={elem + elem} key={elem + elem}>
                  {0}
                </div>
              </div>
            );
          })}
          <div>
            <Buttons name="thumbsUp" />
            <div id="thumbsUpthumbsUp"></div>
          </div>
          <div>
            <Buttons name="thumbsDown" />
            <div id="thumbsDownthumbsDown"></div>
          </div>
          <div>
            <Buttons name="predict" />
            <div id="predictpredict"></div>
          </div>
        </div>
        <div>
          <Trial2 />
        </div>
      </div>
      <div id="word">...</div>
      <div id="sentence">...</div>
    </div>
  );
}

export default App;
