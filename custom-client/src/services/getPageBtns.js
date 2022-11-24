const getPageBtns = (paginationSource) => {
  const pageSize = 15;
  let pages = Math.ceil(paginationSource.length / pageSize);
  const numArr = [];
  while (pages !== 0) {
    numArr.unshift(pages);
    pages--;
  }
  return numArr;
};

export default getPageBtns;
