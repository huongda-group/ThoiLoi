import Config from './config';
import { DocumentCollection } from 'arangojs/collection';

export interface IGroup {
  _key?: string;
  name: string;
  domain: string;
  createdAt: Date;
  updatedAt: Date;
}

const model = Config.collection('group') as DocumentCollection<IGroup>;
model.exists().then((exists) => {
  if (!exists) {
    model.create({
      waitForSync: true,
    }).then(() => {
      console.log('Collection group created');
    });
  }
});

export default model;
