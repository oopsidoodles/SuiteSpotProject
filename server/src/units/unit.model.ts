export interface Unit {
    _id?: string; // Assigned automatically by datastore
    propertyId: string;
    number: string;
    floor: number;
    rent: number;
    vacant?: boolean;
}
