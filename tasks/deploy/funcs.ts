import colors from 'colors';

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
