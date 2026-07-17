import type { NewsItem } from '../types';

const getNewsTimestamp = (item: NewsItem) => {
  const timestamp = Date.parse(item.date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export const hasManualNewsOrder = (news: NewsItem[]) =>
  news.some(item => typeof item.sortOrder === 'number');

export const sortNewsItems = (news: NewsItem[]) => {
  const useManualOrder = hasManualNewsOrder(news);

  return news
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (useManualOrder) {
        const orderA = typeof a.item.sortOrder === 'number' ? a.item.sortOrder : Number.MAX_SAFE_INTEGER;
        const orderB = typeof b.item.sortOrder === 'number' ? b.item.sortOrder : Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) return orderA - orderB;
      }

      const dateDifference = getNewsTimestamp(b.item) - getNewsTimestamp(a.item);
      if (dateDifference !== 0) return dateDifference;
      return a.index - b.index;
    })
    .map(({ item }) => item);
};

export const removeManualNewsOrder = (news: NewsItem[]) =>
  sortNewsItems(news.map(({ sortOrder: _sortOrder, ...item }) => item));
