var Promise = require('Promise');

export default {
  get(id) {
    return Promise.resolve({
      id: id,
      type: 'foo'
    });
  }
}
