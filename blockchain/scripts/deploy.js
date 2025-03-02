const hre = require("hardhat");

async function main() {
  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry"); // Replace with your contract name
  const landRegistry = await LandRegistry.deploy(); // Deploy the contract

  await landRegistry.waitForDeployment(); // Ensure deployment is completed

  console.log("LandRegistry deployed to:", await landRegistry.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
