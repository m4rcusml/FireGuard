import Realm from 'realm';

export class InstructionSchema extends Realm.Object<InstructionSchema> {
    _id!: Realm.BSON.ObjectId;
    title!: string;
    subscription!: string;

    static schema: Realm.ObjectSchema = {
        name: 'instruction',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId },
            title: 'string',
            subscription: 'string',
        }
    }


}