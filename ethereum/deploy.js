const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFatory.json');

const provider = new HDWalletProvider(
    'master census diamond before letter find middle connect develop innocent icon crystal', 
    'https://goerli.infura.io/v3/2ee8d3973cc04e55a84fbf2bbbdb2c2a'
);

const web3 = new Web3(provider);

const deploy= async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data : compiledFactory.bytecode})
    .send({gas:'1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
    
};
deploy(); 