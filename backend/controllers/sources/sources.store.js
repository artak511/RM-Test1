const today = new Date();
const yesterday = today.setDate(today.getDate() - 1);

const options = {
  credentials: {
    domain: "",
    username: "testUsername",
    password: "testPassword",
  },
  updatedAt: yesterday,
  createdAt: today,
}

const initialData = [
  {ipAddress: "127.0.0.1", name: "First Source", tags: ['east', 'usa'], ...options},
  {ipAddress: "127.0.0.2", name: "Second Source", tags: ['west', 'usa'], ...options},
  {ipAddress: "127.0.0.3", name: "Source 3", tags: ['europe', 'spain', 'west'], ...options},
  {ipAddress: "127.0.0.4", name: "Source 4", tags: ['europe', 'France'], ...options},
  {ipAddress: "127.0.0.5", name: "Source 5", tags: ['europe', 'tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.6", name: "Source 6", tags: ['spain', 'tag3', 'tag2'], ...options},
  {ipAddress: "127.0.0.7", name: "Source 7", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.8", name: "Source 8", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.9", name: "Source 9", tags: ['europe', 'tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.10", name: "Source 10", tags: ['tag9', 'tag2'], ...options},
  {ipAddress: "127.0.0.11", name: "Source 11", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.12", name: "Source 12", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.13", name: "Source 13", tags: ['tag1', 'tag3'], ...options},
  {ipAddress: "127.0.0.14", name: "Source 14", tags: ['europe', 'tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.15", name: "Source 15", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.16", name: "Source 16", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.17", name: "Source 17", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.18", name: "Source 18", tags: ['spain', 'tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.19", name: "Source 19", tags: ['tag4', 'tag5'], ...options},
  {ipAddress: "127.0.0.20", name: "Source 20", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.21", name: "Source 21", tags: ['tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.22", name: "Source 22", tags: ['spain', 'tag1', 'tag2'], ...options},
  {ipAddress: "127.0.0.23", name: "Source 23", tags: ['tag1', 'tag2'], ...options},
];

class Sources extends Array {
  constructor(elements) {
    super();

    this.lastId = 1;

    if (elements && elements.length) {
      elements.forEach(element => this.create(element));
    }
  }

  getById(id) {
    return this.find(source => source.id === +id);
  }

  create(element) {
    element.id = this.lastId++;
    super.push(element);

    return element;
  }

  update(id, payload) {
    const source = this.getById(id);

    if (!source) {
      return false;
    }

    return Object.assign(source, payload);
  }

  delete(id) {
    const index = this.findIndex(source => source.id === +id);

    if (index < 0) {
      return false;
    }

    return this.splice(index, 1);
  }
}


module.exports = new Sources(initialData);