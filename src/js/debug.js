var debug = require('debug')
var logger = debug('cosmoiler:logger')
var log = debug('cosmoiler:log2')
//var logHome = debug('home:log')

//debug.enable('connection')
debug.enable('test')
//debug.disable()

localStorage.debug = 'cosmoiler:*'
//localStorage.debug = 'home:*'

//export {log as log, logHome as logHome}
export {logger, log, debug}
