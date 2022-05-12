import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import MyButton from "../components/MyButton"
import calculateClass from "../components/helper"
import { useAuthentication } from "../AuthenticationProvider";
import Button from '@mui/material/Button';
import axios from "axios";


function ShoppingList() {

const [listItems, setItem] = useState([]);
const [task, setTask] = useState("");
const [image, setImage] = useState("");
const { authData, onLogout } = useAuthentication();
const navigate = useNavigate();

useEffect(() => {
  getTasks();  
},[])


function getTasks() {
fetch("/tasks")
.then(response => response.json())
.then(data => {
  console.log(data);
  setItem(data); 
})
}

function deleteItem(itemID) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ _id: itemID })
  };
  fetch("/tasks/remove", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        getTasks();
      }); 
}

function submitHandler(e){
  
  e.preventDefault();  
  let exists = listItems.some((item) => item.task===task);

  if(!exists) {
      const formData = new FormData(e.target);
      formData.get("task");
      formData.append("image", image);

      const requestOptions = {
        method: 'POST',
        url: "/tasks",
        credentials: 'include',
        headers: { 
        //'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data'
        },
        data: formData
      // body: JSON.stringify({ task: value })		//use this with fetch
      };
      axios(requestOptions)
      .then(response => {
        console.log("OK!", response);
        getTasks();
        setTask("");
      })
      // fetch("/tasks", requestOptions)
      //     .then(response => response.json())
      //     .then(data => {
      //       console.log(data);
      //       getTasks();
      //       setTask("");
      //     }); 
  } else {
    setTask("");
  } 
}

function logout(){

  const requestOptions = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };
  fetch("/users/logout", requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        onLogout();
        navigate("/login")
      })
      .catch(error => console.log(error)); 
}

    return (
      !authData.name ? (<><h1>Welcome!</h1><h2>Log in above to continue</h2></>) : 
      (<div className="list">
        {listItems.length===0 ? <h1>No items yet</h1> : <h1 style={{textAlign: 'center'}}>{authData.name && `${authData.name}'s`} shopping list</h1> }

        <form onSubmit={submitHandler}>
        <label>
          Need to buy:
          <input 
            type="text" 
            name="task"
            value={task} 
            onChange={(e)=>setTask(e.target.value)}
          />
        </label>
          <input 
            type="file" 
            name="image" 
            value={image} 
            onChange={(e)=>setImage(e.target.value)}
          /> 
        <button type="submit">Add!</button>
        </form>

          <br/>
          <br/>

        <ul>
          {listItems.map((item,index) => 
          (
            <li className="task" key={item._id}>
              
              <span className={calculateClass(item.task)}>{item.task}</span>
              
              <MyButton color="red" text="remove" handler={()=>deleteItem(item._id)}/> 
            </li>
          )
         
            )}
        </ul>

        <Button variant="contained" onClick={logout}>Get me out of here!</Button>

      </div>)
    );
}


export default ShoppingList;
