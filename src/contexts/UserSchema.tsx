import Realm from 'realm';

export class User extends Realm.Object<User>{
    _id!: Realm.BSON.UUID;
    userId!: string;
    name!: string;
    imageProfile?: string;

    static schema: Realm.ObjectSchema = {
        name: 'User',
        primaryKey: '_id',
        properties: {
            _id: { type: 'uuid', default: () => new Realm.BSON.UUID },
            name: 'string',
            userId: 'string',
            imageProfile: 'string',
        }
    }


}