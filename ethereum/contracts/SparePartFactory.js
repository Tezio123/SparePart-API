// Tell web3 that a deployed copy of 'CertificateFactory' exists
import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import SparePartFactory from '../build/SparePartFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(SparePartFactory.interface),
  // This is the address of the contract factory
  // 

  // Rinkeby
  '0x7dF62044f531B6a921427bB64a398FDf2001190a'
);

export default instance;
