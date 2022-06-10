import 'dotenv/config';
import { HardhatNetworkUserConfig, NetworkUserConfig } from 'hardhat/types';

import { gwei } from './constants';
import { ConfigPerNetwork, Network, RpcUrl } from './types';

import { getEnvVars } from '../envVars';

const { ALCHEMY_KEY, INFURA_KEY, MNEMONIC_DEV, MNEMONIC_PROD } = getEnvVars();

export const rpcUrls: ConfigPerNetwork<RpcUrl> = {
  main: ALCHEMY_KEY
    ? `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`
    : `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  goerli: ALCHEMY_KEY
    ? `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_KEY}`
    : `https://goerli.infura.io/v3/${INFURA_KEY}`,
  hardhat: 'http://localhost:8545',
  local: 'http://localhost:8545',
};

export const gasPrices: ConfigPerNetwork<number> = {
  main: 1 * gwei,
  goerli: 10 * gwei,
  hardhat: 1 * gwei,
  local: 70 * gwei,
};

export const chainIds: ConfigPerNetwork<number> = {
  main: 1,
  goerli: 5,
  hardhat: 31337,
  local: 31337,
};

export const mnemonics: ConfigPerNetwork<string> = {
  main: MNEMONIC_PROD,
  goerli: MNEMONIC_DEV,
  hardhat: MNEMONIC_DEV,
  local: MNEMONIC_DEV,
};

export const gases: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: 1_250_000,
  hardhat: undefined,
  local: 1_250_000,
};

export const timeouts: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: 999999,
  hardhat: undefined,
  local: 999999,
};

export const blockGasLimits: ConfigPerNetwork<number | undefined> = {
  main: 300 * 10 ** 6,
  goerli: undefined,
  hardhat: 300 * 10 ** 6,
  local: undefined,
};

export const initialBasesFeePerGas: ConfigPerNetwork<number | undefined> = {
  main: undefined,
  goerli: undefined,
  hardhat: 0,
  local: undefined,
};

export const getBaseNetworkConfig = (network: Network): NetworkUserConfig => ({
  accounts: {
    mnemonic: mnemonics[network],
  },
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
});

export const getForkNetworkConfig = (
  network: Network,
): HardhatNetworkUserConfig => ({
  ...getBaseNetworkConfig(network),
  accounts: {
    mnemonic: mnemonics[network],
  },
  forking: {
    url: rpcUrls[network],
  },
});

export const getHardhatNetworkConfig = (): HardhatNetworkUserConfig => ({
  ...getBaseNetworkConfig('hardhat'),
  accounts: {
    mnemonic: mnemonics.hardhat,
  },
});
