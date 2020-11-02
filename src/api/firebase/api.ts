import * as firebase from 'firebase/app';

function getFirestore() {
  return firebase.firestore();
}

export function fetchCollection(
  collection: string,
): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return getFirestore().collection(collection);
}

export function addDoc<T>(collection: string, doc: T, userId: string): Promise<void> {
  return fetchCollection(collection).doc(userId).set(doc);
}

export function deleteDoc(collection: string, docId: string): Promise<void> {
  return fetchCollection(collection).doc(docId).delete();
}
