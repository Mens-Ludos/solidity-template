import { Network } from '../networks';

export type EnvVars = {
  readonly ALCHEMY_KEY?: string;
  readonly INFURA_KEY?: string;
  readonly ETHERSCAN_API_KEY?: string;
  readonly OPTIMIZER: boolean;
  readonly COVERAGE: boolean;
  readonly REPORT_GAS: boolean;
  readonly MNEMONIC_DEV: string;
  readonly MNEMONIC_PROD: string;
  readonly FORKING_NETWORK?: Network;
};
