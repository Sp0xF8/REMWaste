

class Address {
    constructor(json_data = {}){
        this.postcode = json_data.postcode || '';
        this.street = json_data.street || '';
        this.city = json_data.city || '';
        this.county = json_data.county || '';
    }

    toJSON() {
        return {
            postcode: this.postcode,
            street: this.street,
            city: this.city,
            county: this.county
        };
    }
}

const WasteType = {
    CONSTRUCTION: 'construction',
    HOUSEHOLD: 'household',
    GARDEN: 'garden',
    COMMERCIAL: 'commercial'
};

class Order {
    constructor(json_data = {}){
        this.id = json_data.id || '';
        this.address = new Address(json_data.address);
        this.wasteType = json_data.wasteType || WasteType.HOUSEHOLD;
        this.skipSize = json_data.skipSize || 0; // Size in cubic yards
    }

    toJSON() {
        return {
            id: this.id,
            address: this.address.toJSON(),
            wasteType: this.wasteType,
            skipSize: this.skipSize || 0
        };
    }

}


export { Order, Address, WasteType };