const mysql = require('mysql2/promise')

class SqlClient {
  constructor () {
    this.pool = mysql.createPool({ uri: process.env.DATABASE_URL })
    this.query = this.query.bind(this) // Código basura necesario
  }

  // Método para hacer consultas de escritura y lectura
  async query (sql, params) {
    const connection = await this.pool.getConnection() // Abrimos
    const response = await connection.execute(sql, params) // Ejecutamos
    connection.release() // Cerramos
    return response // Devolvemos la respuesta obtenida
  }
}

module.exports = SqlClient
