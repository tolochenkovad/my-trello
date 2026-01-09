import firebase from 'firebase/compat/app';
import { task } from '../../types/tasks';

export async function getCollectionsFromFirebase(
  collections: string,
  authId: string,
): Promise<firebase.firestore.DocumentData> {
  const querySnapshot = await fetchCollection(collections).get();
  let data = {};
  querySnapshot.forEach((doc) => {
    if (doc.id === authId) {
      data = doc.data();
    }
  });
  return data;
}

function getFirestore() {
  return firebase.firestore();
}

function fetchCollection(collection: string): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
  return getFirestore().collection(collection);
}

export function addDoc(collection: string, doc: firebase.firestore.DocumentData, userId: string): Promise<void> {
  return fetchCollection(collection).doc(userId).set(doc);
}

export function updateData(collection: string, data: { [key: string]: task }, userId: string): Promise<void> {
  return fetchCollection(collection).doc(userId).update(data);
}

export function removeData(collection: string, key: string, userId: string): Promise<void> {
  return fetchCollection(collection)
    .doc(userId)
    .update({
      [key]: firebase.firestore.FieldValue.delete(),
    });
}

export function deleteDoc(collection: string, docId: string): Promise<void> {
  return fetchCollection(collection).doc(docId).delete();
}
