require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/playTask");
require("./tasks/updateWordTask");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
      accounts: [process.env.REACT_APP_GOERLI_PRIVATE_KEY],
    },
  },
};
