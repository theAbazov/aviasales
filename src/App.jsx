/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './App.module.scss';

// import { TicketItem } from './components/TicketItem';
import { Filter } from './components/Filter';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { TicketItem } from './components/TicketItem';
import {
  changeSort,
  errorNull,
  getSearchId,
  getTickets,
  showMore,
} from './redux';
import { toNeccessaryData } from './services/AVSService';

function App() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [ticketItems, setticketItems] = useState();

  const {
    searchId,
    tickets,
    errorMessage,
    sort,
    checkedFilters,
    renderTickets,
    isLoading,
  } = useSelector((state) => state.AVS);

  useEffect(() => {
    dispatch(getSearchId());
  }, []);

  useEffect(() => {
    if (searchId) dispatch(getTickets(searchId));
  }, [searchId]);

  useEffect(() => {
    if (errorMessage === 'Fake error') {
      dispatch(getTickets(searchId));
      dispatch(errorNull());
    }
  }, [errorMessage]);

  useEffect(() => {
    if (tickets.length)
      setData(toNeccessaryData(tickets, checkedFilters, sort));
  }, [sort, checkedFilters, tickets]);

  useEffect(() => {
    if (data?.length) {
      const res = data
        .filter((elem, id) => id < renderTickets)
        .map((element) => <TicketItem key={element.price} ticket={element} />);
      setticketItems(res);
    } else {
      setticketItems('Рейсов, подходящих под заданные фильтры, не найдено');
    }
  }, [renderTickets, data]);

  console.log(ticketItems);
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.main}>
        <ProgressBar />
        <div className={classes.content}>
          <Filter />
          <div className={classes.content__tabs}>
            <div className={classes['content__tabs-wrapper']}>
              <button
                className={`${classes.content__tab} ${
                  sort === 'cheap' ? classes['content__tab--active'] : ''
                }`}
                data-sort="cheap"
                aria-label="самый дешевый"
                type="button"
                onClick={(event) =>
                  dispatch(changeSort(event.target.dataset.sort))
                }
              >
                самый дешевый
              </button>
              <button
                className={`${classes.content__tab} ${
                  sort === 'expensive' ? classes['content__tab--active'] : ''
                }`}
                data-sort="expensive"
                aria-label="самый дорогой"
                type="button"
                onClick={(event) =>
                  dispatch(changeSort(event.target.dataset.sort))
                }
              >
                самый дорогой
              </button>
              <button
                className={`${classes.content__tab} ${
                  sort === 'optimal' ? classes['content__tab--active'] : ''
                }`}
                data-sort="optimal"
                aria-label="оптимальный"
                type="button"
                onClick={(event) =>
                  dispatch(changeSort(event.target.dataset.sort))
                }
              >
                оптимальный
              </button>
            </div>
            <div>
              {!isLoading && ticketItems?.length ? (
                ticketItems
              ) : (
                <span style={{ textAlign: 'center' }}>Loading...</span>
              )}

              {Array.isArray(ticketItems) && ticketItems.length % 5 === 0 ? (
                <button
                  className={classes['content__show-more']}
                  type="button"
                  aria-label="показать еще 5 билетов"
                  onClick={() => dispatch(showMore())}
                >
                  показать еще 5 билетов!
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
