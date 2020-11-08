import * as firebase from 'firebase/app';

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

export function addDoc<T>(collection: string, doc: T, userId: string): Promise<void> {
  return fetchCollection(collection).doc(userId).set(doc);
}

export function deleteDoc(collection: string, docId: string): Promise<void> {
  return fetchCollection(collection).doc(docId).delete();
}
