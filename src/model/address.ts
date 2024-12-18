import Config from './config';
import { DocumentCollection } from 'arangojs/collection';

export interface IAddress {
  _key?: string; // Email address
  domain: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
}

const model = Config.collection('address') as DocumentCollection<IAddress>;
model.exists().then((exists) => {
  if (!exists) {
    model.create({
      waitForSync: true,
    }).then(async () => {
      console.log('Collection address created');
    });
  }
});

export default model;
