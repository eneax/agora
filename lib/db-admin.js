import firebase from './firebase-admin';

export const getAllFeedback = async siteId => {
  // snapshot is a current state in time of the feedback
  const snapshot = await firebase
    .collection('feedback')
    .where('siteId', '==', siteId)
    .get();

  const feedback = [];

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return feedback;
};
