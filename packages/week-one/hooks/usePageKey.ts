import { useMemo } from 'react';
import { useRouter } from 'next/router';

export const usePageKey = () => {
  const router = useRouter();

  return useMemo(() => router.query.infoType?.toString() || '', [router]);
};
