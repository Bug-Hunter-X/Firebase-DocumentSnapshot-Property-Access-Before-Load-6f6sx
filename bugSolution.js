To fix this, make sure to always handle the asynchronous nature of Firebase queries. Use `.then()` to access the data after the promise resolves or use async/await:

// Incorrect implementation (bug.js)
const docRef = doc(db, 'collection', 'docId');
const docSnap = await getDoc(docRef);
const data = docSnap.data(); // This might throw an error if the snapshot isn't loaded yet
console.log(data.someProperty);

// Correct implementation using async/await (bugSolution.js)
const docRef = doc(db, 'collection', 'docId');
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  const data = docSnap.data();
  console.log(data.someProperty); // Access data after checking existence
} else {
  console.log('No such document!');
}

// Correct implementation using .then() (bugSolution.js)
getDoc(docRef).then(docSnap => {
if (docSnap.exists()) {
  const data = docSnap.data();
  console.log(data.someProperty);
} else {
  console.log('No such document!');
}
}).catch(error => {
  console.error('Error getting document:', error);
});