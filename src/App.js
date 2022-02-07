import { useEffect, useState } from "react";
import EditForm from "./components/EditForm";
import { PaginateLinks } from "./components/PaginateLinks";
import { SearchBar } from "./components/SearchBar";
import { Users } from "./components/Users";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      return fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
        .then((response) => response.json())
        .then((users) => {
          //console.log(users);
          return users;
        });
    };
    fetchUsers()
      .then((users) => {
        const usersArray = [];
        users.forEach((user) => {
          const userObj = { ...user, show: true };
          usersArray.push(userObj);
        });
        setUsers(usersArray);
        console.log(usersArray);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // console.log(users);
  });
  useEffect(() => {
    const indexOfLastUser = currentPageIndex * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    setCurrentUsers(currentUsers);
  }, [currentPageIndex, users]);

  const paginate = (pageNumber) => {
    setCurrentPageIndex(pageNumber);
  };

  const deleteUser = (id) => {
    const array = users.filter((user) => user.id !== id);
    setUsers(array);
  };

  const selectUser = (id) => {
    if (selectedUsers.filter((user) => user.id === id).length === 0) {
      const usersSelected = [...selectedUsers];
      users.forEach((user) => {
        if (user.id === id) {
          usersSelected.push(user);
        }
      });
      setSelectedUsers(usersSelected);
    } else {
      //console.log("runs");
      const remainingUsers = selectedUsers.filter((user) => user.id !== id);
      setSelectedUsers(remainingUsers);
    }
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === 10) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([...currentUsers]);
    }
  };

  const editUserDetails = (values) => {
    // console.log(values);
    const userToEditIndex = users.findIndex(
      (user) => user.id === userToEdit.id
    );
    const userObj = {
      id: userToEdit.id,
      name: values.username,
      email: values.email,
      role: values.role,
      show: true,
    };
    const copiedUsers = [...users];
    copiedUsers[userToEditIndex] = userObj;
    setUsers(copiedUsers);
    setUserToEdit(null);
  };

  const filterResults = (e) => {
    const val = e.target.value;
    console.log(e.target.value);
    const copiedUsers = [...users];
    copiedUsers.forEach((user) => {
      if (
        user.name.includes(val) ||
        user.email.includes(val) ||
        user.role.includes(val)
      ) {
        user.show = true;
      } else {
        user.show = false;
      }
    });
    setUsers(copiedUsers);
  };

  const deleteSelected = () => {
    const copiedUsers = [...users];
    selectedUsers.forEach((user) => {
      const userIndex = copiedUsers.findIndex(
        (userItem) => userItem.id === user.id
      );
      copiedUsers.splice(userIndex, 1);
    });
    console.log(copiedUsers);
    setUsers(copiedUsers);
  };

  return (
    <div className="App">
      <div
        className={`backdrop ${displayModal ? "open" : ""}`}
        onClick={() => {
          setDisplayModal(false);
          setUserToEdit(false);
        }}
      ></div>
      <SearchBar filterResults={filterResults}></SearchBar>
      <Users
        currentUsers={currentUsers && currentUsers}
        deleteUser={deleteUser}
        selectUser={selectUser}
        setDisplayModal={setDisplayModal}
        setUserToEdit={setUserToEdit}
        selectedUsers={selectedUsers}
        selectAllUsers={selectAllUsers}
        users={users}
      ></Users>
      <PaginateLinks
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
        deleteSelected={deleteSelected}
      ></PaginateLinks>
      <EditForm
        editUserDetails={editUserDetails}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        userToEdit={userToEdit}
      ></EditForm>
    </div>
  );
}

export default App;
