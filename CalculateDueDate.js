/* CalculateDueDate function
 *   Input variables:
 *     submitDate: Date object representing the submit date of the issue
 *     turnaroundTime: integer indicating the turnaround time of the issue in hours
 *   Returns:
 *     Date object representing the due date of the issue
 */
function CalculateDueDate(submitDate, turnaroundTime) {
  if (!(submitDate instanceof Date)) {
    throw 'submitDate must be a Date object';
  }
  if (!Number.isInteger(turnaroundTime) || turnaroundTime < 0) {
    throw 'turnaroundTime must be a positive whole number.';
  }
  console.log('Submit date:     ' + submitDate);
  console.log('Turnaround time: ' + turnaroundTime);

  if (turnaroundTime == 0) {
    return submitDate;
  }

  const workingDayStartHour = 9;
  const workingDayEndHour = 17;
  const numOfWorkingHours = workingDayEndHour - workingDayStartHour;
  const numOfWorkingDays = 5;

  var wholeDays = Math.trunc(turnaroundTime / numOfWorkingHours);
  var overturnHours =
    submitDate.getHours() +
    (turnaroundTime % numOfWorkingHours) -
    workingDayStartHour;
  var remainderDays = Math.trunc(overturnHours / numOfWorkingHours);
  var hours = overturnHours % numOfWorkingHours;
  if (
    hours == 0 &&
    submitDate.getHours() > workingDayStartHour &&
    submitDate.getMinutes() == 0 &&
    submitDate.getSeconds() == 0
  ) {
    remainderDays--;
    hours = numOfWorkingHours;
  }
  var days = wholeDays + remainderDays;
  var weekends = Math.trunc(
    (submitDate.getDay() + days - 1) / numOfWorkingDays
  );

  var daysToAdd = days + 2 * weekends;

  var dueDate = new Date();
  dueDate.setFullYear(submitDate.getFullYear());
  dueDate.setMonth(submitDate.getMonth());
  dueDate.setDate(submitDate.getDate() + daysToAdd);
  dueDate.setHours(hours + workingDayStartHour);
  dueDate.setMinutes(submitDate.getMinutes());
  dueDate.setSeconds(submitDate.getSeconds());

  console.log('-----------------');
  console.log('Whole days:      ' + wholeDays);
  console.log('Remainder days:  ' + remainderDays);
  console.log('All days:        ' + days);
  console.log('Remainder hours: ' + hours);
  console.log('Weekends:        ' + weekends);
  console.log('Calendar days:   ' + daysToAdd);

  return dueDate;
}

// Example code for testing CalculateDueDate function
try {
  var submitDate = new Date('2022-03-06 10:32:12');
  var turnaroundTime = 2;
  var dueDate = CalculateDueDate(submitDate, turnaroundTime);
  console.log('Due date:        ' + dueDate);
} catch (err) {
  console.log('Error: ' + err);
}
