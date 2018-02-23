import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-flexbox-grid/lib/index';
import {chunk} from 'lodash';
import defaultScreenSize from './static';
import Dimensions from 'react-container-dimensions';

export default class GridBreakpoint extends Component {
  render() {
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
}

class GridContainer extends Component {
  constructor(props) {
    super(props);

    this.whichSize = this.whichSize.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      currentSize: null
    };
  }

  static propTypes = {
    children: PropTypes.any,
    rowClassName: PropTypes.string,
    colClassName: PropTypes.string,
    containerWidth: PropTypes.number,
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    lgOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    smOffset: PropTypes.number,
    xsOffset: PropTypes.number
  };

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

  whichSize(px, props) {
    const {lg, md, sm, xs} = props;
    if (px <= defaultScreenSize.xs &&
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
    } else if (this.state.currentSize) {
      return this.state.currentSize;
    } else if (md) {
      return 'md';
    } else if (sm) {
      return 'sm';
    } else if (xs) {
      return 'xs';
    }
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
    let screenGrid;

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
