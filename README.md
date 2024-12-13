Mantle-Land is a metaverse project. It provides users with the ability to own virtual land within a map, place items on the land they own, and even sell the land to other users. The land is represented as ERC721 tokens, while the items are represented as ERC1155 tokens. All interactions within the metaverse are secured by smart contracts.

## Teams


## Pre-requisites

You should have `Unity`, `npm`, `forge` and `foundry` installed.

### Unity Project

Go to `client` folder.

```bash
cd game/
```

Open the `game` folder in Unity. Build the project and save build files in `frontend/public` directory ( You only need to do this step if you had made any changes to the game ).

### Frontend

Go to `frontend` folder and install dependencies

```bash
cd frontend/
yarn
```

To run the project:

```bash
npm run dev
```

Visit `localhost:3000` to play the game.

Note: Don't forget to create .env file ( refer .env.example file ).

### Smart Contracts

NOTE: Smart contracts were compiled using Solc 0.8.25 ( i.e v0.8.25+commit.b61c2a91).

Go to `smart_contracts` folder and install foundry and hardhat.

```bash
cd smart_contracts/
forge init
yarn
```

To compile smart contracts:

```bash
forge compile
```

To run test on smart contracts:

```bash
forge test
```

To deploy smart contracts:

```bash
source .env

# For mantlesepolia testnet
script/deploy.bash mantlesepolia testnet



If the above command fails, you can also resume the deployment from the last failed step by using the `--resume` flag inside bash script by editing it.

Note: Don't forget to create .env file ( refer .env.example file ).

To generate typescript typings for smart contracts:

```bash
node script/GenerateTypes.js
```

To copy contract addresses to frontend:

```bash
node script/GenerateContractAddress.js
```

## Smart Contracts

- Check [contract-address.json] for contract addresses for different networks.


## Inspiration

The inspiration behind Mantle-Land comes from the desire to create an immersive metaverse experience where users can explore, own, and customize virtual land. We wanted to empower users to express their creativity and engage with a virtual world where they have control over their own unique space.

## What It Does

Mantle-Land allows users to:

- Own virtual land within a map represented as ERC721 tokens.
- Place items on their owned land, such as buildings, roads, and other structures, represented as ERC1155 tokens.
- Sell their land to other users, transferring ownership and associated items.
- Connect their wallets (e.g., Metamask, Coinbase, WalletConnect) to interact with the metaverse.

When a user connects their wallet, the game fetches data from the smart contracts and highlights the portion of the map that the user owns. Users can then click the "Edit" button to place or remove items on their land. They have the option to cancel or confirm the changes, which updates the items in the appropriate locations. Smart contract checks ensure that users can only interact with the land they own.

In addition, Mantle-Land includes a marketplace where users can sell their land through direct listings or auctions. **Chainlink automation** is utilized for auction listings and using **Chainlink price feeds**, the land can be sold in USD. The marketplace provides an easy and secure way for users to trade their land.

While editing the map, user can also save/load private designs which is saved using sprucekit.

In marketplace listing, if seller owns an ENS account then it will display it so that it add more credibility about seller.


Contracts are deployed on **Mantle sepolia testnet**

## How We Built It

Mantle-Land was built using the following technologies and tools:

- **Unity**: The game was developed using **Unity** and built for **Webgl**.
- **Smart Contracts**: Five smart contracts were developed using **Foundry** and **Hardhat**:
  - **Map Contract**: Responsible for the Lands in the Map, implemented as an **ERC721 contract**.
  - **Utils Contract**: Represents the items that can be placed on the land, implemented as an **ERC1155 contract**.
  - **Faucet Contract**: Allows users to obtain items for free initially. It is funded to provide items for judges and other participants.
  - **Marketplace Contract**: Facilitates land sales through **direct** listings and **auctions**.
  - **Forwarder Contract**: As all contracts implements **ERC2771 context**, **Forwarder** is used to provide **gasless transactions** for users.
- **Map Size**: The map size is determined in the smart contract, allowing the deployment of multiple maps with different sizes. The current deployment consists of a map with a size of 15 by 15 tiles, where each land is a 5 by 5 tile.
- **Item Minting**: Three items are minted in the Utils contract: road, house, and special item.
- **Wallet Integration**: Users can connect their wallets, such as **Metamask**, **Coinbase**, and **WalletConnect**, to interact with the metaverse.
- **Sprucekit** was used to let User Save/Load private designs
- **ENS** was used to resolve custom name for users in marketplace


## Challenges We Ran Into

During the development of Mantle-Land, we encountered several challenges, including:

- Integrating Unity with the blockchain and ensuring secure and efficient interactions between the game and smart contracts.
- Implementing ERC721 and ERC1155 token standards and handling the transfer of ownership between users and their land/items.
- Optimizing gas usage and transaction costs in smart contract deployments.
- Developing a user-friendly interface and seamless wallet integration for a smooth user experience.
- Sprucekit sdk was mainly for Reactjs project, so to pass message between game build for wasm to Reactjs was challenging.
- Unity output the build game in WebGL, so the communication between Webgl and Reactjs was challenging.


## Accomplishments That We're Proud Of

Throughout the development process, we achieved several accomplishments that we're proud of, including:

- Successfully integrating the Unity game engine with the Blockchain and smart contracts.
- Creating a metaverse where users can own virtual land and customize it with various items.
- Implementing a marketplace where users can buy and sell land securely through direct listings and auctions.
- Conducting comprehensive testing, including fuzz testing, to ensure the stability and reliability of the application.

## What We Learned

The development of Mantle-Land provided us with valuable learning experiences, including:

- Gaining in-depth knowledge of integrating smart contracts with Unity.
- Understanding the intricacies of token standards like ERC721 and ERC1155.
- Optimizing gas usage and transaction costs in smart contract deployments.
- Enhancing user experience through seamless wallet integration and fetching data from smart contracts.


## What's Next for Mantle-Land

Mantle-Land is an ongoing project, and we have exciting plans for its future:

- Adding multiple maps with different sizes to expand the metaverse and accommodate more users.
- Conducting further research on gasless transactions to reduce transaction costs and improve user experience.
- Exploring cross-chain integrations to enable interoperability with other blockchain platforms.
- Enhancing the variety of items and customizations available to users.
- Engaging with the community to gather feedback and implement new features based on user suggestions.


We are dedicated to continuously improving and expanding Mantle-Land to create a vibrant and immersive metaverse experience for all users.

