const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
	'artwork tower opinion execute dune crumble wisdom rug insane retreat pepper auto',
	'https://rinkeby.infura.io/v3/7bfc74ccd7fc448e9fa2edb3d9d461f0'
	);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode })
		.send({ from: accounts[0], gas: '1000000'});

	console.log('Contract deployed to :', result.options.address);	
};
deploy();