export type NetworkBase = 'goerli';

export type Network = NetworkBase | 'main' | 'hardhat' | 'local';

export type RpcNetwork = NetworkBase | 'mainnet';

export type RpcUrl =
  | `https://eth-${RpcNetwork}.alchemyapi.io/v2/${string}`
  | `https://${RpcNetwork}.infura.io/v3/${string}`
  | `http://localhost:${number}`;

export type ConfigPerNetwork<T> = Record<Network, T>;
