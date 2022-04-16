const ArticlesDAO = require('../models/dao/ArticlesDAO')

class ArticlesController {
  constructor (db) {
    this.articlesDao = new ArticlesDAO(db)
    this.renderHomeWithArticles = this.renderHomeWithArticles.bind(this)
    this.renderSingleArticle = this.renderSingleArticle.bind(this)
    this.renderArticleCreationForm = this.renderArticleCreationForm.bind(this)
    this.renderArticleUpdateForm = this.renderArticleUpdateForm.bind(this)
    this.insertAndRenderArticle = this.insertAndRenderArticle.bind(this)
    this.updateAndRenderArticle = this.updateAndRenderArticle.bind(this)
    this.deleteArticleAndRenderResponse = this.deleteArticleAndRenderResponse.bind(this)
  }

  async renderHomeWithArticles (req, res) {
    const articles = await this.articlesDao.getAll()
    res.render('home', {
      articles
    })
  }

  async renderSingleArticle (req, res) {
    const id = req.params.id

    try {
      /* Ponemos en el try todo el código que dependa de la base de datos */
      const article = await this.articlesDao.getById(id)

      /* Dondequiera que solicitemos el article y
      puede que no lo consigamos, nos escudamos de
      este error (evitamos que la aplicación se caiga)
      mandamos como respuesta la página 404 */
      if (!article) {
        res.status(404).render('404')
        return
      }

      res.render('article', {
        id,
        title: article.title,
        content: article.content,
        img: article.img
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderArticleCreationForm (req, res) {
    res.render('article-form')
  }

  async renderArticleUpdateForm (req, res) {
    const id = req.params.id

    try {
      const article = await this.articlesDao.getById(id)

      if (!article) {
        res.status(404).render('404')
        return
      }

      res.render('article-form', {
        id,
        title: article.title,
        content: article.content
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderArticle (req, res) {
    const title = req.body.title
    const content = req.body.content
    const img = req.body.img
    const article = { title, content, img }

    try {
      const id = await this.articlesDao.create(article)

      res.redirect(`/articles/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderArticle (req, res) {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const img = req.body.img
    try {
      const article = { title, content, img, id }

      await this.articlesDao.update(article)

      res.redirect(`/articles/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteArticleAndRenderResponse (req, res) {
    const id = req.params.id
    try {
      const article = await this.articlesDao.getById(id)

      if (!article) {
        res.status(404).render('404')
        return
      }

      await this.articlesDao.delete(id)

      res.render('article-deleted', {
        id,
        title: article.title
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = ArticlesController
