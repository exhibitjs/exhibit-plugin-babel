# exhibit-plugin-babel

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Processes `.js` files with Babel.

## Install

```sh
> npm install -D exhibit-plugin-babel
```

## Usage

```js
plugin('babel', options);
```

## Options

- `root` (string) – set this to where the files originate from, e.g. `app` or `src`. This helps Babel find your `.babelrc` or `package.json` config per-file.

[npm-url]: https://npmjs.org/package/exhibit-plugin-babel
[npm-image]: https://img.shields.io/npm/v/exhibit-plugin-babel.svg?style=flat-square

[travis-url]: https://travis-ci.org/exhibitjs/exhibit-plugin-babel
[travis-image]: https://img.shields.io/travis/exhibitjs/exhibit-plugin-babel.svg?style=flat-square&label=Linux

[appveyor-url]: https://ci.appveyor.com/project/exhibitjs/exhibit-plugin-babel
[appveyor-image]: https://img.shields.io/appveyor/ci/exhibitjs/exhibit-plugin-babel/master.svg?style=flat-square&label=Windows

[depstat-url]: https://david-dm.org/exhibitjs/exhibit-plugin-babel
[depstat-image]: https://img.shields.io/david/exhibitjs/exhibit-plugin-babel.svg?style=flat-square
