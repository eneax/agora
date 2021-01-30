import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import { getAllFeedback, getAllSites } from '@/lib/db-admin';

import Feedback from '@/components/feedback';

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

const SiteFeedback = ({ initialFeedback }) => (
  <Box
    display="flex"
    flexDirection="column"
    width="full"
    maxWidth="700px"
    margin="0 auto"
  >
    <Box as="form">
      <FormControl my={8}>
        <FormLabel htmlFor="comment">Comment</FormLabel>
        <Input id="comment" placeholder="Leave a comment" />
        <Button type="submit" fontWeight="medium" mt={4}>
          Add Comment
        </Button>
      </FormControl>
    </Box>

    {initialFeedback.map(feedback => (
      <Feedback key={feedback.id} {...feedback} />
    ))}
  </Box>
);

export default SiteFeedback;
