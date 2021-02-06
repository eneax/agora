import firebase from './firebase';

const firestore = firebase.firestore();

export const createUser = (uid, data) =>
  firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });

export const createSite = data => firestore.collection('sites').add(data);

export const createFeedback = data =>
  firestore.collection('feedback').add(data);

export const deleteFeedback = id =>
  firestore
    .collection('feedback')
    .doc(id)
    .delete();

/* 
! Info
- collection is like a table in a relational db
- {merge: true} maintains the 'uid' unique
*/
