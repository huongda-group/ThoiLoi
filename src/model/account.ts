import Config from './config';
import { DocumentCollection } from 'arangojs/collection';

export interface IAccount {
  _key?: string; // you can use multiple address
  domain: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const model = Config.collection('account') as DocumentCollection<IAccount>;
model.exists().then((exists) => {
  if (!exists) {
    model.create({
      waitForSync: true,
    }).then(async () => {
      console.log('Collection account created');
    });
  }
});

export default model;
