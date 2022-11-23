const getPageBtns = (paginationSource) => {
  let pages = Math.ceil(paginationSource.length / 15);
  const numArr = [];
  while (pages !== 0) {
    numArr.unshift(pages);
    pages--;
  }
  return numArr;
};

export default getPageBtns;
