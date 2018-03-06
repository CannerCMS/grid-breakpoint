// @flow
import * as React from 'react';
import {Col, Row} from 'react-flexbox-grid/lib/index';
import chunk from 'lodash.chunk';
import defaultScreenSize from './static';
import Dimensions from 'react-container-dimensions';
import WindowDimensions from 'react-window-detect-dimensions';

type GridBpProps = {
  detectContainerWidth?: boolean,
  rowClassName?: string,
  colClassName?: string,
  lg?: number,
  md?: number,
  sm?: number,
  xs?: number,
  lgOffset?: number,
  mdOffset?: number,
  smOffset?: number,
  xsOffset?: number,
  children: React.ChildrenArray<React.Element<*>>
}

type GridContainerProps = GridBpProps & {
  containerHeight: number,
  containerWidth: number
}

export default class GridBreakpoint extends React.Component<GridBpProps> {
  render() {
    const {detectContainerWidth} = this.props;

    if (detectContainerWidth) {
      return (
        <Dimensions>
          {
            ({height, width}) => (
              <GridContainer
                {...this.props}
                containerHeight={height}
                containerWidth={width}/>
            )
          }
        </Dimensions>
      );
    }

    return (
      <WindowDimensions>
        {
          ({windowWidth, windowHeight}) => (
            <GridContainer
              {...this.props}
              containerHeight={windowHeight}
              containerWidth={windowWidth}/>
          )
        }
      </WindowDimensions>
    );
  }
}

class GridContainer extends React.Component<GridContainerProps, {
  currentSize: ?string
}> {
  constructor(props) {
    super(props);

    (this: any).whichSize = this.whichSize.bind(this);
    (this: any).updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      currentSize: null
    };
  }
  static defaultProps = {
    lg: null,
    md: null,
    sm: null,
    xs: null,
    lgOffset: null,
    mdOffset: null,
    smOffset: null,
    xsOffset: null
  };

  componentDidMount() {
    this.updateDimensions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateDimensions(nextProps);
  }

  updateDimensions(props) {
    const {containerWidth} = props;
    const currentSize = this.whichSize(containerWidth, props);
    this.setState({currentSize});
  }

  whichSize(px, props): string {
    const {lg, md, sm, xs} = props;
    if (
      px <= defaultScreenSize.xs &&
      xs) {
      return 'xs';
    } else if (
      px <= defaultScreenSize.sm &&
      sm) {
      return 'sm';
    } else if (
      px <= defaultScreenSize.md &&
      md) {
      return 'md';
    } else if (lg) {
      return 'lg';
    } else if (md) {
      return 'md';
    } else if (sm) {
      return 'sm';
    } else if (xs) {
      return 'xs';
    } else if (this.state.currentSize) {
      return this.state.currentSize;
    }

    return 'lg';
  }

  render() {
    const {
      lg,
      md,
      sm,
      xs,
      lgOffset,
      mdOffset,
      smOffset,
      xsOffset,
      rowClassName,
      colClassName,
      children
    } = this.props;
    let {currentSize} = this.state;
    let screenGrid: number = 12;

    if (currentSize === 'lg') {
      screenGrid = lg + lgOffset;
    } else if (currentSize === 'md') {
      screenGrid = md + mdOffset;
    } else if (currentSize === 'sm') {
      screenGrid = sm + smOffset;
    } else if (currentSize === 'xs') {
      screenGrid = xs + xsOffset;
    }

    // how many items in a row
    const rowItems = 12 / screenGrid;
    const gridChunk = chunk(children, rowItems);

    return (
      <div>
        {gridChunk.map((chunk, rowIndex) => {
          const colChunk = chunk.map((item, colIndex) =>
            <Col
              lg={lg}
              md={md}
              sm={sm}
              xs={xs}
              lgOffset={lgOffset}
              mdOffset={mdOffset}
              smOffset={smOffset}
              xsOffset={xsOffset}
              key={colIndex}
              className={colClassName}>
              {item}
            </Col>
          );

          return (
            <Row
              key={rowIndex}
              className={rowClassName}>
              {colChunk}
            </Row>
          );
        })}
      </div>
    );
  }
}
