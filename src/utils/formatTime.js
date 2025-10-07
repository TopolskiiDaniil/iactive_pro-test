export function formatTime(dateString) {
  if (!dateString) {
    return '';
  }

  const parts = dateString.split(' ');
  if (parts.length < 2) {
    return '';
  }

  const timePart = parts[1];
  if (timePart.length < 5) {
    return '';
  }

  return timePart.substring(0, 5);
}
