import web3 from '../web3';
import SparePart from '../build/SparePart.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(SparePart.interface),
    address
  )
}
