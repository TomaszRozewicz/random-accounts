const { expect } = require("chai");
const { ethers } = require("hardhat");
let randomAccounts = {};

describe("Random Accounts", function () {
    beforeEach(async function () {
        const RandomAccounts = await ethers.getContractFactory("RandomAccounts");
        randomAccounts = await RandomAccounts.deploy();
        await randomAccounts.deployed();
    });

    it("joins to participants", async function () {
        await randomAccounts.join();
        const participants = await randomAccounts.getParticipants();
        expect(participants.length).to.equal(1);
    });

    it("leaves contract", async function () {
        await randomAccounts.join();
        await randomAccounts.leave();
        const participants = await randomAccounts.getParticipants();
        expect(participants.length).to.equal(0);
    });

    it("draws participant", async function () {
        await randomAccounts.join();
        await randomAccounts.drawParticipant();
        const chosenParticipants = await randomAccounts.getChosenParticipants();
        expect(chosenParticipants.length).to.equal(1);
    });

    it("draws participant and reset contract", async function () {
        await randomAccounts.join();
        await randomAccounts.drawParticipant();
        await randomAccounts.reset();
        const chosenParticipants = await randomAccounts.getChosenParticipants();
        expect(chosenParticipants.length).to.equal(0);
    });
});
