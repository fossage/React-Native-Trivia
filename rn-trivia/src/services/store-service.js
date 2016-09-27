import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

let _storage;

const Store = {
   config({
    sync = {},
    size = 1000,
    storageBackend = AsyncStorage,
    defaultExpires = (1000 * 3600 * 24),
    enableCache = true
  }) {
    if(!_storage) _storage = new Storage({
      sync,
      size,
      storageBackend,
      defaultExpires,
      enableCache
    });
  },

  save(opts) {
    return _storage.save(opts);
  },

  load(opts) {
    return _storage.load(opts);
  },

  getIdsForKey(key) {
    return _storage.getIdsForKey(key)
  },

  getAllDataForKey(key) {
    return _storage.getAllDataForKey(key)
  },

  clearMapForKey(key) {
    return _storage.clearMapForKey(key)
  },

  remove(opts) {
    return _storage.remove(opts);
  },

  clearMap() {
    return _storage.clearMap();
  },

  getBatchedData(items) {
    return _storage.getBatchedData(items);
  },

  getBatchedDataWithIds(opts) {
    return _storage.getBatchedDataWithIds(opts);
  }
};

export default Store;