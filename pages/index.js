import Head from 'next/head';
import { Box, Button, Flex, Text, Icon, Stack } from '@chakra-ui/react';
import { MdGroupWork } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <Box bg="gray.100">
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

        <Icon as={MdGroupWork} name="logo" color="black" w={16} h={16} />

        {auth.user ? (
          <Button
            as="a"
            href="/dashboard"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            mt={4}
            size="lg"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)',
            }}
          >
            View Dashboard
          </Button>
        ) : (
          <Stack>
            <Button
              onClick={() => auth.signinWithGitHub()}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              leftIcon={
                <Icon as={AiFillGithub} name="GitHub Logo" w={8} h={8} />
              }
              mt={4}
              size="lg"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              Sign In with GitHub
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
