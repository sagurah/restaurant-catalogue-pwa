import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(req) {
    const cache = await this._openCache();
    cache.addAll(req);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(req) {
    const response = await caches.match(req);

    if (response) {
      this._fetchRequest(req);
      return response;
    }

    return this._fetchRequest(req);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(req) {
    const response = await fetch(req);

    if (!response || response.status !== 200) {
      return response;
    }

    await this._addCache(req);
    return response;
  },

  async _addCache(req) {
    const cache = await this._openCache();
    cache.add(req);
  },
};

export default CacheHelper;
