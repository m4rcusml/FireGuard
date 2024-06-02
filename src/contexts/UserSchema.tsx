import Realm from 'realm';

export class UserSchema extends Realm.Object<UserSchema> {
    _id!: Realm.BSON.ObjectId;
    userId!: string;
    name!: string;
    imageProfile?: string;

    static schema: Realm.ObjectSchema = {
        name: 'user',
        primaryKey: '_id',
        properties: {
            _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId },
            name: 'string',
            userId: 'string',
            imageProfile: 'string',
        }
    }


}