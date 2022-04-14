// DAO = 'Database access object'
// 1 DAO por tabla.
// El DAO es el que tiene el CRUD (SELECT es Read)
// Acá va TODA la lógica de la db
class ArticlesDAO {
  constructor (dbClient) {
    /*
    "ArticlesDAO" reemplazará a "this" cuando se le llame externamente, por ejemplo: this.db quiere decir que para realizar la llamada al cliente de la base de datos, deberemos llamarla ArticlesDAO.db
    Si queremos llamar a la función getAll desde afuera, sería: ArticlesDAO.getAll() y así sucesivamente:
    ArticlesDAO.create
    ArticlesDAO.update
    ArticlesDAO.delete
    */

    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  // Éstas son las funciones que, en su interior ejecutarán las instrucciones SQL

  // getAll traerá todas las rows de la db
  // this.db es el cliente SQL
  async getAll () {
    const response = await this.db.query('SELECT id, title, content FROM articles')
    const rows = response[0]
    return rows // Devolvemos lo primero que traemos
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title, content FROM articles WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (article) {
    const response = await this.db.query('INSERT INTO articles (title, content) VALUES (?,?)', [article.title, article.content])
    const result = response[0]
    return result.insertId
  }

  async update (article) {
    const response = await this.db.query('UPDATE articles SET title = ?, content = ? WHERE id = ?', [article.title, article.content, article.id])
    const result = response[0]
    return result[0]
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM articles WHERE id = ?', [id])
    const result = response[0]
    return result[0]
  }
}

module.exports = ArticlesDAO
