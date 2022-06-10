import { EnvVars } from './types';

import { Network } from '../networks';

export const getEnvVars = (): EnvVars => ({
  ALCHEMY_KEY: process.env.ALCHEMY_KEY || '',
  INFURA_KEY: process.env.INFURA_KEY || '',
  MNEMONIC_DEV: process.env.MNEMONIC_DEV || '',
  MNEMONIC_PROD: process.env.MNEMONIC_PROD || '',
  FORKING_NETWORK: process.env.FORKING_NETWORK
    ? (process.env.FORKING_NETWORK as Network)
    : undefined,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY || '',
  OPTIMIZER: process.env.OPTIMIZER === 'true',
  COVERAGE: process.env.COVERAGE === 'true',
  REPORT_GAS: process.env.REPORT_GAS === 'true',
});
