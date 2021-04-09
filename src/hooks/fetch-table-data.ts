import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PerPageConfig from 'helpers/per-page-config';
import { getQuery } from 'helpers/route-query';

export function useTableData<T>(fn: (params: any) => Promise<T>, name: string, params: any = {}) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fn({
          perPage: PerPageConfig.getPerPage(name),
          ...params,
          ...getQuery(),
        });
        setData(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    loadData();
  }, [router.query]);

  return { loading, data };
}
