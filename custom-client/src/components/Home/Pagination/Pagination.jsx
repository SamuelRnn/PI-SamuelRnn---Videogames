import styles from "./Pagination.module.css";
import { useEffect } from "react";

const Pagination = ({ pageNumbers, page, setPage }) => {
  const goToPrevPage = () => {
    if (page !== 1) setPage(page - 1);
  };
  const goToNextPage = () => {
    if (page !== pageNumbers.length) setPage(page + 1);
  };
  const handleArrowNavigation = (event) => {
    if (event.key === 'ArrowLeft') goToPrevPage();
    if (event.key === 'ArrowRight') goToNextPage();
  };
  document.onkeyup = handleArrowNavigation;
  //clean-up key events and page memo--------------------------
  useEffect(()=>{
    window.sessionStorage.setItem('page', page)
    return () => {
      document.removeEventListener('keyup', handleArrowNavigation);
    }
  },[page]);

  return (
    <div className={styles.page_btns_container}>
      <button title="move" onClick={goToPrevPage} className={styles.page_btn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {pageNumbers.map((number) => (
        <button
          onClick={() => setPage(number)}
          key={number}
          className={`${styles.page_btn} ${
            page === number && styles.active_page
          }`}
        >
          {number}
        </button>
      ))}
      <button title="move" onClick={goToNextPage} className={styles.page_btn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
