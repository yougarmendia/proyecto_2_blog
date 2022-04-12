class ArticlesController {
  renderHomeWithArticles (req, res) {
    const mockArticles = [
      {id:1, title: 'Artículo de prueba 1', content: 'Contenido de mi artículo'},
      {id:2, title: 'Artículo de prueba 2', content: 'Contenido de mi artículo'}
    ]
    res.render('home', {
      articles: mockArticles
    })
  }

  renderSingleArticle (req, res) {
    const id = req.params.id

    res.render('article', {
      id,
      title: 'Éste es el título',
      content: 'Éste es el contenido'
    })
  }

  renderArticleCreationForm (req, res) {
    res.render('article-form')
  }

  renderArticleUpdateForm (req, res) {
    const id = req.params.id

    res.render('article-form', {
      id,
      title: 'Título del artículo a editar',
      content: 'Contenido del artículo a editar'
    })
  }

  insertAndRenderArticle (req, res) {
    const title = req.body.title
    const content = req.body.content

    console.log('Aquí se debería insertar el contenido en la db', {title, content})
    const id = 1

    res.redirect(`/articles/${id}`)
  }

  deleteArticleAndRenderResponse (req, res) {
    const id = req.params.id
    console.log('Esto debería eliminar', { id })

    res.render('article-deleted', {
      id,
      title: 'Título'
    })
  }
}

module.exports = ArticlesController
