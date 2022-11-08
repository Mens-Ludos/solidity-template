import { HardhatNetworkUserConfig, NetworkUserConfig } from 'hardhat/types';

import { GWEI } from '../constants';
import { ENV } from '../env';
import { ConfigPerNetwork, Network, RpcUrl } from '../types';

const { ALCHEMY_KEY, INFURA_KEY, MNEMONIC_DEV, MNEMONIC_PROD } = ENV;

export const rpcUrls: ConfigPerNetwork<RpcUrl> = {
  main: ALCHEMY_KEY
    ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
    : `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  goerli: ALCHEMY_KEY
    ? `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`
    : `https://goerli.infura.io/v3/${INFURA_KEY}`,
  hardhat: 'http://localhost:8545',
  localhost: 'http://localhost:8545',
};

export const gasPrices: ConfigPerNetwork<number | undefined> = {
  main: 1 * GWEI,
  goerli: undefined,
  hardhat: 1 * GWEI,
  localhost: 70 * GWEI,
};

export const chainIds: ConfigPerNetwork<number> = {
  main: 1,
  goerli: 5,
  hardhat: 31337,
  localhost: 31337,
};

export const mnemonics: ConfigPerNetwork<string | undefined> = {
  main: MNEMONIC_PROD,
  goerli: MNEMONIC_DEV,
  hardhat: MNEMONIC_DEV,
  localhost: MNEMONIC_DEV,
};

export const gases: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: 1_250_000,
  hardhat: undefined,
  localhost: 1_250_000,
};

export const timeouts: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: 999999,
  hardhat: undefined,
  localhost: 999999,
};

export const blockGasLimits: ConfigPerNetwork<number | undefined> = {
  main: 300 * 10 ** 6,
  goerli: undefined,
  hardhat: 300 * 10 ** 6,
  localhost: undefined,
};

export const initialBasesFeePerGas: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: undefined,
  hardhat: 0,
  localhost: undefined,
};

export const getBaseNetworkConfig = (network: Network): NetworkUserConfig => ({
  accounts: mnemonics[network]
    ? {
        mnemonic: mnemonics[network],
      }
    : undefined,
  chainId: chainIds[network],
  gas: gases[network],
  gasPrice: gasPrices[network],
  blockGasLimit: blockGasLimits[network],
  timeout: timeouts[network],
  initialBaseFeePerGas: initialBasesFeePerGas[network],
});

export const getNetworkConfig = (network: Network): NetworkUserConfig => ({
  ...getBaseNetworkConfig(network),
  url: rpcUrls[network],
  saveDeployments: true,
});

export const getForkNetworkConfig = (
  network: Network,
): HardhatNetworkUserConfig => ({
  ...getBaseNetworkConfig(network),
  accounts: {
    mnemonic: mnemonics[network],
  },
  live: false,
  saveDeployments: true,
  forking: {
    url: rpcUrls[network],
  },
});

export const getHardhatNetworkConfig = (): HardhatNetworkUserConfig => ({
  ...getBaseNetworkConfig('hardhat'),
  accounts: mnemonics.hardhat ? { mnemonic: mnemonics.hardhat } : undefined,
  saveDeployments: true,
  live: false,
});
