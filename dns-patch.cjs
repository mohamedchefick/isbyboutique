const dns = require('dns')
const originalLookup = dns.lookup

dns.lookup = (hostname, options, callback) => {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  if (
    hostname === 'surge.surge.sh' ||
    hostname === 'surge.sh' ||
    hostname === 'api.sendinblue.com' ||
    hostname === 'api.brevo.com'
  ) {
    console.log(`Monkey-patching DNS for ${hostname}`)
    console.log('Options:', options)

    let ip
    if (hostname === 'surge.surge.sh') ip = '192.241.214.148'
    else if (hostname === 'surge.sh') ip = '138.197.235.123'
    else ip = '141.101.90.106' // api.sendinblue.com / api.brevo.com

    if (options && options.all) {
      process.nextTick(() => callback(null, [{ address: ip, family: 4 }]))
    } else {
      process.nextTick(() => callback(null, ip, 4))
    }
    return
  }
  return originalLookup(hostname, options, callback)
}
