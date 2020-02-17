import request from '../utils/request'

function getSwiperdata () {
  return request({
    url: '/api/public/v1/home/swiperdata'
  })
}

export {
  getSwiperdata
}
