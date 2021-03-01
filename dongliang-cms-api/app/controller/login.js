'use strict';

const Controller = require("egg").Controller

class LoginController extends Controller {
  async login() {
    const { ctx,app } = this;
    const body=ctx.request.body
    const res= await app.mysql.query(`select * from cms_user where username='${body.username}' and password='${body.password}'`)
    ctx.body = res
  }
}

module.exports = LoginController
