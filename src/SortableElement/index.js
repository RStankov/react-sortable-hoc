import * as React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import invariant from 'invariant';

import {provideDisplayName, omit} from '../utils';

const propTypes = {
  index: PropTypes.number.isRequired,
  collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
};

const omittedProps = Object.keys(propTypes);

export default function sortableElement(WrappedComponent) {
  return class WithSortableElement extends React.Component {
    static displayName = provideDisplayName(
      'sortableElement',
      WrappedComponent,
    );

    static contextTypes = {
      manager: PropTypes.object.isRequired,
    };

    static propTypes = propTypes;

    static defaultProps = {
      collection: 0,
    };

    componentDidMount() {
      this.register();
    }

    componentDidUpdate(prevProps) {
      if (this.node) {
        if (prevProps.index !== this.props.index) {
          this.node.sortableInfo.index = this.props.index;
        }

        if (prevProps.disabled !== this.props.disabled) {
          this.node.sortableInfo.disabled = this.props.disabled;
        }
      }

      if (prevProps.collection !== this.props.collection) {
        this.unregister(prevProps.collection);
        this.register();
      }
    }

    componentWillUnmount() {
      this.unregister();
    }

    register() {
      const {collection, disabled, index} = this.props;
      this.node.sortableInfo = {
        collection,
        disabled,
        index,
        manager: this.context.manager,
      };

      this.ref = {node: this.node};

      this.context.manager.add(collection, this.ref);
    }

    unregister(collection = this.props.collection) {
      this.context.manager.remove(collection, this.ref);
    }

    node = null;

    render() {
      return (
        <WrappedComponent
          ref={(ref) => (this.node = ref)}
          {...omit(this.props, omittedProps)}
        />
      );
    }
  };
}
