[![Build Status](https://travis-ci.org/tuanpham-dev/create-pen.svg?branch=master)](https://travis-ci.org/tuanpham-dev/create-pen)
# Create Pen
CLI tool for creating CodePen liked project.

## Installation
```bash
npm i -g create-pen
```

## Usage
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

## License
Mit © Tuan Pham
