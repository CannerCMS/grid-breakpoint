# grid-breakpoint [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Automatically add breakpoints to your grid (This project is build on top of `flexboxgrid`, which is a 12 column grid system).

## Installation

```sh
$ npm install --save grid-breakpoint
```

## Problem in writing grids

Grid is great! But one big commonly problem in writing grids is when you have a big list of columns, you can't just push all the columns into a row.  If the containers have different height, your items will end up displaying unexpected.

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

to automatically

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
      <GridBreakpoint
        lg={4}
        md={6}
        xs={3}
        xsOffset={3}
        detectContainerWidth={true} // whether detect container width or not, if not will detect window width.
        rowClassName="row-test"
        colClassName="col-test">
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
