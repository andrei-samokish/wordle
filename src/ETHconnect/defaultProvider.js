import { ethers } from "ethers";

const defaultProvider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.REACT_APP_ALCHEMY_API_KEY
);

export default defaultProvider;
