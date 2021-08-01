import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';

import moment from 'moment';

import dateComponentStyle from './style';

const DateComponent = ({currentApiDay}: {currentApiDay: number}) => {
  const [currentDay, setCurrentDay] = useState(() => {
    const now = moment.unix(currentApiDay).utc(true);

    const dayOfWeek =
      now.format('dddd').charAt(0).toUpperCase() + now.format('dddd').slice(1);

    const month =
      now.format('MMMM').charAt(0).toUpperCase() + now.format('MMMM').slice(1);

    const dayOfTheMonth = now.format('D');

    const returnedDate = `${dayOfWeek}, ${dayOfTheMonth} de ${month}`;

    console.log(returnedDate);

    return returnedDate;
  });

  const [today, setToday] = useState(
    () => `${moment.unix(currentApiDay).utc(true)}`,
  );

  useEffect(() => {
    const currentApiDayToUnix = `${moment.unix(currentApiDay).utc(true)}`;

    if (today !== currentApiDayToUnix) {
      const now = moment.unix(currentApiDay).utc(true);
      setToday(`${now}`);

      const dayOfWeek =
        now.format('dddd').charAt(0).toUpperCase() +
        now.format('dddd').slice(1);

      const month =
        now.format('MMMM').charAt(0).toUpperCase() +
        now.format('MMMM').slice(1);

      const dayOfTheMonth = now.format('D');

      const returnedDate = `${dayOfWeek}, ${dayOfTheMonth} de ${month}`;

      console.log(returnedDate);

      setCurrentDay(returnedDate);
    }
  }, [currentApiDay, today]);

  return (
    <Text style={[dateComponentStyle.textDefault, dateComponentStyle.dayText]}>
      {currentDay}
    </Text>
  );
};

export default DateComponent;
