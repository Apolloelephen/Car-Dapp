import { useState } from "react";
import "./App.css";
import { getCar, setCar } from "./services";

function App() {
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [carDetails, setcarDetails] = useState(null);

  const sendMessageToContract = async () => {
    await setCar(color, brand, model);
  };

  const getMessageToContract = async () => {
    const car = await getCar();
    setcarDetails(car);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>All About Cars</h1>
        <h3>
          <i>Order your cars seamlessly</i>
        </h3>
        <br />
        <div className="container">
        <input
          type="text"
          className="input"
          placeholder="input your color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <input
          type="text"
          className="input"
          placeholder="input your brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="input your model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        </div>
        <br /> <br />
        <button onClick={sendMessageToContract} className="button">Place your car Order</button>
        <button onClick={getMessageToContract} className="button">get your car Order</button>
      </div>
        <div className="container">
      {carDetails === null ? (
        <div className="result">No Orders Yet</div>
      ) : (
        <div className="result">
          <ol>
            <li>Car Color: {carDetails.color}</li>
            <li>Car Brand: {carDetails.brand}</li>
            <li>Car Model: {carDetails.model}</li>

            <li></li>
            <li></li>
          </ol>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
