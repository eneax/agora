import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

import EmptyState from '@/components/emptyState';
import DashboardContainer from '@/components/dashboardContainer';
import FeedbackTable from '@/components/feedbackTable';
import FeedbackTableHeader from '@/components/feedbackTableHeader';
import FeedbackTableSkeleton from '@/components/feedbackTableSkeleton';

const MyFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardContainer>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <FeedbackTableHeader />
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardContainer>
  );
};

export default MyFeedback;
