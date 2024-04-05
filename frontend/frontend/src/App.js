import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./abi.json";
import "./App.css";

function App() {
  const contractAddress = "0x6C747Ed0405c44f789DabA22db9a33645637F103";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [inputMessage, setInputMessage] = useState(""); // Renamed state variable
  const [getmsg, setGetmsg] = useState(" ");
  async function sendMessageToContract() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.setMessage(inputMessage);
        await transaction.wait();
        alert("Successful");
        setInputMessage(" ");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getMessageToContract() {
    // Renamed function
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      try {
        const transaction = await contract.getMessage();
        setGetmsg(transaction);
        console.log(transaction);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <h1>My DAPP</h1>
        <h2>Blockchain and Frontend integration</h2>
        <h3>
          <i>Message Getter and Setter call</i>
        </h3>
        <br />
        <input
          type="text"
          placeholder="Type in your message here"
          value={inputMessage}
          onChange={handleMessageChange}
        />
        <br /> <br />
        <button onClick={sendMessageToContract}>Set Message</button>
        <br /> <br />
        <button onClick={getMessageToContract}>Get Message</button>
      </div>
      <div>
        <p>{getmsg}</p>

        <button onClick={() => setGetmsg(" ")}>Clear message</button>
      </div>
    </div>
  );
}

export default App;
