import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider"
import { signInWithGoogle } from "../service/firebase";
import * as Api from "../service/api"
import dig from "object-dig";

import { TodoList } from "./TodoList";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Button } from '@mui/material'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    marginTop: 40,
  },
  form: {
    width: "100%",
    maxWidth: 360,
    margin: "auto",
    marginBottom: 40,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  input: {
    marginRight: 10
  }
});

export const Dashboard = () => {

  const classes = useStyles();

  const currentUser = useContext(AuthContext);

  const [ inputTodo, setInputTodo ] = useState("");

  const [ todos, setTodos ] = useState([]);

  useEffect(() => {
    // Todo一覧を取得
    fetch();
  }, [currentUser])

  const fetch = async() => {
    if (dig(currentUser, 'currentUser', 'uid')) {
      const data = await Api.initGet(currentUser.currentUser.uid)
      await setTodos(data)
    }
  }

  const post = async () => {
    await Api.addTodo(inputTodo, currentUser.currentUser.uid)
    await setInputTodo("");
    fetch();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (!inputTodo) return alert("Todoを入力してください")
    post();
  }

  const formRender = () => {
    let dom
    // もしログインしていたら、TODOの入力フォーム
    if( dig(currentUser, 'currentUser', 'uid') ){
      <h2>Your Todo List</h2>
      dom = <form className={classes.form}>
        <TextField onSubmit={handleOnSubmit} placeholder="ToDoName" className={classes.input} value={inputTodo} onChange={(event) => setInputTodo(event.currentTarget.value)}/>
        <Button variant="contained" color="primary" size="small"
          disabled={inputTodo.length > 0 ? false : true}
          type="button" onClick={() => post()} >追加
        </Button>
      </form>
    } else {
    // もしログインしていない場合は、ログインボタン
      dom = <button onClick={signInWithGoogle}>ログイン</button>
    }
    return dom
  }

  return (
    <main>
      {formRender()}
      <TodoList todos={todos} fetch={fetch} />
    </main>
  )
}
