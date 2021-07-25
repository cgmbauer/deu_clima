import React, {useState} from 'react';
import {Text} from 'react-native';

import moment from 'moment';

import dateComponentStyle from './style';

const DateComponent = () => {
  const [currentDay, setCurrentDay] = useState(() => {
    moment.locale('pt-br');
    const dayOfWeek =
      moment().format('dddd').charAt(0).toUpperCase() +
      moment().format('dddd').slice(1);

    const month =
      moment().format('MMMM').charAt(0).toUpperCase() +
      moment().format('MMMM').slice(1);

    const dayOfTheMonth = moment().format('D');

    const returnedDate = `${dayOfWeek}, ${dayOfTheMonth} de ${month}`;

    console.log(returnedDate);

    return returnedDate;
  });

  return (
    <Text style={[dateComponentStyle.textDefault, dateComponentStyle.dayText]}>
      {currentDay}
    </Text>
  );
};

export default DateComponent;
