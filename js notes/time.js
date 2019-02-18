// get and format time
const getTimeObj = (date) => {
  const pad0 = (number) => number.toString().padStart(2, `0`);
  return {
    yyyy: date.getFullYear().toString(),
    MM: pad0(date.getMonth() + 1),
    dd: pad0(date.getDate()),
    HH: pad0(date.getHours()),
    mm: pad0(date.getMinutes()),
    ss: pad0(date.getSeconds()),
    SSS: pad0(date.getMilliseconds()).padStart(3, `0`),
    // SSS: date
    //   .getMilliseconds()
    //   .toString()
    //   .padStart(3, `0`),
    M: (date.getMonth() + 1).toString(),
    d: date.getDate().toString(),
    H: date.getHours().toString(),
    m: date.getMinutes().toString(),
    s: date.getSeconds().toString(),
    S: date.getMilliseconds().toString(),
  };
};

const getTimeStr = ({
  date = new Date(),
  format = `yyyy.MM.dd HH:mm:ss`,
} = {}) => {
  const timeObj = getTimeObj(date);
  return format
    .replace(`yyyy`, timeObj.yyyy)
    .replace(`MM`, timeObj.MM)
    .replace(`M`, timeObj.M)
    .replace(`dd`, timeObj.dd)
    .replace(`d`, timeObj.d)
    .replace(`HH`, timeObj.HH)
    .replace(`H`, timeObj.H)
    .replace(`mm`, timeObj.mm)
    .replace(`m`, timeObj.m)
    .replace(`ss`, timeObj.ss)
    .replace(`s`, timeObj.s)
    .replace(`SSS`, timeObj.SSS)
    .replace(`S`, timeObj.S);
};

// some Date methods note
const date = new Date(`2016.04.30`);

function logDate() {
  return getTimeStr({ date, format: `yyyy.MM.dd` });
}

date.setMonth(1);
// minus days of the month(s) from the one next setted to the current
// here minus days of Feb and Mar
// 2016.03.01
console.log(logDate());

date.setDate(0);
// go back to the last day of previous month
// 2016.02.29
console.log(logDate());

date.setDate(-1);
// go back to the day before last day of previous month
// 2016.01.30
console.log(logDate());

date.setMonth(1);
// add days of the month(s) from the current to the one previous setted
// here add days of Jan
// 2016.03.01
console.log(logDate());

date.setMonth(-1);
// go back to the first day of last month of previous year
// 2015.12.01
console.log(logDate());

date.getYear();
// the Year minus 1900
// 115

date.setYear(2016); // the same as date.setFullYear(2016)
date.getFullYear(); // 2016
