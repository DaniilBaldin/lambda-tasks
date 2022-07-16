import { ObjectId } from 'mongodb';

export class jsonUrl {
    constructor(public url: string) {}
}

export class jsonBody {
    constructor(public body: object, public id?: ObjectId) {}
}
