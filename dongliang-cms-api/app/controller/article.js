'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  /**
   * 分类接口
   */

  //获取分类列表
  async getClass() {
    const { ctx, app } = this;
    const data = Array.from(await app.mysql.select("cms_article_class"))
    const article_data = Array.from(await app.mysql.query("select id,class_id from cms_article"))
    // 该分类下面的文章数量
    data.forEach(item1=>{
      article_data.forEach(item2=>{
        if(item2.class_id===item1.id){
          item1.article_total=item1.article_total?item1.article_total+1:1
        }
      })
    })
    if (data.length === 0) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    ctx.body = ctx.responseData("success", 200, data)
  }
  //根据id获取分类
  async getClassById() {
    const { ctx, app } = this;
    const params = ctx.params;
    if (!params.id) return ctx.body = ctx.responseData("缺少参数 id", 400)
    const article_data = await app.mysql.select("cms_article", {
      where: { id: params.id },
    })
    const data = await app.mysql.select("cms_article_class", {
      where: { id: params.id },
    })
    if (data.length === 0) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    ctx.body = ctx.responseData("success", 200, data[0])
  }
  //增加分类
  async addClass() {
    const { ctx, app, } = this;
    const reqBody = ctx.request.body;
    if (!reqBody.class_name) return ctx.body = ctx.responseData("缺少参数 class_name", 400)
    const data = await app.mysql.insert("cms_article_class", {
      class_name: reqBody.class_name
    })
    const result = {
      id: data.insertId,
      class_name: reqBody.class_name
    }

    ctx.body = ctx.responseData("success", 201, result)
  }
  //删除分类
  async deleteClass() {
    const { ctx, app } = this;
    const reqBody = ctx.request.body;
    if (!reqBody.id) return ctx.body = ctx.responseData("缺少参数 id", 400)
    if (reqBody.id<0) return ctx.body = ctx.responseData("该id不可删除", 400)
    const data = await app.mysql.delete("cms_article_class", {
      id: reqBody.id
    })
    const result = {
      id: reqBody.id,
    }
    if (data.affectedRows < 1) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    ctx.body = ctx.responseData("删除成功", 204, result)
  }
  //修改分类
  async updateClass() {
    const { ctx, app } = this;
    const body_params = ctx.request.body
    if (!body_params.id) return ctx.body = ctx.responseData("缺少参数 id", 400)
    if (!body_params.class_name) return ctx.body = ctx.responseData("缺少参数 class_name", 400)
    const data = await app.mysql.update("cms_article_class", {
      id: body_params.id,
      class_name: body_params.class_name
    })
    const result = {
      id: body_params.id,
      class_name: body_params.class_name
    }
    if (data.affectedRows < 1) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    ctx.body = ctx.responseData("修改成功", 201, result)
  }

  /**
  * 文章接口
  */
  //获取文章列表
  async getArticle() {
    const { ctx, app } = this;
    const query=ctx.query
    let data;
    if(query.id){
      data = await app.mysql.query(`select * from cms_article as a,cms_article_class as b where a.class_id=b.id and a.id=${query.id}`)
    }else if(query.class_id){
      data = await app.mysql.query(`select id,title,class_id,create_time from cms_article where class_id=${query.class_id}`)
    }else{
      data = await app.mysql.query(`SELECT a.id,title,class_id,class_name,a.create_time FROM cms_article AS a,cms_article_class AS b where a.class_id=b.id`)
    }
    ctx.body = ctx.responseData("success", 200, data)
  }

  //根据id获取文章
  async getArticleById() {
    const { ctx, app } = this;
    const query = ctx.query;
    if (!query.id) return ctx.body = ctx.responseData("缺少参数 id", 400)
    const data = await app.mysql.query(`select * from cms_article as a,cms_article_class as b where a.class_id=b.id`)
    if (data.length === 0) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    ctx.body = ctx.responseData("success", 200, data[0])
  }
  //添加文章
  async addArticle() {
    const { ctx, app, } = this;
    const reqBody = ctx.request.body;
    const insertData = {
      class_id: reqBody.class_id,
      title: reqBody.title,
      content: reqBody.content,
      create_time: new Date()
    }
    // if (!insertData.class_id) return ctx.body = ctx.responseData("缺少参数 class_id", 400)
    if (!insertData.title) return ctx.body = ctx.responseData("缺少参数 title", 400)
    if (!insertData.content) return ctx.body = ctx.responseData("缺少参数 content", 400)
    const data = await app.mysql.insert("cms_article", insertData)
    if (data.affectedRows < 1) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    insertData.id = data.insertId
    ctx.body = ctx.responseData("success", 201, insertData)
  }
  //删除文章
  async deleteArticle() {
    const { ctx, app, } = this;
    const reqBody = ctx.request.body;
    const paramData = {
      id: reqBody.id,
    }
    if (!paramData.id) return ctx.body = ctx.responseData("缺少参数 id", 400)
    const data = await app.mysql.query(`select id,title,class_id from cms_article where id=${paramData.id}`)
    if (data.affectedRows < 1) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    const data2 = await app.mysql.delete("cms_article", paramData)
    if (data2.affectedRows < 1) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    ctx.body = ctx.responseData("success", 204, data)
  }

  //修改文章
  async updateArticle() {
    const { ctx, app, } = this;
    const reqBody = ctx.request.body;
    const paramData = {
      id: reqBody.id,
      class_id: reqBody.class_id,
      title: reqBody.title,
      content: reqBody.content,
    }
    if (!paramData.id) return ctx.body = ctx.responseData("缺少参数 id", 400)
    if (!paramData.class_id) return ctx.body = ctx.responseData("缺少参数 class_id", 400)
    if (!paramData.title) return ctx.body = ctx.responseData("缺少参数 title", 400)
    if (!paramData.content) return ctx.body = ctx.responseData("缺少参数 content", 400)
    const data = await app.mysql.update("cms_article", paramData)
    if (data.affectedRows < 1) return ctx.body = ctx.responseData("请求的资源不存在", 404)
    ctx.body = ctx.responseData("success", 201, paramData)
  }
  //文章暂存
  // async tempSaveArticle() {
  //   const { ctx, app } = this;
  //   const { title, content } = ctx.request.body;
  //   const { id: article_id, class_id } = ctx.params
  //   if (!article_id) return ctx.body = ctx.responseData("缺少参数 id", 400)
  //   if (!class_id) return ctx.body = ctx.responseData("缺少参数 class_id", 400)
  //   if (!title) return ctx.body = ctx.responseData("缺少参数 title", 400)
  //   if (!content) return ctx.body = ctx.responseData("缺少参数 content", 400)
  //   const insertData = {
  //     article_id, class_id, title, content,
  //   }

  //   //判断暂存文章是否存在
  //   const data = await app.mysql.select("cms_article_temp", {
  //     where: { article_id }
  //   })
  //   //如果不存在,新建文章
  //   if (data.length < 1) {
  //     const data1 = await app.mysql.insert("cms_article_temp", insertData)
  //     if (data1.affectedRows < 1) return ctx.body = ctx.responseData("插入文章失败", 500)
  //     ctx.body = ctx.responseData("添加成功", 200, insertData)
  //   }

  //   //如果存在,更新文章
  //   if (data.length === 1) {
  //     const data1 = await app.mysql.update("cms_article_temp", insertData, {
  //       where: { article_id: data[0].id }
  //     })
  //     if (data1.affectedRows < 1) return ctx.body = ctx.responseData("更新文章失败", 500)
  //     ctx.body = ctx.responseData("更新成功", 200, insertData)
  //   }

  // }

  /**
   * 前端接口
   */
  async getMenuList() {
    const { ctx, app } = this;
    let article_class = await app.mysql.select("cms_article_class")
    if (article_class.length === 0) return ctx.body = ctx.responseData("请求的资源不存在", 404)

    let data = JSON.parse(JSON.stringify(article_class))
    for (let i = 0; i < data.length; i++) {
      const articles = await app.mysql.query(`select id,title,class_id,create_time from cms_article where class_id=${data[i].id}`)
      if (articles.length !== 0) {
        data[i].articles = articles
      }
    }

    ctx.body = ctx.responseData("success", 200, data)
  }

}

module.exports = ArticleController;
