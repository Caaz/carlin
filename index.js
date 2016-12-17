// Holy hell alright what the hell do I need to do now..
const fs = require('fs')
const path = require('path')
const pug = require('pug')

const settings = {
  outDir: './',
  pugOptions: {}
}
const views = {}

module.exports = {
  settings: object => {
    for(const key in object) {
      settings[key] = object[key]
    }
  },
  compile: (src, compile) => {
    const name = path.basename(src, path.extname(src))
    const view = settings.outDir + name + '.html'
    if((!compile) && (fs.existsSync(view))) {
      if (fs.fstatSync(view).mtime.getTime() <= fs.fstatSync(src).mtime.getTime()) {
        compile = true
      }
    } else {
      // Either compile was already true, or we didn't have a file already compiled, so compile.
      compile = true
    }
    if(compile) {
      const html = pug.renderFile(src, settings.pugOptions)
      fs.writeFileSync(view, html)
    }
    views[name] = view
    return name
  },
  get: name => {
    return views[name]
  }
}
