import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Filter.module.scss';

import { toggleAllItems, toggleItem } from '../../redux';

function Filter() {
  const dispatch = useDispatch();

  const { checkedFilters } = useSelector((state) => state.AVS);

  const onCheckItem = (event) => {
    dispatch(toggleItem(event.target.value));
  };

  return (
    <div className={classes.filter}>
      <span className={classes.filter__caption}>количество пересадок</span>
      <label className={classes['filter__checkbox-label']}>
        <input
          className={classes.filter__checkbox}
          type="checkbox"
          value="all"
          onChange={() => dispatch(toggleAllItems())}
          checked={checkedFilters.length > 3}
        />
        <span className={classes['filter__custom-checkbox']} /> Все
      </label>
      <label className={classes['filter__checkbox-label']}>
        <input
          className={classes.filter__checkbox}
          type="checkbox"
          value="0"
          onChange={onCheckItem}
          checked={checkedFilters.includes('0')}
        />
        <span className={classes['filter__custom-checkbox']} /> Без пересадок
      </label>
      <label className={classes['filter__checkbox-label']}>
        <input
          className={classes.filter__checkbox}
          type="checkbox"
          value="1"
          onChange={onCheckItem}
          checked={checkedFilters.includes('1')}
        />
        <span className={classes['filter__custom-checkbox']} /> 1 пересадка
      </label>
      <label className={classes['filter__checkbox-label']}>
        <input
          className={classes.filter__checkbox}
          type="checkbox"
          value="2"
          onChange={onCheckItem}
          checked={checkedFilters.includes('2')}
        />
        <span className={classes['filter__custom-checkbox']} /> 2 пересадки
      </label>
      <label className={classes['filter__checkbox-label']}>
        <input
          className={classes.filter__checkbox}
          type="checkbox"
          value="3"
          onChange={onCheckItem}
          checked={checkedFilters.includes('3')}
        />
        <span className={classes['filter__custom-checkbox']} /> 3 пересадки
      </label>
    </div>
  );
}

export default Filter;
