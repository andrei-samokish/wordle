
# Blockchain Wordle

A Wordle game where you have to guess made up word in 6 takes. Grey letter background indicates that there is no such letter in made up word. Yellow background means that this letter stands in the wrong place in made up word and you should try to move it anywhere else. Green stand for correct letter at its place.


## Run Locally

Clone the project

```bash
  git clone https://github.com/andrei-samokish/wordle.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`ALCHEMY_API_KEY` - sign up at [_alchemy.com_](https://www.alchemy.com) and create Goerli app. You will be provided with an alchemy API key which you should paste in your .env;

`GOERLI_PRIVATE_KEY` - copy your MetaMask wallet`s private key and paste it in your .env (only if you want to deploy contract yourself);

`NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS="0x1F81696dE81D4F6B58a35b790d5533ACEd2eDdf1"` - use this address as an existing deployment of Wordle contract.


## Screenshots

![Guide](https://snipboard.io/IteGJc.jpg)
![App screenshot](https://snipboard.io/6Td0O7.jpg)


## Tech Stack

**Client:** JS, React, TailwindCSS, Solidity, Hardhat (deploy + tests + tasks), Ethers.js

**Server:** Node, Vercel

