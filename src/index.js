import React, {Component, PropTypes} from 'react';
import {Col, Row} from 'react-flexbox-grid/lib/index';
import {chunk} from 'lodash';
import defaultScreenSize from './static';
import Dimensions from 'react-dimensions';

@Dimensions()
export default class GridBreakpoint extends Component {
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
    this.defaultFontSize = this.dummyDiv.offsetHeight;
    this.updateDimensions(this.props);

    // remove dummy div when we know the default fontsize of 1em
    this.dummyDiv.remove();
  }

  componentWillReceiveProps(nextProps) {
    this.updateDimensions(nextProps);
  }

  updateDimensions(props) {
    const {containerWidth} = props;
    const currentEmWidth = containerWidth / this.defaultFontSize;
    const currentSize = this.whichSize(currentEmWidth);

    this.setState({currentSize});
  }

  whichSize(em) {
    const {lg, md, sm, xs} = this.props;
    if (em >= defaultScreenSize.lg &&
      lg) {
      return 'lg';
    } else if (
      em >= defaultScreenSize.md &&
      md) {
      return 'md';
    } else if (
      em >= defaultScreenSize.sm &&
      sm) {
      return 'sm';
    } else if (xs) {
      return 'xs';
    }

    return this.state.currentSize;
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
    const {currentSize} = this.state;
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
        {
          gridChunk.map((chunk, rowIndex) => {
            const colChunk = chunk.map((item, colIndex) =>
              React.createElement(Col, {
                lg,
                md,
                sm,
                xs,
                lgOffset,
                mdOffset,
                smOffset,
                xsOffset,
                key: colIndex,
                className: colClassName
              }, item)
            );

            return React.createElement(Row, {
              key: rowIndex,
              className: rowClassName
            }, colChunk);
          })
        }
        {/* dummy div to know 1em equals how many px */}
        <div ref={
          node => {
            this.dummyDiv = node;
          }}
          style={{height: '1em', width: 0}}
        />
      </div>
    );
  }
}
