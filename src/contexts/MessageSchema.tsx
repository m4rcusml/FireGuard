    import Realm from 'realm';
    import { UserSchema} from './UserSchema';

    export class Message extends Realm.Object<Message> {
        _id!: Realm.BSON.ObjectId;
        text!: string;
        user!: UserSchema;
        image?: string;
        audio?: string;
        system?: boolean;
        sent?: boolean;
        recived?: boolean;
        pending?: boolean;
        createdAt?: Date;

        static schema: Realm.ObjectSchema = {
            name: 'Message',
            primaryKey: '_id',
            properties: {
                _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId },
                user: 'user',
                text: 'string',
                image: 'string?',
                audio: 'string?',
                system: 'bool?',
                sent: 'bool?',
                recived: 'bool?',
                pending: 'bool?',
                createdAt: 'date',
            }
        };

    }