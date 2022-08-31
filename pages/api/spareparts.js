import SparePartFactory from '../../ethereum/contracts/SparePartFactory';


export default async function handler(req, res) {
  const {
    method,
  } = req

  switch (method) {
    case 'GET':
        const deployedSpareParts = await SparePartFactory.methods.getIssuedSpareParts().call();
        const allSpareParts = deployedSpareParts.reverse();

        const size = allSpareParts.length;
        const array1 =[];

        for (let index = 0; index < size; index++) {
          array1[index] = {'index' : index, 'address' : allSpareParts[index]}
          
        }



        console.log(allSpareParts);

      // Get data from your database
      res.status(200).json(array1)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
