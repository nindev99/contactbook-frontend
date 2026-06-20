import createApiClient from './api.service'
class ContactService {
  constructor(baseURL = '/api/contacts') {
    this.api = createApiClient(baseURL)
  }
  async getAll() {
    return (await this.api.get('/')).data
  }
  async create(contact) {
    return (await this.api.post('/', contact)).data
  }
  async deleteAll() {
    return (await this.api.delete(`/`)).data
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }
  async update(id, contact) {
    return (await this.api.put(`/${id}`, contact)).data
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}
export default new ContactService()
