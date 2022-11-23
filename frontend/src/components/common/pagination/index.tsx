import React, { FC, useMemo } from 'react';
import 'components/common/pagination/pagination.css';

interface IPagination {
  pagesCount: number;
  activePage: number;
  onPageClick: (page: number) => void;
}

export const Pagination: FC<IPagination> = React.memo((props) => {
  const { pagesCount, onPageClick, activePage } = props;

  const pages = useMemo(() => {
    const _pages = [];
    for (let i = 1; i < pagesCount + 1; i++) {
      _pages.push(i)
    }
    return _pages;
  }, [pagesCount]);

  return <div className={'pagination'}>
    {
      pages.map((i) => {
        return (
          <span key={i} className={`page ${+activePage === +i ? 'active' : ''}`} onClick={() => onPageClick(i)}>
            {i}
          </span>
        )
      })
    }
  </div>
})