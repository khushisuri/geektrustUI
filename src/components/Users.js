import React from "react";

export const Users = ({
  currentUsers,
  deleteUser,
  selectUser,
  setUserToEdit,
  setDisplayModal,
  selectedUsers,
  selectAllUsers,
}) => {
  return (
    <>
      <h2>Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                onChange={() => {
                  selectAllUsers();
                }}
              ></input>
            </td>
            <td>
              <p>Name</p>
            </td>
            <td>
              <p>Email</p>
            </td>
            <td>
              <p>Role</p>
            </td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => {
            return (
              <tr
                key={user.id}
                className="user-item"
                style={{ display: user.show ? "table-row" : "none" }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.filter(
                        (selecteduser) => selecteduser.id === user.id
                      ).length >= 1
                    }
                    onChange={() => {
                      selectUser(user.id);
                    }}
                  ></input>
                </td>
                <td>
                  <p>{user.name}</p>
                </td>
                <td>
                  <p>{user.email}</p>
                </td>
                <td>
                  <p>{user.role}</p>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setDisplayModal(true);
                      setUserToEdit(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
