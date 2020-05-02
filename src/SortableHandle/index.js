import * as React from 'react';

import {provideDisplayName} from '../utils';

export default function sortableHandle(WrappedComponent) {
  return class WithSortableHandle extends React.Component {
    static displayName = provideDisplayName('sortableHandle', WrappedComponent);

    render() {
      return <WrappedComponent ref={setSortableHandle} {...this.props} />;
    }
  };
}

export function isSortableHandle(node) {
  return node.sortableHandle != null;
}

function setSortableHandle(ref) {
  if (ref) {
    ref.sortableHandle = true;
  }
}
