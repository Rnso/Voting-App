export const serverUrl = 'https://voting-ground.herokuapp.com'



let session  = typeof sessionStorage['obj'] !=  'undefined' ? JSON.parse(sessionStorage.obj) : ''
export const USERID = session._id