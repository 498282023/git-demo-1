'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.cookies.set("cookie", "123456")
    ctx.body = 'hi, egg';
  }
  async login() {
    console.log(this.ctx.request.body)
    var username = this.ctx.request.body.username;
    var password = this.ctx.request.body.password;
    //密码md5加密
    // var password = await this.service.tools.md5(this.ctx.request.body.password);
    var code = this.ctx.request.body.verify;
    var result = await this.app.mysql.select("cms_user", {
      where: { username: username, password: password },
      columns: ["id", "username", "create_time"]
    });
    console.log("查询数据库的用户密码")
    console.log(result)
    if (result.length > 0) {
      //登录成功
      // 1.保存用户信息
      this.ctx.session.token = result[0].username;
      this.ctx.body = this.ctx.responseData("登录成功", 200, result[0])
    } else {
      this.ctx.body = this.ctx.responseData("登录失败", 400, null)
    }
  }
  async updateUser() {
    const {ctx}=this
    console.log(this.ctx.request.body)
    var username = this.ctx.request.body.username;
    var password = this.ctx.request.body.password;
    var newPassword = this.ctx.request.body.newPassword;
    //密码md5加密
    // var password = await this.service.tools.md5(this.ctx.request.body.password);
    if (!username) return ctx.body = ctx.responseData("缺少参数 username", 400)
    if (!password) return ctx.body = ctx.responseData("缺少参数 password", 400)
    if (!newPassword) return ctx.body = ctx.responseData("缺少参数 newPassword", 400)
    var code = this.ctx.request.body.verify;
    var result = await this.app.mysql.select("cms_user", {
      where: { username: username, password: password },
      columns: ["id", "username", "create_time"]
    });
    if (result.length > 0) {
      var result2 = await this.app.mysql.update(`cms_user`, {
        id: result[0].id,
        password: newPassword,
      })
      console.log(result2);
      this.ctx.body = this.ctx.responseData("修改密码成功", 200, result[0])
    } else {
      this.ctx.body = this.ctx.responseData("密码错误", 400,result)
    }
  }
}

module.exports = HomeController;
