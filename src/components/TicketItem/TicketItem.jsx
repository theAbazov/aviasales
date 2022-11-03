import React from 'react';

import PropTypes from 'prop-types';

import classes from './TicketItem.module.scss';

import {
  formatDuration,
  formatStops,
  formatTime,
  getTimeZone,
} from '../../services/AVSService';

function TicketItem({ ticket }) {
  const routes = ticket.segments.map((route, routeIndex) => {
    const date = new Date(route.date);
    const uniqueKey = `${date.toString()}_${routeIndex}`;
    const duration = route.duration * 60 * 1000;
    const originDate = new Date(date.getTime() + getTimeZone(route.origin));
    const destinationDate = new Date(
      date.getTime() + duration + getTimeZone(route.destination)
    );

    return (
      <div key={uniqueKey} className={classes.routes__item}>
        <div className={classes.routes__column}>
          <div
            className={classes.routes__caption}
          >{`${route.origin} - ${route.destination}`}</div>
          <div className={classes.routes__value}>{`${formatTime(
            originDate
          )} - ${formatTime(destinationDate)}`}</div>
        </div>
        <div className={classes.routes__column}>
          <div className={classes.routes__caption}>в пути</div>
          <div className={classes.routes__value}>
            {formatDuration(route.duration)}
          </div>
        </div>
        <div className={classes.routes__column}>
          <div className={classes.routes__caption}>
            {formatStops(route.stops.length)}
          </div>
          <div className={classes.routes__value}>
            {[route.stops.join(', ')]}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={classes['ticket-item']}>
      <header className={classes['ticket-item__header']}>
        <div
          className={classes['ticket-item__price']}
        >{`${ticket.price.toLocaleString()} Р`}</div>
        <img
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt="airlines"
        />
      </header>
      <div className={classes.routes}>{routes}</div>
    </div>
  );
}

TicketItem.propTypes = {
  ticket: PropTypes.instanceOf(Object).isRequired,
};

export default TicketItem;
