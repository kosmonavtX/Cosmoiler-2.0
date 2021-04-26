var debug = require('debug')
var log = debug('cosmoiler:log')
//var logHome = debug('home:log')

//debug.disable()
localStorage.debug = 'cosmoiler:*'
//localStorage.debug = 'home:*'

//export {log as log, logHome as logHome}
export default log
