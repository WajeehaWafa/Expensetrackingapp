import React, { Fragment, useState } from "react";
//import './Form.css';
import "./App.css";
//import Completed from "./components/Complete";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadonlyRow";
function Data() {
  const [todo, settodo] = useState("");
  const taskenter = (event) => {
    settodo(event.target.value);
  };
  const [editformdata, seteditformdata] = useState({
    name: "",
  });
  const [editContactId, seteditContactId] = useState(null);
  const [tododata, setdata] = useState([]);
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    seteditContactId(contact.id);
    const formvalue = {
      name: contact.name,
    };
    seteditformdata(formvalue);
  };

  const handleaddFormsubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: Math.random().toString(),
      name: todo,
      status: "false",
    };
    setdata([...tododata, newContact]);
    settodo("");
  };
  const handleEditformchange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldvalue = event.target.value;
    const newFormdata = { ...editformdata };
    newFormdata[fieldName] = fieldvalue;
    seteditformdata(newFormdata);
  };
  const handleEditedformsubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editContactId,
      name: editformdata.name,
    };
    const newContacts = [...tododata];
    const index = tododata.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;
    console.log("Task Updated");
    setdata(newContacts);
    seteditContactId(null);
  };
  const del = (ind) => {
    const delrow = tododata.filter((data) => {
      return ind !== data.id;
    });
    console.log("Task Deleted");
    setdata(delrow);
  };
  const Complete = (id) => {
    //setstatus(true);

    console.log("Task Completed");
    let updatedTodos = tododata.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setdata(updatedTodos);
  };
  return (
    <div>
      <div className="tab">
        <form onSubmit={handleaddFormsubmit}>
          <label>Todos</label>
          <input
            type="text"
            placeholder="Enter todo"
            name="name"
            value={todo}
            onChange={taskenter}
          />

          <button type="submit"> Add </button>
        </form>
      </div>
      <form onSubmit={handleEditedformsubmit}>
        <table border="1" className="tab">
          <thead>
            <tr>
              <th>Todos</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tododata.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editformdata={editformdata}
                    handleEditformchange={handleEditformchange}
                  />
                ) : (
                  <ReadOnlyRow
                    isComplete={contact.completed}
                    contact={contact}
                    handleEditClick={handleEditClick}
                    del={del}
                    Complete={Complete}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
export default Data;
