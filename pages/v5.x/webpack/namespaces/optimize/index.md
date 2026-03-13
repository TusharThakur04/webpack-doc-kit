# optimize

## Namespaces

- [InnerGraph](namespaces/InnerGraph.md)

## Class: `AggressiveMergingPlugin`

### Constructors

#### Constructor

* `options` {AggressiveMergingPluginOptions}
* Returns: {AggressiveMergingPlugin}

### Properties

* `options` {AggressiveMergingPluginOptions}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin

***

## Class: `AggressiveSplittingPlugin`

### Constructors

#### Constructor

* `options` {AggressiveSplittingPluginOptions}
* Returns: {AggressiveSplittingPlugin}

### Properties

* `options` {AggressiveSplittingPluginOptions}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin

#### Static method: `wasChunkRecorded(chunk)`

* `chunk` {Chunk}
* Returns: {boolean}

***

## Class: `LimitChunkCountPlugin`

### Constructors

#### Constructor

* `options` {LimitChunkCountPluginOptions}
* Returns: {LimitChunkCountPlugin}

### Properties

* `options` {LimitChunkCountPluginOptions}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

***

## Class: `MergeDuplicateChunksPlugin`

### Constructors

#### Constructor

* `options` {MergeDuplicateChunksPluginOptions}
* Returns: {MergeDuplicateChunksPlugin}

### Properties

* `options` {MergeDuplicateChunksPluginOptions}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

***

## Class: `MinChunkSizePlugin`

### Constructors

#### Constructor

* `options` {MinChunkSizePluginOptions}
* Returns: {MinChunkSizePlugin}

### Properties

* `options` {MinChunkSizePluginOptions}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin

***

## Class: `ModuleConcatenationPlugin`

### Constructors

#### Constructor

* Returns: {ModuleConcatenationPlugin}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin

***

## Class: `RealContentHashPlugin`

### Constructors

#### Constructor

* `__namedParameters` {RealContentHashPluginOptions}
* Returns: {RealContentHashPlugin}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin

#### Static method: `getCompilationHooks(compilation)`

* `compilation` {Compilation}
* Returns: {CompilationHooksRealContentHashPlugin}

***

## Class: `RuntimeChunkPlugin`

### Constructors

#### Constructor

* `options` {object}
* Returns: {RuntimeChunkPlugin}

### Properties

* `options` {object}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin

***

## Class: `SideEffectsFlagPlugin`

### Constructors

#### Constructor

* `analyseSource` {boolean}
* Returns: {SideEffectsFlagPlugin}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin

#### Static method: `moduleHasSideEffects(moduleName, flagValue, cache)`

* `moduleName` {string}
* `flagValue` {SideEffectsFlagValue}
* `cache` {Map}
* Returns: {boolean}

***

## Class: `SplitChunksPlugin`

### Constructors

#### Constructor

* `options` {OptimizationSplitChunksOptions}
* Returns: {SplitChunksPlugin}

### Properties

* `options` {SplitChunksOptions}

### Methods

#### `apply(compiler)`

* `compiler` {Compiler}
* Returns: {void}

Apply the plugin
