
export default {
  get(id, cb) {
    console.log('GET', id);

    cb(null, {
      id: id,
      type: 'foo',
      location: '/foo/' + id
    });
  },
  put(id, name, cb) {
    console.log('PUT', id, name);

    cb(null, {
      id: id,
      name: name,
      type: 'updated-foo',
      location: '/foo/' + id
    });
  },
  post(name, cb) {
    console.log('POST', name);
    var id = Math.floor(Math.random() * 100) + 1;

    cb(null, {
      id: id,
      name: name,
      type: 'created-foo',
      location: '/foo/' + id
    });
  }
}
