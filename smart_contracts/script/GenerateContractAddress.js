const fs = require("fs");
const path = require("path");

const FRONTEND_CONTRACT_ADDRESS_DIR = "../frontend/utils/";

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// NOTE: maybe we should use this in HelperConfig.s.sol so that we have a single source of truth
const EXTRA_ADDRESSES = {
  5003: {
    LinkToken: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
  },
  
  },
};

async function main() {
  const broadcastFiles = fs.readdirSync("./broadcast/DeployAll.s.sol");
  const addresses = {};
  for (const chainId of broadcastFiles) {
    const runJsonFile = fs.readFileSync(
      "./broadcast/DeployAll.s.sol/" + chainId + "/run-latest.json",
      "utf-8"
    );
    const runFile = JSON.parse(runJsonFile);
    const currentAddresses = {};
    for (const transaction of runFile.transactions) {
      if (transaction.transactionType === "CREATE") {
        currentAddresses[transaction.contractName ?? "Utils"] =
          transaction.contractAddress;
      }
    }
    addresses[chainId] = currentAddresses;
    addresses[chainId] = {
      ...addresses[chainId],
      ...EXTRA_ADDRESSES[chainId],
    };
  }
  console.log(addresses);
  const addressFile = path.join(
    FRONTEND_CONTRACT_ADDRESS_DIR,
    "contract-address.json"
  );
  console.log(addressFile);

  ensureDirectoryExistence(addressFile);

  fs.writeFileSync(addressFile, JSON.stringify(addresses, null, 2));
}

main();
