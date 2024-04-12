import contractABI from "./abi.json";
const { ethers} = require("ethers");

export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export async function getCar() {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("clicked");
    const contract = new ethers.Contract(
      "0x9840b337fa8982354fc4aebb1e5524e0205f35c2",
      contractABI,
      signer
    );
    console.log("clicked")
    try {
      console.log("clicked")
      const car = await contract.getCar();
      console.log("clicked");
      console.log(car);
      // console.log(transaction.wait)
      return car;
    } catch (err) {
      console.log(err);
    }
  }
}

export async function setCar(_color, _brand, _model) {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      "0x9840b337fa8982354fc4aebb1e5524e0205f35c2",
      contractABI,
      signer
    );
    try {
      const carDetails = await contract.setCar(_color, _brand, _model);
      carDetails.wait();
      console.log("Car details set");
      return carDetails;
    } catch (err) {
      console.log(err);
    }
  }
}

