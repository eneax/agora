import Head from 'next/head';
import { Heading, Text, Code, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Agora</title>
      </Head>

      <main>
        <Heading>Agora</Heading>

        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        ) : (
          <Button onClick={() => auth.signinWithGitHub()}>
            Sign In with GitHub
          </Button>
        )}
      </main>
    </div>
  );
};

export default Home;
