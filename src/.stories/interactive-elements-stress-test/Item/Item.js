import React from 'react';
import {sortableElement} from '../../../../src';

import styles from './Item.scss';

const Item = React.forwardRef((props, ref) => {
  const {children} = props;

  return (
    <div className={styles.root} tabIndex={0} ref={ref}>
      {children}
    </div>
  );
});

export default sortableElement(Item);
