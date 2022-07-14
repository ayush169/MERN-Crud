import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFreind = () => {
    Axios.post("http://localhost:3001/addfriend", { name, age })
      .then(() => {
        setListOfFriends([...listOfFriends, { name, age }]);
      })
      .catch(() => {
        console.log("could not post data");
      });
    setName("");
    setAge("");
  };

  const updateFriend = (id) => {
    const newName = prompt("Enter new name");
    const newAge = prompt("Enter new age: ");
    Axios.patch("http://localhost:3001/update", {
      name: newName,
      age: newAge,
      id,
    })
      .then(() => {
        setListOfFriends([...listOfFriends, { name: newName, age: newAge }]);
      })
      .catch(() => {
        console.log("could not update data");
      });
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setListOfFriends(response.data);
        console.log(response);
      })
      .catch(() => {
        console.log("could not get data");
      });
  });

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button name="sumitButton" onClick={addFreind}>
          add friend
        </button>
      </div>
      <div className="listOfFriends">
        {listOfFriends.map((val) => {
          return (
            <div className="friendContainer" key={val._id}>
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
              </div>
              <button
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                Update
              </button>
              <button
                id="removeBtn"
                onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
