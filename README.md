![Quick Build](https://github.com/sualeh/pointlocation6709-ts/workflows/Quick%20Build/badge.svg)
[![Coverage Status](https://img.shields.io/codecov/c/github/sualeh/pointlocation6709-ts/master.svg)](https://codecov.io/gh/sualeh/pointlocation6709-ts)
[![Main distribution](https://img.shields.io/badge/zip-download-blue.svg)](https://github.com/sualeh/pointlocation6709-ts/releases/latest)
[![npm](https://img.shields.io/npm/v/pointlocation6709-ts.svg)](https://www.npmjs.com/package/pointlocation6709-ts)

# Point Location 6709 

A TypeScript representation of [ISO 6709] geographic point location by coordinates. Validity is enforced by unit tests. (See the sister project, a Java library for [Point Location 6709], which more full-featured, with a parser and formatter.)

## Download

You can download the TypeScript library from [npm](https://www.npmjs.com/package/pointlocation6709-ts).

## Usage

Please look at the [pointlocation6709-ts--client](https://github.com/sualeh/pointlocation6709-ts--client) project to see how to import and use the Point Location 6709 TypeScript library.

## Development

### Install Pre-requisites

Run
```sh
npm install
```

### Test

Run
```sh
npm test
```

### Build

Run
```sh
npm run build
```

### Publish

To check packaging, run
```sh
npm pack
```

To publish, run
```sh
npm publish
```

Packaging and publishing will run a build so that the distribution files can be included in the published package.


## Resources Used to Create This Library

* [How to Create and Publish an npm module in TypeScript](https://codeburst.io/https-chidume-nnamdi-com-npm-module-in-typescript-12b3b22f0724)
* [How to write a Typescript library](https://www.tsmean.com/articles/how-to-write-a-typescript-library/)

[ISO 6709]: https://en.wikipedia.org/wiki/ISO_6709
[Point Location 6709]: https://github.com/sualeh/pointlocation6709/
