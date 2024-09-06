/* eslint-disable @typescript-eslint/no-require-imports */

import * as process from 'node:process'

const { platform, arch } = process

let nativeBinding = null
let loadError = null

function isMusl() {
  // @ts-expect-error
  const { glibcVersionRuntime } = process.report.getReport().header
  return !glibcVersionRuntime
}

switch (platform) {
  case 'darwin':
    try {
      nativeBinding = await require('./tokenizers.darwin-universal.node')
    } catch {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          try {
            // @ts-expect-error
            nativeBinding = await require('./tokenizers.linux-x64-musl.node')
          } catch (e) {
            loadError = e
          }
        } else {
          try {
            // @ts-expect-error
            nativeBinding = await require('./tokenizers.linux-x64-gnu.node')
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

const {
  Decoder,
  bpeDecoder,
  byteFallbackDecoder,
  ctcDecoder,
  fuseDecoder,
  metaspaceDecoder,
  replaceDecoder,
  sequenceDecoder,
  stripDecoder,
  wordPieceDecoder,
  Encoding,
  TruncationDirection,
  TruncationStrategy,
  Model,
  BPE,
  WordPiece,
  WordLevel,
  Unigram,
  Normalizer,
  prependNormalizer,
  stripAccentsNormalizer,
  bertNormalizer,
  nfdNormalizer,
  nfkdNormalizer,
  nfcNormalizer,
  nfkcNormalizer,
  stripNormalizer,
  sequenceNormalizer,
  lowercase,
  replace,
  nmt,
  precompiled,
  JsSplitDelimiterBehavior,
  PreTokenizer,
  byteLevelPreTokenizer,
  byteLevelAlphabet,
  whitespacePreTokenizer,
  whitespaceSplitPreTokenizer,
  bertPreTokenizer,
  metaspacePreTokenizer,
  splitPreTokenizer,
  punctuationPreTokenizer,
  sequencePreTokenizer,
  charDelimiterSplit,
  digitsPreTokenizer,
  Processor,
  bertProcessing,
  robertaProcessing,
  byteLevelProcessing,
  templateProcessing,
  sequenceProcessing,
  PaddingDirection,
  AddedToken,
  Tokenizer,
  Trainer,
  slice,
  mergeEncodings,
} = nativeBinding

export {
  Decoder,
  bpeDecoder,
  byteFallbackDecoder,
  ctcDecoder,
  fuseDecoder,
  metaspaceDecoder,
  replaceDecoder,
  sequenceDecoder,
  stripDecoder,
  wordPieceDecoder,
  Encoding,
  TruncationDirection,
  TruncationStrategy,
  Model,
  BPE,
  WordPiece,
  WordLevel,
  Unigram,
  Normalizer,
  prependNormalizer,
  stripAccentsNormalizer,
  bertNormalizer,
  nfdNormalizer,
  nfkdNormalizer,
  nfcNormalizer,
  nfkcNormalizer,
  stripNormalizer,
  sequenceNormalizer,
  lowercase,
  replace,
  nmt,
  precompiled,
  JsSplitDelimiterBehavior,
  PreTokenizer,
  byteLevelPreTokenizer,
  byteLevelAlphabet,
  whitespacePreTokenizer,
  whitespaceSplitPreTokenizer,
  bertPreTokenizer,
  metaspacePreTokenizer,
  splitPreTokenizer,
  punctuationPreTokenizer,
  sequencePreTokenizer,
  charDelimiterSplit,
  digitsPreTokenizer,
  Processor,
  bertProcessing,
  robertaProcessing,
  byteLevelProcessing,
  templateProcessing,
  sequenceProcessing,
  PaddingDirection,
  AddedToken,
  Tokenizer,
  Trainer,
  slice,
  mergeEncodings,
}
