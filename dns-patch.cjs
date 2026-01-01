const dns = require('dns')
const originalLookup = dns.lookup

dns.lookup = (hostname, options, callback) => {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  if (hostname === 'surge.surge.sh' || hostname === 'surge.sh') {
    console.log(`Monkey-patching DNS for ${hostname}`)
    console.log('Options:', options)

    const ip = hostname === 'surge.surge.sh' ? '192.241.214.148' : '138.197.235.123'

    if (options && options.all) {
      process.nextTick(() => callback(null, [{ address: ip, family: 4 }]))
    } else {
      process.nextTick(() => callback(null, ip, 4))
    }
    return
  }
  return originalLookup(hostname, options, callback)
}
