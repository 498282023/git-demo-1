module.exports={
  responseData(msg,status,data){
    const res={
      meta:{
        msg,status
      },
      data
    }
    return res
  },
  //确认参数是否存在，如果不存在，返回该参数的名称
  checkParams(sourceParam,targetParam){
    if (!sourceParam) return this.body = this.responseData(`缺少参数 ${targetParam}`, 400, null)
  }
  
}