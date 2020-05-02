import React from 'react';
import {sortableContainer} from '../../../../src';

import Item from '../Item';

import styles from './List.scss';

const List = React.forwardRef(
  ({items, isSorting, selectedItems, sortingItemKey, onItemSelect}, ref) => {
    return (
      <div className={styles.List} ref={ref}>
        {items.map((value, index) => {
          const isSelected = selectedItems.includes(value);
          const itemIsBeingDragged = sortingItemKey === value;

          return (
            <Item
              key={`item-${value}`}
              selected={isSelected}
              dragging={itemIsBeingDragged}
              sorting={isSorting}
              index={index}
              value={value}
              onClick={onItemSelect}
              selectedItemsCount={selectedItems.length}
            />
          );
        })}
      </div>
    );
  },
);

export default sortableContainer(List);
