
export default {
  get(id, cb) {
    console.log('GET', id);

    cb(null, {
      id: id,
      type: 'foo'
    });
  },
  put(id, name, cb) {
    console.log('PUT', id, name);

    cb(null, {
      id: id,
      name: name,
      type: 'updated-foo'
    });
  },
  post(name, cb) {
    console.log('POST', name);

    cb(null, {
      name: name,
      type: 'created-foo'
    });
  },
  delete(id, cb) {
    console.log('DELETE', id);

    cb(null, {
      id: id,
      type: 'deleted-foo'
    });
  }
}
