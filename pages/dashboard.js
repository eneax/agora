import React from 'react';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

import DashboardContainer from '@/components/dashboardContainer';
import SiteTable from '@/components/siteTable';
import SiteTableHeader from '@/components/siteTableHeader';
import SiteTableSkeleton from '@/components/siteTableSkeleton';
import EmptyState from '@/components/emptyState';

const Dashboard = () => {
  const { user } = useAuth();

  // get only the sites of a specific user
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardContainer>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <SiteTableHeader />
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardContainer>
  );
};

export default Dashboard;
