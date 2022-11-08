import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

import { verify } from '../helpers/verify';

const CONTRACT_NAME = 'Lock';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const LOCKED = '0.001';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  const now = Math.round(Date.now() / 1000);
  const lockedAmount = hre.ethers.utils.parseEther(LOCKED);

  const result = await deploy(CONTRACT_NAME, {
    from: deployer,
    args: [now + ONE_YEAR_IN_SECONDS],
    log: true,
    autoMine: true,
    value: lockedAmount,
  });

  if (result.newlyDeployed && result.transactionHash) {
    await verify(
      hre,
      result.address,
      result.transactionHash,
      result.args ?? [],
    );
  }
};
func.tags = [CONTRACT_NAME];
func.id = CONTRACT_NAME;

export default func;
