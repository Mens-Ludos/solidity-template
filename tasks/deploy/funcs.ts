import colors from 'colors';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

export const logDeployment = (
  contractName: string,
  ...args: [string, unknown][]
): void => {
  console.log(
    colors.bold(colors.green(`${contractName} successfully deployed:`)),
  );
  args.forEach(([key, value]) =>
    console.log(colors.bold(colors.yellow(`${key}:`)), `"${value}"`),
  );
};

export const preAction = (hre: HardhatRuntimeEnvironment): Promise<void> =>
  hre.run('clean').then(() => hre.run('compile'));
