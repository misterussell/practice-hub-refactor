import RootStore from './collections/RootStore';
import Prebuilts from './models/GOLPatterns';
import CSVJSONconverter from './models/CSVJSONconverter';

export default {
  rootStore: new RootStore(),
  prebuilts: Prebuilts,
};
