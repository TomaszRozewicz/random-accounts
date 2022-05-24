# Random Accounts
## About
This project demonstrates a basic use case of smart contracts.

The application enable you to:
- create lottery as a smart contract
- allow other users to participate in your lottery
- draw lottery winner

## Technologies
Project is created with:
- [Ethereum ecosystem](https://ethereum.org/en/)
- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [Vue 3](https://vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Setup
### Smart contract
1. In `hardhat` folder create `.env` file based on `.env.example` file.
2. In `hardhat` folder run:
```shell
npm install
```

3. Available commands:

Deploy smart contract to rinkeby test network:
```shell
npm run deploy-to-rinkeby
```

Run smart contract locally: 
```shell
npm run node
```

Run unit tests: 
```shell
npm run test
```

### Frontend
1. In `frontend` folder run:
```shell
npm install
```
2. Run application:
```shell
npm run dev
```

Note: You need [Metamask](https://metamask.io/) to use the application.
