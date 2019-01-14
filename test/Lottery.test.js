const assert = require('assert');
const ganache = require('ganache-cli');

// Constructor function
const Web3 = require('web3');

// Actual instance of web3 being used, provider is communication layer between web3
// and some Ethereum network
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	lottery = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({data: bytecode})
	.send({from: accounts[0], gas:'1000000'});
});

// Group "it" functions together
describe('Lottery Contract', () => {
	// Run a test and make an assertion
	it('deploys a contract', () => {
		assert.ok(lottery.options.address);
		console.log(lottery);
	});

	it('allows one account to enter', async () => {
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('0.02', 'ether')
		});
	const players = await lottery.methods.getPlayers().call({
		from: accounts[0]
	});
	assert.equal(accounts[0], players[0]);
	assert.equal(1, players.length);
	});
});