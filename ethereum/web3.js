import Web3 from 'web3';

let web3;

(async () => {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/3716674321fd4937b541253eadfd46ac'
  );
  web3 = new Web3(provider);  // Reassign web3 to provider
})();

export default web3;
