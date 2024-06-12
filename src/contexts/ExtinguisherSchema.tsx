import Realm from 'realm';

export class ExtinguisherSchema extends Realm.Object<ExtinguisherSchema> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    serieNumber!: number;
    type!: string;
    capacity!: number;
    fabDate!: Date;
    refillDate!: Date;
    localization!: string;


    static schema: Realm.ObjectSchema = {
        name: 'extinguisher',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId },
            name: 'string',
            serieNumber: 'int',
            type: 'string',
            capacity: 'int',
            fabDate: 'date',
            refillDate: 'date',
            localization: 'string',
        }
    }


}