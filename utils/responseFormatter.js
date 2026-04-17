// utils/responseFormatter.js
const formatResponse = (data) => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(item => formatSingleItem(item));
  }
  return formatSingleItem(data);
};

const formatSingleItem = (item) => {
  if (!item) return item;

  // Convert Mongoose document to plain object and remove __v
  const obj = item.toObject ? item.toObject() : item;
  
  const { __v, ...cleaned } = obj;
  return cleaned;
};

module.exports = { formatResponse };