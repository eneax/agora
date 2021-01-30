import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export const getStaticProps = async context => {
  const { siteId } = context.params;
  const feedback = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
  };
};

export const getStaticPaths = async () => {
  const sites = await getAllSites();
  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const SiteFeedback = ({ initialFeedback }) => {
  console.log(initialFeedback);

  return <h1>Hi, there!!!</h1>;
};

export default SiteFeedback;
