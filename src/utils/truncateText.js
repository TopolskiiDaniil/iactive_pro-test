export function truncateText(text, maxLength = 40) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  let truncated = text.slice(0, maxLength);

  const sentenceEndings = ['.', '!', '?'];

  const lastChar = truncated[truncated.length - 1];
  if (sentenceEndings.includes(lastChar)) {
    return truncated;
  }

  return truncated + '...';
}
