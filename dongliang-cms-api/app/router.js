'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.home.login);
  router.put('/login', controller.home.updateUser);

  router.get('/article/class', controller.article.getClass);
  router.post('/article/class', controller.article.addClass);
  router.delete('/article/class', controller.article.deleteClass);
  router.put('/article/class', controller.article.updateClass);

  router.get('/article/getArticleList', controller.article.getArticleList);
  router.get('/article/getArticleById', controller.article.getArticleById);
  router.post('/article/addArticle', controller.article.addArticle);
  router.put('/article/updateArticle', controller.article.updateArticle);
  router.delete('/article/deleteArticle', controller.article.deleteArticle);

};
