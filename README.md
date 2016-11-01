# grid-breakpoint [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> grid auto add breaking-point

## Installation

```sh
$ npm install --save grid-breakpoint
```

## Usage

```js
import React, {Component} from 'react';
import GridBreakPoint from 'grid-breakpoint';

class GridExample extends Component {
	render() {
		return (
			<GridBreakPoint>
				<div>1</div>
				<div>2</div>
			</GridBreakPoint>
		);
	}
}

```

## Start example server

```
node devServer.js
```

## License

MIT © [chilijung]()


[npm-image]: https://badge.fury.io/js/grid-breakpoint.svg
[npm-url]: https://npmjs.org/package/grid-breakpoint
[travis-image]: https://travis-ci.org/Canner/grid-breakpoint.svg?branch=master
[travis-url]: https://travis-ci.org/Canner/grid-breakpoint
[daviddm-image]: https://david-dm.org/Canner/grid-breakpoint.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Canner/grid-breakpoint
