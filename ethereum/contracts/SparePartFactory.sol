
pragma solidity >=0.4.22 <0.6.0;

contract SparePartFactory {
    // You will declare your global vars here
    SparePart[] private issuedSpareParts;
    event ContractCreated(SparePart contractAddress);
    
   
    function createSparePart(string memory _product_id,string memory _product_name, string memory _brand, string memory _composition, string memory _compatible_vehicles, string memory _dimensions, string memory _weight) public {
        SparePart newSparePart = new SparePart(msg.sender, _product_id, _product_name, _brand, _composition, _compatible_vehicles, _dimensions, _weight);
        
        // saving the address so a front-end client can find it
        emit ContractCreated(newSparePart);
        issuedSpareParts.push(newSparePart);
        
    }
    
    function getIssuedSpareParts() public view returns (SparePart[] memory) {
     return issuedSpareParts;
    }
    function getIssuedSparePartsCount() public view returns (uint) {
     return issuedSpareParts.length;
    }

}

contract SparePart {
    address public owner;
    string public product_ID;
    string public product_name;
    string public brand;
    string public composition;
    string public compatible_vehicles;
    string public dimensions;
    string public weight;
    string public colour;
    bool public warranty;
    string public additional_features;
    string public sku;
    string public ingredient_supplier_ID;
    string public ingredient_supplier_name;
    string public manufacturer_ID;
    string public manufacturer_name;
    string public coo;
    uint public manufactured_date;
    string public manufactured_price;
    string public wholesale_seller_ID;
    string public wholesale_seller_name;
    uint public wholesale_processed_date;
    string public logistics_ID;
    string public logistics_name;
    uint public supply_processed_date;
    string public retailer_ID;
    string public retailer_name;
    bool public additionaDetails = false;
    bool public manufactureDetails = false;
    bool public supplyDetails = false;
    bool public distributionDetails = false;
  
    constructor(address _owner, string memory _product_id, string memory _product_name, string memory _brand, string memory _composition, string memory _compatible_vehicles, string memory _dimensions, string memory _weight) public {
        owner = _owner;
        product_ID = _product_id;
        product_name = _product_name;
        brand = _brand;
        composition = _composition;
        compatible_vehicles = _compatible_vehicles;
        dimensions = _dimensions;
        weight = _weight;
    }
    
     // Reusable modifier function
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    
    //setters
    function setAdditonalDetails(bool _warranty, string memory _features,  string memory _colour) public onlyOwner{
        additional_features = _features;
        warranty = _warranty;
        colour = _colour;
        additionaDetails = true;
        return;
    }
    
    function setManufactureDetails(string memory _sku,  string memory _ingredient_supplier_ID,
     string memory _ingredient_supplier_name, string memory _manufacturer_ID, string memory _manufacturer_name, string memory _coo) public onlyOwner{
        sku = _sku;
        ingredient_supplier_ID = _ingredient_supplier_ID;
        ingredient_supplier_name = _ingredient_supplier_name;
        manufacturer_ID = _manufacturer_ID;
        manufacturer_name = _manufacturer_name;
        coo = _coo;
        manufactureDetails = true;
        return;
    }
    
    function setSupplyDetails(uint _manufactured_date, string memory _manufactured_price,
     string memory _wholesale_seller_ID, string memory _wholesale_seller_name, uint _wholesale_processed_date) public onlyOwner{
        manufactured_date = _manufactured_date;
        manufactured_price = _manufactured_price;
        wholesale_seller_ID = _wholesale_seller_ID;
        wholesale_seller_name = _wholesale_seller_name;
        wholesale_processed_date = _wholesale_processed_date;
        supplyDetails = true;
        return;
    }
    
    function setDistributionDetails(string memory _logistics_ID, string memory _logistics_name,
     uint _supply_processed_date, string memory _retailer_ID, string memory _retailer_name) public onlyOwner{
        logistics_ID = _logistics_ID;
        logistics_name = _logistics_name;
        supply_processed_date = _supply_processed_date;
        retailer_ID = _retailer_ID;
        retailer_name = _retailer_name;
        distributionDetails = true;
        return;
    }
    
    //getters
    function getProductDetailsBasic() public view returns (
         string, string, string, string, string, string, string) {
        return (
            product_ID,
            product_name,
            brand,
            composition,
            compatible_vehicles,
            dimensions,
            weight
        );
    }
    
    function getProductDetailsExtra() public view returns (
         string, bool, string) {
        return (
            colour,
            warranty,
            additional_features
        );
    }
    
    function getManufactureDetails() public view returns (
         string, string, string, string, string, string, string) {
        return (
            product_ID,
            sku,
            ingredient_supplier_ID,
            ingredient_supplier_name,
            manufacturer_ID,
            manufacturer_name,
            coo
        );
    }
    
    function getSupplyDetails() public view returns (
         uint, string, string, string, uint) {
        return (
            manufactured_date,
            manufactured_price,
            wholesale_seller_ID,
            wholesale_seller_name,
            wholesale_processed_date
        );
    }
    
    function getDistributionDetails() public view returns (
         string, string, uint, string, string) {
        return (
            logistics_ID,
            logistics_name,
            supply_processed_date,
            retailer_ID,
            retailer_name
        );
    }
    
    function getDetailFlags() public view returns (
         bool, bool, bool,bool) {
        return (
            additionaDetails,
            manufactureDetails,
            supplyDetails,
            distributionDetails
        );
    }
    
    
}