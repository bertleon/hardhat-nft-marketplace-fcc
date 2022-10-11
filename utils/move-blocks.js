const { network } = require("hardhat")

function sleep(timeInMs) {
    return new Promise((resolve) => setTimeout(resolve, timeInMs))
}

async function moveBlocks(amount, sleepAmount = 0) {
    console.log("Moving blocks...")
    for (let index = 0; index < amount; index++) {
        await network.provider.request({
            method: "evm_mine",
            parmas: [],
        })
        if (sleepAmount > 0) {
            console.log(`Sleeping for ${sleepAmount}`)
            await sleep(sleepAmount)
        }
    }
}

module.exports = {
    moveBlocks,
    sleep,
}
