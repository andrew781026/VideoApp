import moment from 'moment';

class DateUtil {

  static durationFormat(date = null, format = 'mm:ss') {
    return (date === null) ? null : moment.utc(moment.duration(date).asMilliseconds()).format(format);
  }

}


export default DateUtil;
