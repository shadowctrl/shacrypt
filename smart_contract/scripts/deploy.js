const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  await transactions.deployed();
  console.log("Deployed to:", transactions.address);
};

const runMain = async () => {
  await main();
  process.exit(0);
};

runMain();
