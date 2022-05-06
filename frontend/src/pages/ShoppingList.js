import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import MyButton from "../components/MyButton"
import calculateClass from "../components/helper"
import { useAuthentication } from "../AuthenticationProvider";
import Button from '@mui/material/Button';


function ShoppingList() {

const [listItems, setItem] = useState([]);
const [value, setValue] = useState("");
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

function submitHandler(){
  
  let exists = listItems.some((item) => item.task===value);

  if(!exists) {
      //let newItem = {task: value, quantity: 0, id: 1234}
      //setItem([...listItems, newItem]);
      const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: value })
      };
      fetch("/tasks", requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            getTasks();
            setValue("");
          }); 
  } else {
    setValue("");
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

        <label>
          Need to buy:
          <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
        </label>
        <button onClick={submitHandler}>Add!</button>

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
