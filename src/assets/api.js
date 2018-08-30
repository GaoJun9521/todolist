import { http } from '@/assets/http'

export const add = (data) => http.post('/add', data).catch()
export const remove = (data) => http.post('/remove', data).catch()
export const update = (data) => http.post('/update', data).catch()
export const done = (data) => http.post('/done', data).catch()
export const get = (data) => http.post('/get', data).catch()
