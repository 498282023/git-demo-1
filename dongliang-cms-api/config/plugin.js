'use strict';
/** @type Egg.EggPlugin */
module.exports = {
  mysql : {
    enable: true,
    package: 'egg-mysql',
  },
  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  }
  
};
