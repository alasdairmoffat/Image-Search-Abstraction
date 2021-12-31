const formatTime = (date: number | string): string => {
  const time = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (Math.floor(time / (60 * 60 * 24 * 7))) {
    const weeks = Math.floor(time / (60 * 60 * 24 * 7));
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (Math.floor(time / (60 * 60 * 24))) {
    const days = Math.floor(time / (60 * 60 * 24));
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (Math.floor(time / (60 * 60))) {
    const hours = Math.floor(time / (60 * 60));
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (Math.floor(time / 60)) {
    const mins = Math.floor(time / 60);
    return `${mins} min${mins > 1 ? 's' : ''} ago`;
  }
  return '<1 min ago';
};

export default formatTime;
