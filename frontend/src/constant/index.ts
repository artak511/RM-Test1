export const SERVER_URL = process.env.REACT_APP_BACKEND_URI || 'http://localhost:8000';
export const defaultPerPageCount = 10;

export const Paths = {
  source: {
    list: '/',
    addEdit: '/source/:id'
  }
}

export const Urls = {
  source: {
    list: '/sources',
    add: '/sources',
    get: (id: number) => `/sources/${id}`,
    edit: (id: number) => `/sources/${id}`,
    delete: (id: number) => `/sources/${id}`,
    getTags: '/sources/tags',
  }
}