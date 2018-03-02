# grid-breakpoint [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Automatically add breakpoints to your grid (This project is build on top of `flexboxgrid`, which is a 12 column grid system).

## Installation

```sh
$ npm install --save grid-breakpoint
```

## Problem

Grid is great! But one big problem in grid is when you have a big list of columns, you can not just push all the columns into a row.  If the containers have different height, your items will not display as you expected.

So let's turn

```
<Row>
  <Col span={6}/>
  <Col span={6}/>
  <Col span={6}/>
  <Col span={6}/>
  <Col span={6}/>
  <Col span={6}/>
  <Col span={6}/>
  {....}
</Row>
```

to 

```
<Row>
  <Col span={6}/>
  <Col span={6}/>
</Row>
<Row>
  <Col span={6}/>
  <Col span={6}/>
</Row>
<Row>
  <Col span={6}/>
  <Col span={6}/>
</Row>
<Row>
  <Col span={6}/>
  <Col span={6}/>
</Row>
<Row>
  <Col span={6}/>
  <Col span={6}/>
</Row>
```

`grid-breakpoint` automatically calculate how many columns should in a row and wrapped `<Row/>` for `<Col/>`!

## Usage

**IMPORTANT NOTE:** You need to use `webpack` as build tool, cause the grid system is based on [react-flexbox-grid](https://github.com/roylee0704/react-flexbox-grid), it'll load [flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid) via `style-loader` and `css-loader` make sure you installed both of them.

Then configure the loaders in webpack:

```
{
  test: /\.css$/,
  loader: 'style!css?modules',
  include: /flexboxgrid/,
}
```

And add to your component as below.

```js
import React, {Component} from 'react';
import GridBreakPoint from 'grid-breakpoint';

class GridExample extends Component {
  render() {
    const list = range(20).map((col, i) => {
      return <div key={i}>{col}</div>;
    });

    // in this example, when the screen width is large(lg)
    // it'll wrap <Col/> as structure below
    // <Row> ---> automaticlly wrapped
    //   <Col/>
    //   <Col/>
    //   <Col/>
    // </Row>

    // in md screen
    // <Row> ---> automaticlly wrapped
    //   <Col/>
    //   <Col/>
    // </Row>

    // in xs screen (xs + xsOffset = 6)
    // <Row> ---> automaticlly wrapped
    //   <Col/>
    //   <Col/>
    // </Row>

    return (
      <GridBreakpoint lg={4} md={6} xs={3} xsOffset={3}
        rowClassName="row-test" colClassName="col-test">
        {list}
      </GridBreakpoint>
    );
  }
}

```

## Start example server

```
npm start
```

## License

MIT © [Canner](https://github.com/canner)


[npm-image]: https://badge.fury.io/js/grid-breakpoint.svg
[npm-url]: https://npmjs.org/package/grid-breakpoint
[travis-image]: https://travis-ci.org/Canner/grid-breakpoint.svg?branch=master
[travis-url]: https://travis-ci.org/Canner/grid-breakpoint
[daviddm-image]: https://david-dm.org/Canner/grid-breakpoint.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Canner/grid-breakpoint
