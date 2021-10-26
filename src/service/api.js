import firebase from "firebase";
import { db } from "./firebase"

export const addTodo = (content, uid) => {
  db.collection("todos").add({
    content: content,
    uid: uid,
    isCpmplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export const initGet = async (uid) => {
  const todo = await db
  .collection("todos")
  .orderBy("createdAt", "desc")
  .where("uid", "==", uid);

  return todo.get().then((snapShot) => {
    let todos = [];
    snapShot.forEach((doc) => {
      console.log(doc);
      todos.push({
        id: doc.id,
        content: doc.data().content,
        isComplete: doc.data().isComplete
      });
    });
    return todos;
  });
};

export const todoDelete = async (id) => {
  await db.collection("todos").doc(id).delete()
}
