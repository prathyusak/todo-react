import React, { useState,useEffect } from "react";
import CustomModal from "./components/Modal";
import axios from "axios";

export default function App() {
  const [show,setshow] = useState(false)
  const [todoList,settodoList]=useState([])
  const [viewComp,setviewComp]=useState(false)
  const [activeItem,setactiveItem]= useState( { title: "", description: "",completed: false})
  
  const refreshList = () => {
    axios
    .get("https://localhost:8000/api/todos/")
    .then(res => {
      console.log(res.data)
      settodoList(res.data)})
    .catch(err => console.log(err));
  }
useEffect(() => {
  refreshList();  
}, [])
const handleSubmit = (e) => {
  setshow(!show)
  e.preventDefault();
  console.log(activeItem)
  const item=activeItem
 // if (!Number.isInteger(activeItem.id)) {
 //   activeItem.id = todoList.length +1
 //   settodoList(todoList.concat(activeItem)) 
 // }  
 if (item.id) {
   axios
     .put(`https://localhost:8000/api/todos/${item.id}/`, item)
     .then(res => {
       console.log(res)
       refreshList()}
       );
   return;
 }
 axios
   .post("https://localhost:8000/api/todos/", item)
   .then(res => {
     console.log(res)
     refreshList()
    });
};
    const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={()=> {setviewComp(true)}}
          className={viewComp ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={()=> {setviewComp(false)}}
          className={viewComp ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  const renderItems = () => {
     const newItems = todoList.filter(
      item => item.completed === viewComp
    );
   const  editItem = item => {
      setactiveItem(item)
      setshow(true)
    }
    const handleDelete = item => {
      axios
      .delete(`https://localhost:8000/api/todos/${item.id}`)
      .then(res => refreshList());
    }
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            viewComp ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
   return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={()=>{
                  setshow(true)
                  setactiveItem( { title: "", description: "",completed: false})
                  }} className="btn btn-primary">
                  Add task
                </button>
                {show ? (
          <CustomModal  activeItem={activeItem} handleSubmit={handleSubmit} />
        ) : null}
              </div>
              {renderTabList()}
              <ul className="list-group list-group-flush">
                {renderItems()}
              </ul>
            </div>
          </div>
        </div>     
      </main>
    );
}
