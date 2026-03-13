# sources

## Class: `CachedSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `source` {Source|object}
* `cachedData` {CachedData}
* Returns: {CachedSource}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `getCachedData()`

* Returns: {CachedData}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `original()`

* Returns: {Source}

#### `originalLazy()`

* Returns: {Source|object}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `streamChunks(options, onChunk, onSource, onName)`

* `options` {StreamChunksOptions}
* `onChunk` {object}
* `onSource` {object}
* `onName` {object}
* Returns: {GeneratedSourceInfo}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `CompatSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `sourceLike` {SourceLike}
* Returns: {CompatSource}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

#### Static method: `from(sourceLike)`

* `sourceLike` {SourceLike}
* Returns: {Source}

***

## Class: `ConcatSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `args` {ConcatSourceChild[]}
* Returns: {ConcatSource}

### Methods

#### `add(item)`

* `item` {ConcatSourceChild}
* Returns: {void}

#### `addAllSkipOptimizing(items)`

* `items` {ConcatSourceChild[]}
* Returns: {void}

#### `buffer()`

* Returns: {Buffer}

#### `getChildren()`

* Returns: {Source[]}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `streamChunks(options, onChunk, onSource, onName)`

* `options` {StreamChunksOptions}
* `onChunk` {object}
* `onSource` {object}
* `onName` {object}
* Returns: {GeneratedSourceInfo}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `OriginalSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `value` {string|Buffer}
* `name` {string}
* Returns: {OriginalSource}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `getName()`

* Returns: {string}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `streamChunks(options, onChunk, onSource, _onName)`

* `options` {StreamChunksOptions}
* `onChunk` {object}
* `onSource` {object}
* `_onName` {object}
* Returns: {GeneratedSourceInfo}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `PrefixSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `prefix` {string}
* `source` {string|Buffer|Source}
* Returns: {PrefixSource}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `getPrefix()`

* Returns: {string}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `original()`

* Returns: {Source}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `streamChunks(options, onChunk, onSource, onName)`

* `options` {StreamChunksOptions}
* `onChunk` {object}
* `onSource` {object}
* `onName` {object}
* Returns: {GeneratedSourceInfo}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `RawSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `value` {string|Buffer}
* `convertToString` {boolean}
* Returns: {RawSource}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `isBuffer()`

* Returns: {boolean}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `streamChunks(options, onChunk, onSource, onName)`

* `options` {StreamChunksOptions}
* `onChunk` {object}
* `onSource` {object}
* `onName` {object}
* Returns: {GeneratedSourceInfo}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `ReplaceSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `source` {Source}
* `name` {string}
* Returns: {ReplaceSource}

### Properties

* `Replacement` {Replacement}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `getName()`

* Returns: {string}

#### `getReplacements()`

* Returns: {Replacement[]}

#### `insert(pos, newValue[, name])`

* `pos` {number}
* `newValue` {string}
* `name` {string}
* Returns: {void}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `original()`

* Returns: {Source}

#### `replace(start, end, newValue[, name])`

* `start` {number}
* `end` {number}
* `newValue` {string}
* `name` {string}
* Returns: {void}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `streamChunks(options, onChunk, onSource, onName)`

* `options` {StreamChunksOptions}
* `onChunk` {object}
* `onSource` {object}
* `onName` {object}
* Returns: {GeneratedSourceInfo}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `SizeOnlySource`

### Extends

- {Source}

### Constructors

#### Constructor

* `size` {number}
* Returns: {SizeOnlySource}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `Source`

### Extended by

- {RawSource}
- {OriginalSource}
- {ReplaceSource}
- {SourceMapSource}
- {ConcatSource}
- {PrefixSource}
- {CachedSource}
- {SizeOnlySource}
- {CompatSource}

### Constructors

#### Constructor

* Returns: {Source}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}

***

## Class: `SourceMapSource`

### Extends

- {Source}

### Constructors

#### Constructor

* `value` {string|Buffer}
* `name` {string}
* `sourceMap` {string|Buffer|RawSourceMap}
* `originalSource` {string|Buffer}
* `innerSourceMap` {string|Buffer|RawSourceMap}
* `removeOriginalSource` {boolean}
* Returns: {SourceMapSource}

### Methods

#### `buffer()`

* Returns: {Buffer}

#### `getArgsAsBuffers()`

* Returns: {Buffer|string|Buffer|Buffer|Buffer|boolean}

#### `map([options])`

* `options` {MapOptions}
* Returns: {RawSourceMap}

#### `size()`

* Returns: {number}

#### `source()`

* Returns: {SourceValue}

#### `sourceAndMap([options])`

* `options` {MapOptions}
* Returns: {SourceAndMap}

#### `streamChunks(options, onChunk, onSource, onName)`

* `options` {StreamChunksOptions}
* `onChunk` {object}
* `onSource` {object}
* `onName` {object}
* Returns: {GeneratedSourceInfo}

#### `updateHash(hash)`

* `hash` {HashLike}
* Returns: {void}
