class PageController {
  renderHome (req, res) {
    res.render('home')
  }

  renderNotFound (req, res) {
    res.render('404')
  }

  renderAbout (req, res) {
    res.render('about')
  }
}

module.exports = PageController
