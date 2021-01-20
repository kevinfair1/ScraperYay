let str = "Commission Meeting Agenda  Virtual/Teleconference - 11/17/2020";
let dateStr = str.match(
  /\b(0?[1-9]|1[012])([\/\-])(0?[1-9]|[12]\d|3[01])\2(\d{4})/
);

console.log(dateStr[0]);
