import { useCallback, useEffect, useState } from 'react';
import { Urls } from 'constant';
import { request } from 'helpers';
import { SourceModel } from 'model/Source';
import { defaultPerPageCount } from 'constant';

const defaultPaginationData = {
  count: 0,
  page: 1,
  perPage: defaultPerPageCount
}

export const useSources = () => {
  const [sources, setSources] = useState<SourceModel[]>([]);
  const [search, setSearch] = useState<string>('')
  const [paginationData, setPaginationData] = useState(defaultPaginationData);

  const getSourceList = useCallback((_page: number, _perPage: number) => {
    (async () => {
      let url = `${Urls.source.list}?page=${_page}&perPage=${_perPage}`;
      if (search) {
        url = `${url}&search=${search}`;
      }
      request(url).then((res) => {
        const { count, data, page, perPage } = res;
        setSources(data);
        setPaginationData({ count, page, perPage })
      }).catch((err) => {
        console.log(err, '✅ => err');
      })
    })();
  }, [search]);

  const onDelete = useCallback((id: number) => {
    (async () => {
      request(`${Urls.source.delete(id)}`, { method: 'DELETE' }).then(() => {
        getSourceList(paginationData.page, paginationData.perPage);
      }).catch((err) => {
        console.log(err, '✅ => err');
      })
    })();
  }, [paginationData, getSourceList]);

  useEffect(() => {
    getSourceList(defaultPaginationData.page, defaultPaginationData.perPage);
  }, [getSourceList]);

  const onPageChange = useCallback((page: number) => {
    getSourceList(page, paginationData.perPage);
  }, [paginationData.perPage, getSourceList])

  return { sources, onPageChange, paginationData, onDelete, getSourceList, setSearch };
}