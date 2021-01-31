import Head from 'next/head';
import { Button, Icon, Flex, Text } from '@chakra-ui/react';
import { MdGroupWork } from 'react-icons/md';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="600px"
      margin="0 auto"
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('agora-auth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
        <title>Agora</title>
      </Head>

      <Icon as={MdGroupWork} name="logo" color="black" w={10} h={10} />

      <Text my={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Agora
        </Text>{' '}
        is the easiest way to add comments or reviews to your static site. It's
        still a work-in-progress, but you can try it out by logging in.
      </Text>
      {auth.user ? (
        <Button as="a" size="sm" fontWeight="medium" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button
          mt={4}
          size="sm"
          fontWeight="medium"
          onClick={() => auth.signinWithGitHub()}
        >
          Sign In
        </Button>
      )}
    </Flex>
  );
};

export default Home;
