import * as dotenv from 'dotenv';

import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';

dotenv.config();

const OPTIMIZER = process.env.OPTIMIZER === 'true';
const CI = process.env.CI === 'true';
const COVERAGE = process.env.COVERAGE === 'true';
const REPORT_GAS = process.env.REPORT_GAS === 'true';

if (COVERAGE) {
  require('solidity-coverage');
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: OPTIMIZER,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      allowUnlimitedContractSize: !OPTIMIZER,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: 'USD',
    outputFile: CI ? 'gas-report.txt' : undefined,
  },
  contractSizer: {
    runOnCompile: OPTIMIZER,
  },
  // @dev if you wanna verify contracts uncomment code below
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};

export default config;
