import React from 'react';
import { Box, Code, Switch } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from './table';
import DeleteFeedbackBtn from './deleteFeedbackBtn';

const FeedbackTable = ({ allFeedback }) => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Feedback</Th>
        <Th>Route</Th>
        <Th>Visible</Th>
        <Th width="50px" />
      </Tr>
    </thead>
    <tbody>
      {allFeedback.map(feedback => (
        <Box as="tr" key={feedback.id}>
          <Td fontWeight="medium">{feedback.author}</Td>
          <Td>{feedback.text}</Td>
          <Td>
            <Code>{feedback.route || '/'}</Code>
          </Td>
          <Td>
            <Switch
              color="green"
              defaultIsChecked={feedback.status === 'active'}
            />
          </Td>
          <Td>
            <DeleteFeedbackBtn feedbackId={feedback.id} />
          </Td>
        </Box>
      ))}
    </tbody>
  </Table>
);

export default FeedbackTable;
