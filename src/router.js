const express = require('express') // mi estructura
const ArticlesController = require('./controllers/ArticlesController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const articlesController = new ArticlesController(sqlClient)

// Routes. OJO a través del router, uno puede pasarle parámetros a las vistas.

router.get('/', articlesController.renderHomeWithArticles)
router.get('/about', pageController.renderAbout)

router.get('/articles/create', articlesController.renderArticleCreationForm) // Cuando nos piden info GET
router.post('/articles/create', articlesController.insertAndRenderArticle) // Cuando nos mandan info POST

router.get('/articles/:id', articlesController.renderSingleArticle)
router.get('/articles/:id/update', articlesController.renderArticleUpdateForm)
router.post('/articles/:id/update', articlesController.updateAndRenderArticle)

router.post('/articles/:id/delete', articlesController.deleteArticleAndRenderResponse)
router.get('*', pageController.renderNotFound) // Éste SIEMPRE al último

module.exports = router
