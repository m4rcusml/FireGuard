import Realm from 'realm';

export type UserType = {
    _id: Realm.BSON.ObjectId;
    name: string;
}

export const userSchema = {
    name: 'user',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        name: 'string',
    },
}