/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Faucet, FaucetInterface } from "../Faucet";

const _abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "trustedForwarder",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getToken",
    inputs: [
      {
        name: "tokenAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isTrustedForwarder",
    inputs: [
      {
        name: "forwarder",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onERC1155BatchReceived",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC1155Received",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "trustedForwarder",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
] as const;

const _bytecode =
  "0x60a0604052348015600f57600080fd5b5060405161079d38038061079d833981016040819052602c91603c565b6001600160a01b0316608052606a565b600060208284031215604d57600080fd5b81516001600160a01b0381168114606357600080fd5b9392505050565b60805161070c6100916000396000818160910152818160fd0152610299015261070c6000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80637da0a877116100505780637da0a877146100e3578063bc197c8114610127578063f23a6e611461019057600080fd5b806343d7cce61461006c578063572b6c0514610081575b600080fd5b61007f61007a36600461033d565b6101c8565b005b6100ce61008f366004610367565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff90811691161490565b60405190151581526020015b60405180910390f35b60405173ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001681526020016100da565b61015f610135366004610515565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100da565b61015f61019e3660046105bf565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b8173ffffffffffffffffffffffffffffffffffffffff1663f242432a306101ed610292565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff92831660048201529116602482015260448101849052600a606482015260a06084820152600060a482015260c401600060405180830381600087803b15801561027657600080fd5b505af115801561028a573d6000803e3d6000fd5b505050505050565b60003660147f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16331480156102dc5750808210155b1561030c576000366102ee8385610624565b6102f9928290610664565b6103029161068e565b60601c9250505090565b339250505090565b803573ffffffffffffffffffffffffffffffffffffffff8116811461033857600080fd5b919050565b6000806040838503121561035057600080fd5b61035983610314565b946020939093013593505050565b60006020828403121561037957600080fd5b61038282610314565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156103ff576103ff610389565b604052919050565b600082601f83011261041857600080fd5b8135602067ffffffffffffffff82111561043457610434610389565b8160051b6104438282016103b8565b928352848101820192828101908785111561045d57600080fd5b83870192505b8483101561047c57823582529183019190830190610463565b979650505050505050565b600082601f83011261049857600080fd5b813567ffffffffffffffff8111156104b2576104b2610389565b6104e360207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016103b8565b8181528460208386010111156104f857600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561052d57600080fd5b61053686610314565b945061054460208701610314565b9350604086013567ffffffffffffffff8082111561056157600080fd5b61056d89838a01610407565b9450606088013591508082111561058357600080fd5b61058f89838a01610407565b935060808801359150808211156105a557600080fd5b506105b288828901610487565b9150509295509295909350565b600080600080600060a086880312156105d757600080fd5b6105e086610314565b94506105ee60208701610314565b93506040860135925060608601359150608086013567ffffffffffffffff81111561061857600080fd5b6105b288828901610487565b8181038181111561065e577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b6000808585111561067457600080fd5b8386111561068157600080fd5b5050820193919092039150565b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000081358181169160148510156106ce5780818660140360031b1b83161692505b50509291505056fea264697066735822122080363885b3d8a1b943435be2f533e198c58d96f965ccfdea9fb1a4d3740a39fe64736f6c63430008190033";

type FaucetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FaucetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Faucet__factory extends ContractFactory {
  constructor(...args: FaucetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    trustedForwarder: string,
    overrides?: Overrides & { from?: string }
  ): Promise<Faucet> {
    return super.deploy(trustedForwarder, overrides || {}) as Promise<Faucet>;
  }
  override getDeployTransaction(
    trustedForwarder: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(trustedForwarder, overrides || {});
  }
  override attach(address: string): Faucet {
    return super.attach(address) as Faucet;
  }
  override connect(signer: Signer): Faucet__factory {
    return super.connect(signer) as Faucet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FaucetInterface {
    return new utils.Interface(_abi) as FaucetInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Faucet {
    return new Contract(address, _abi, signerOrProvider) as Faucet;
  }
}