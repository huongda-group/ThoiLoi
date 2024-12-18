import Config from './config';
import { DocumentCollection } from 'arangojs/collection';

export interface IDomain {
  _key?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const model = Config.collection('domain') as DocumentCollection<IDomain>;
model.exists().then((exists) => {
  if (!exists) {
    model.create({
      waitForSync: true,
    }).then(async () => {
      console.log('Collection domain created');
    });
  }
});

export default model;
