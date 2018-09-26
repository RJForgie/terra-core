import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import ChevronRight from 'terra-icon/lib/icon/IconChevronRight';
import SelectableUtils from './SelectableUtils';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The content element to be placed inside the list item for display.
   */
  children: PropTypes.node,
  /**
   * Whether or not the list item has a disclosure indicator presented.
   */
  hasChevron: PropTypes.bool,
  /**
   * Whether or not the list item should have selection styles applied.
   */
  isSelected: PropTypes.bool,
  /**
   * Whether or not the list item should have styles to indicate the item is selectable.
   */
  isSelectable: PropTypes.bool,
  /**
   * Function callback for the ref of the li.
   */
  listKey: PropTypes.string.isRequired,
  /**
   * Function callback for the ref of the li.
   */
  onChange: PropTypes.func,
  /**
   * Function callback for the ref of the li.
   */
  onClick: PropTypes.func,
  /**
   * Function callback for the ref of the li.
   */
  onKeyDown: PropTypes.func,
  /**
   * Function callback for the ref of the li.
   */
  refCallback: PropTypes.func,
};

const defaultProps = {
  children: [],
  hasChevron: undefined,
  isSelected: false,
  isSelectable: undefined,
};

const ListItem = ({
  children,
  disableUnselectedItems,
  hasChevron,
  isSelected,
  isSelectable,
  listKey,
  onChange,
  onClick,
  onKeyDown,
  refCallback,
  selectedKeys,
  ...customProps
}) => {
  const listItemClassNames = cx([
    'list-item',
    { selected: isSelected },
    { 'is-selectable': isSelectable },
    { 'item-has-chevron': hasChevron },
    customProps.className,
  ]);

  const ariaSpread = {};
  if (isSelectable) {
    ariaSpread.onClick = SelectableUtils.wrappedOnClickForItem(onClick, isSelectable, [index], onChange);
    ariaSpread.onKeyDown = SelectableUtils.wrappedOnKeyDownForItem(onKeyDown, isSelectable, [index], onChange);
    ariaSpread.tabIndex = '0';
    ariaSpread.role = 'option';
    ariaSpread['aria-selected'] = isSelected;
  }

  let childContent = children;
  if (hasChevron) {
    childContent = [
      <div className={cx('item-fill')} key="item-fill">{childContent}</div>,
      <div className={cx('item-end')} key="item-end">{<span className={cx('chevron')}><ChevronRight height="0.8em" width="0.8em" /></span>}</div>
    ];
  }

  return (
    <li {...customProps} {...ariaSpread} className={listItemClassNames} ref={refCallback}>
      {children}
    </li>
  );
};

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
