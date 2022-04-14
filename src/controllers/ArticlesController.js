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

    const article = await this.articlesDao.getById(id)

    res.render('article', {
      id,
      title: article.title,
      content: article.content
    })
  }

  renderArticleCreationForm (req, res) {
    res.render('article-form')
  }

  async renderArticleUpdateForm (req, res) {
    const id = req.params.id

    const article = await this.articlesDao.getById(id)

    res.render('article-form', {
      id,
      title: article.title,
      content: article.content
    })
  }

  async insertAndRenderArticle (req, res) {
    const title = req.body.title
    const content = req.body.content

    const article = { title, content }

    const id = await this.articlesDao.create(article)

    res.redirect(`/articles/${id}`)
  }

  async updateAndRenderArticle (req, res) {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content

    const article = { title, content, id }

    await this.articlesDao.update(article)

    res.redirect(`/articles/${id}`)
  }

  async deleteArticleAndRenderResponse (req, res) {
    const id = req.params.id
    // const article = await this.articlesDao.delete(id)
    const article = await this.articlesDao.getById(id)

    await this.articlesDao.delete(id)

    res.render('article-deleted', {
      id,
      title: article.title
    })
  }
}

module.exports = ArticlesController
