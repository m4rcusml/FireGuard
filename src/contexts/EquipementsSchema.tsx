import Realm from 'realm';

export class EquipementsSchema extends Realm.Object<EquipementsSchema> {
    _id!: Realm.BSON.ObjectId;
    name!: string;
    equipement!: string;
    qnt!: number;
    type!: string;
    fabDate!: Date;
    weight!: number;
    local!: string;

    static schema: Realm.ObjectSchema = {
        name: 'equipements',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId },
            name: 'string',
            qnt: 'int',
            type:'string',
            fabDate:'date',
            weight: 'int',
            local: 'string',
            equipement: 'string',
        }
    }


}