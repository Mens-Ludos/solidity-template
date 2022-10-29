import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const LOCKED = '0.001';

const func: DeployFunction = async ({
  deployments,
  getNamedAccounts,
  ethers,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const now = Math.round(Date.now() / 1000);
  const lockedAmount = ethers.utils.parseEther(LOCKED);

  await deploy('Lock', {
    from: deployer,
    args: [now + ONE_YEAR_IN_SECONDS],
    log: true,
    autoMine: true,
    value: lockedAmount,
  });
};
func.tags = ['Lock'];
func.id = 'Lock';

export default func;
