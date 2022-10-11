const { ethers, network } = require("hardhat")
const { moveBlocks, sleep } = require("../utils/move-blocks")

const TOKEN_ID = 0

async function updateItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")
    const newPrice = ethers.utils.parseEther("0.2")
    const tx = await nftMarketplace.updateListing(basicNft.address, TOKEN_ID, newPrice)
    tx.wait(1)
    console.log("NFT UPDATED")

    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

updateItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
