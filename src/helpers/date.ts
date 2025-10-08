import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale('ru');

export const parseDate = (inputDate: number, format = 'YYYY MMM DD') => {
  const parsedDate = dayjs(String(inputDate), 'YYYYMMDDHHmmss');
  const formattedDate = parsedDate.format(format);
  return formattedDate;
};
