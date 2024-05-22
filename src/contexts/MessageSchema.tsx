import Realm from 'realm';
import { userSchema, UserType } from './UserSchema';

export type MEssageType = {
    _id: Realm.BSON.ObjectId;
    text: string;
    user: UserType;
    image: string;
    video: string;
    audio: string;
    system: boolean;
    sent: boolean;
    recived: boolean;
    pending: boolean;
}





export const MessageSchema = {
    name: 'message',
    primaryKey: '_id',
    properties: {
        _id: 'objectId',
        name: 'string',
        user: 'user',
        createdAt: 'int',
    },
}