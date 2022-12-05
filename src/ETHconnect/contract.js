import defaultProvider from "./defaultProvider";
import { ethers } from "ethers";
const ABI = require("./ABI.json");

const wordle = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ABI, defaultProvider);

export default wordle;
