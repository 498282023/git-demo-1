'use strict';
const Service = require('egg').Service;
class DataService extends Service {
  async getData() {
    const result = await this.app.mysql.select('pet');
    return {result};
  }
}
module.exports = DataService;