# webpack-hasjs-plugin

This plugin performs has.js filtering on source modules based on a statically defined set of features.  Feature conditionals who's values are defined in the static feature set are replaced with the value of the feature. The resulting dead code will then be pruned by the uglifier.

For example, the following code:

```javascript
if (has('foo')) {
  console.log('foo');
} else {
  console.log('!foo');
}
```

with these options:

```javascript
{
 features: {foo: true}
}
```

will yield the following output

```javascript
if (true) {
  console.log('foo');
} else {
  console.log('!foo');
}
```

After the uglifier prunes dead code branches, only the call to `console.log('foo')` will remain.  If a feature is not defined in the static feature set, then the code using that feature is unaffected unless the option [coerceUndefinedToFalse](#coerceundefinedtofalse) is truthy, in which case the result will be as if the feature had been defined with a value of false.  The values of the statically defined features may be number, boolean, or string.  Any other types are ignored.

## Install

```bash
npm i -D webpack-hasjs-plugin
```
## Usage

```javascript
// webpack.config.js
var HasJsPlugin = require('webpack-hasjs-plugin');

module.exports = {
  // ... snip ...
  plugins: [
    new HasJsPlugin({
			features: {
				foo: true,
				bar: false
			}
		})
  ],
  // ... snip ...
}
```

## Options

#### features

Properties map of feature name/value pairs.

#### coerceUndefinedToFalse

If true, then any calls to the `has` function which specify a feature not declared in [features](#features) will be treated as if the feature had been defined with a value of false.

## Limitations

Due to limitations in the webpack parser, this plugin does not transform the source when the
`has()` function call is a member of a comparison operator involving greater-than or less-than (e.g. `if (has('ie') >= 10)`), or if it used in an assignment (e.g. `var foo = has('foo') && getFoo();`).  It does work, however, if the result of the ternary operator (e.g. `var foo=has('foo')?getFoo():undefined;`) is used in the assignment.

Also, note that when using the equality operators ==, ===, != and !==, webpack unfortunately fails to transform the source if the operands are not the same type, regardless of their  values.  So the code `if(has('foo')===0)` will be transformed if the value of the statically defined feature `foo` is a number, but not if it is any other type.

Fortunately, these problematic usage patterns are not common, and if they are encountered, the code is simply left alone, so they are not harmful.
