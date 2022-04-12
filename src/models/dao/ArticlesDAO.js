// DAO = 'Database access object'
// 1 DAO por tabla.
// El DAO es el que tiene el CRUD (SELECT es Read)
// Acá va TODA la lógica de la db
class ArticleDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update(this)
    this.delete = this.delete(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title, content FROM articles')
    return response[0] // Devolvemos lo primero que traemos
  }

  async getById (id) {}

  async create (article) {}

  async update (article) {}

  async delete (id) {}
}

module.exports = ArticleDAO
