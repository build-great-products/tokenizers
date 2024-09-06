/* eslint-disable @typescript-eslint/no-require-imports */

const { platform, arch } = process

let nativeBinding = null
let loadError = null

function isMusl() {
  const { glibcVersionRuntime } = process.report.getReport().header
  return !glibcVersionRuntime
}

switch (platform) {
  case 'darwin':
    try {
      nativeBinding = require('./tokenizers.darwin-universal.node')
    } catch {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          try {
            nativeBinding = require('./tokenizers.linux-x64-musl.node')
          } catch (e) {
            loadError = e
          }
        } else {
          try {
            nativeBinding = require('./tokenizers.linux-x64-gnu.node')
          } catch (e) {
            loadError = e
          }
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error('Failed to load native binding')
}

module.exports = nativeBinding
