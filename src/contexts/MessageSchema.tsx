import Realm from 'realm';
import { User } from './UserSchema';

export class Message extends Realm.Object<Message> {
    _id!: Realm.BSON.UUID;
    text!: string;
    user!: User;
    image?: string;
    audio?: string;
    system?: boolean;
    sent?: boolean;
    recived?: boolean;
    pending?: boolean;

    static schema: Realm.ObjectSchema = {
        name: 'Message',
        primaryKey: '_id',
        properties: {
            _id: { type: 'uuid', default: () => new Realm.BSON.UUID },
            user: 'User',
            text: 'string',
            image: 'string',
            audio: 'string',
            system: 'bool',
            sent: 'bool',
            recived: 'bool',
            pending: 'bool',
        }
    };

}