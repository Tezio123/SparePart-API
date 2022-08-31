import SparePart from '../../../ethereum/contracts/SparePart'

function epochToDate(numString) {
  const date = new Date(parseInt(numString));
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateString = `${months[month]} ${day}, ${year}`;
  return dateString;
}


export default async function userHandler(req, res) {
    const {
      query: { address, name },
      method,
    } = req
  
    switch (method) {
      case 'GET':
        try{
        //Preload data
        const sparePart = SparePart(address);
		    const SparePartDetails = await sparePart.methods.getProductDetailsBasic().call();
        const product_id = SparePartDetails[0];
        const product_name = SparePartDetails[1];
        const brand = SparePartDetails[2];
        const composition = SparePartDetails[3];
        const compatible_vehicles = SparePartDetails[4];
        const dimensions = SparePartDetails[5];
        const weight = SparePartDetails[6];

        const ProductDetailsExtra = await sparePart.methods.getProductDetailsExtra().call();
        const colour = ProductDetailsExtra[0];
        const warranty = ProductDetailsExtra[1];
        const additional_features = ProductDetailsExtra[2];

        const ManufactureDetails = await sparePart.methods.getManufactureDetails().call();
        const sku = ManufactureDetails[1];
        const ingredient_id = ManufactureDetails[2];
        const ingredient_name = ManufactureDetails[3];
        const manufacture_id = ManufactureDetails[4];
        const manufacture_name = ManufactureDetails[5];
        const coo = ManufactureDetails[6];

        const SupplyDetails = await sparePart.methods.getSupplyDetails().call();
        const manufactured_date = SupplyDetails[0];
        const manufactured_price = SupplyDetails[1];
        const wholesale_seller_id = SupplyDetails[2];
        const wholesale_seller_name = SupplyDetails[3];
        const wholesale_processed_date = SupplyDetails[4];
        
        const DistributionDetails = await sparePart.methods.getDistributionDetails().call();
        const logistics_ID = DistributionDetails[0];
        const logistics_name = DistributionDetails[1];
        const supply_processed_date = DistributionDetails[2];
        const retailer_id = DistributionDetails[3];
        const retailer_name = DistributionDetails[4];
        // Get data from your database
        const data = [
          {Product_ID: product_id}, {Product_Name : product_name}, {Brand : brand}, {Composition : composition}, {Compatible_Vehicles : compatible_vehicles}, {Dimensions : dimensions}, {Weight : weight},
          {Colour : colour}, {Warranty : warranty}, {Additional_Features :additional_features},
          {SKU : sku}, {Ingredient_Supplier_ID  : ingredient_id}, {Ingredient_Supplier_Name : ingredient_name}, {Manufacturer_ID  : manufacture_id}, {Manufacturer_Name : manufacture_name}, {COO : coo},
          {Manufactured_Date  : epochToDate(manufactured_date)}, {Manufactured_Price  : manufactured_price}, {Wholesale_Seller_ID : wholesale_seller_id}, {Wholesale_Seller_Name : wholesale_seller_name}, {Wholesale_Processed_Date : epochToDate(wholesale_processed_date)},
          {Logistics_Product_Supplier_ID  : logistics_ID}, {Logistics_Product_Supplier_Name  : logistics_name}, {Product_Supply_Processed_Date : epochToDate(supply_processed_date)}, {Retailer_ID  : retailer_id}, {Retailer_Name : retailer_name}
        ]
        res.status(200).json(data)
      }
      catch(e){
        res.status(400).json(e.message)
      }
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
  