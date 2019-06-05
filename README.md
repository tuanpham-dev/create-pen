[![Build Status](https://travis-ci.org/tuanpham-dev/create-pen.svg?branch=master)](https://travis-ci.org/tuanpham-dev/create-pen)
# Create Pen
CLI tool for creating CodePen liked project.

## Installation
```bash
npm i -g create-pen
```

## Usage
### Options
```bash
$ create-pen --help
Usage: create-pen <pen_name> [options]

Options:
  --help             Show help  [boolean]
  --version          Show version number  [boolean]
  --html, -h         HTML preprocessor  [choices: "html", "pug", "liquid"] [default: "html"]
  --css, -c          CSS preprocessor  [choices: "css", "scss", "sass", "postcss"] [default: "css"]
  --js, -j           Javascript preprocessor  [choices: "javascript", "coffee", "typescript"] [default: "javascript"]
  --indent, -i       Indent style  [choices: "tab", "space"] [default: "tab"]
  --indent-size, -s  Indent size  [default: 4]

Examples:
$ create-pen mypen -h pug -c scss -j typescript  create 'mypen' project with pug as html, scss as css and typescript as javascript

```

### Run Development Server
```bash
$ npm start
```

### Build Project
```bash
$ npm build
```

### Convert Sass ⇄ SCSS
If the CSS Proprocessor is `scss` or `sass`, you can run this command to convert `scss` to `sass` or `sass` to `scss`. Required Ruby Sass to do that.
```bash
$ npm run convert
``` 

## License
MIT © Tuan Pham
