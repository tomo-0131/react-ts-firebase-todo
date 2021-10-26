import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider"
import { signInWithGoogle } from "../service/firebase";
import * as Api from "../service/api"
// import dig from "object-dig";
import { Dashboard } from "./Dashboard";

export const TodoList = (props: any) => {
  const deleteHandle = (id: any) => {
    Api.todoDelete(id);
    props.fetch();
  }
  // propsを元にliタグを作る
  const todoList = props.todos.map((todo: any) => {
    return (
      <li key={todo.id}>
        {todo.content}
        <button type="button" onClick={() => deleteHandle(todo.id)}>削除</button>
      </li>
    )
  })

  return (
    <>
      <ul>
        {todoList}
      </ul>
    </>
  )
}
