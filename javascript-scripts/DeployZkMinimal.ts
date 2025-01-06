import * as fs from "fs-extra"
import {
  utils,
  Wallet,
  Provider,
  EIP712Signer,
  types,
  Contract,
  ContractFactory,
} from "zksync-ethers"
import * as ethers from "ethers"
import "dotenv/config"

async function main() {
  let provider = new Provider(process.env.ZKSYNC_SEPOLIA_RPC_URL!)
  const encryptedJson = fs.readFileSync(".encryptedKey.json", "utf8")
  let wallet = Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD!
  )

  wallet = wallet.connect(provider)
  const WalletAddress = await wallet.getAddress()
  console.log(`Wallet address: ${WalletAddress}`)
  const abi = JSON.parse(
    fs.readFileSync("./out/ZkMinimalAccount.sol/ZkMinimalAccount.json", "utf8")
  )["abi"]
  const bytecode = JSON.parse(
    fs.readFileSync(
      "./zkout/ZkMinimalAccount.sol/ZkMinimalAccount.json",
      "utf8"
    )
  )["bytecode"]["object"]

  const factoryDeps = [bytecode]
  const zkMinimalAccountFactory = new ContractFactory<any[], Contract>(
    abi,
    bytecode,
    wallet,
    "createAccount"
  )

  const zkMinimalAccount = await zkMinimalAccountFactory.deploy()

  console.log(
    `zkMinimalAccount deployed at: ${await zkMinimalAccount.getAddress()}`
  )
  console.log(
    `With transaction hash: ${
      (await zkMinimalAccount.deploymentTransaction())!.hash
    }`
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
