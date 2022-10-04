const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT Marketplace Unit Tests", async function () {
          let nftMarketplace, nftMarketplaceContract, basicNft, deployer, player
          const chainId = network.config.chainId
          const PRICE = ethers.utils.parseEther(0.1)
          const TOKEN_ID = 0

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              //   player = (await getNamedAccounts()).player

              const accounts = await ethers.getSigners()
              player = accounts[1]

              await deployments.fixture(["all"])
              nftMarketplace = await ethers.getContract("NftMarketplace")
              basicNft = await ethers.getContract("BasicNft")
              await basicNft.mintNft()
              await basicNft.approve(nftMarketplace.address, TOKEN_ID)
          })

          describe("constructor", async () => {
              it("lists item, purchases item, checks proceeds  ", async function () {
                  await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
                  const playerConnectedNftMarketplace = nftMarketplace.connect(player)
                  await playerConnectedNftMarketplace.buyItem(basicNft.address, TOKEN_ID, {
                      value: PRICE,
                  })
                  const newOwner = basicNft.ownerOf(TOKEN_ID)
                  const deployerProceeds = await nftMarketplace.getProceeds(deployer)
                  assert(newOwner.toString() == player.address)
                  assert(deployerProceeds.toString() == PRICE.toString())
              })

              it("", async () => {})
          })
      })
