# Carlin
> A wrapper for pug, compiling views only when necessary.

## Why?
I made this repository initially for electron projects, because I needed a way to generate html views without much hassle, and writing this code for multiple projects seemed inefficient.

## Example

```javascript
const carlin = require('carlin');
carlin.settings({
  outDir: './out/'
});

// compile will return the basename of the file without the extension.
const reference = carlin.compile('./src/myView.pug');
// reference should equal "myView" at this point.

// Compile will only compile the view if the modification time on the source is newer than the output from a previous compilation. To get around this, we can pass a boolean to it to forcefully compile it.
carlin.compile('./src/myView.pug', true);

// get returns the html file it compiled earlier. This allows us to throw it into an electron view easily and quickly.
carlin.get(reference);
```

## Todo
- [ ] Make source files with the same basename return a different reference
