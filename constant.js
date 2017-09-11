
export const serverUrl = 'http://localhost:3000'

let session  = typeof sessionStorage['obj'] !=  'undefined' ? JSON.parse(sessionStorage.obj) : ''
export const USERID = session._id