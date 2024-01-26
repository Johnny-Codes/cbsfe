function formatTime(dateTime) {
  const time = new Date(dateTime);
  const hour = time.getHours();
  const minute = time.getMinutes();
  return `${hour}:${minute}`;
}

export default formatTime;
