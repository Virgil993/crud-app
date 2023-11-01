// client/src/views/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserHandler, User } from "@genezio-sdk/crud-app_us-east-1";

function Dashboard() {
  const [users, setUsers] = React.useState<Array<User> | null>(null);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const res = await UserHandler.getUsers();
    if (!res || !res.success) {
      console.log("error at fetching users");
      return;
    }
    setUsers(res.users || null);

    console.log(res.users);
  };

  const deleteUser = async (email: string) => {
    const res = await UserHandler.deleteUser(email);
    if (!res || !res.success) {
      alert("There was an error at deleting the user, please try again later");
      return;
    }
    if (users != null) {
      const newUsers = users.filter((element) => {
        return element.email != email;
      });
      setUsers([...newUsers]);
    }
  };

  React.useEffect(() => {
    if (!users) {
      getAllUsers();
    }
  }, [users]);
  return !users ? (
    <></>
  ) : (
    <div className="dashboard">
      <div className="header-all">Users management system</div>
      <div className="header">All users</div>
      {users.length !== 0 ? (
        <div className="users-container">
          {users.map((element) => {
            return (
              <div className="user" key={element.userId}>
                <div>Name : {element.name}</div>
                <div>Email : {element.email}</div>
                <div>Gender : {element.gender}</div>
                <div>Verified : {element.verified.toString()}</div>
                <div>
                  <button
                    onClick={() => navigate("/editUser/" + element.email)}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      var answer = window.confirm(
                        "Are you sure you want to delete this user?"
                      );
                      if (answer) {
                        deleteUser(element.email);
                      } else {
                        console.log("we dont delete the user");
                        return;
                      }
                    }}
                  >
                    Delete{" "}
                  </button>
                </div>
              </div>
            );
          })}
          <button
            onClick={(event) => {
              event.preventDefault();
              navigate("/addUser");
            }}
          >
            Add User
          </button>
        </div>
      ) : (
        <div className="users-container">
          <div>No users availabale</div>
          <button
            onClick={(event) => {
              event.preventDefault();
              navigate("/addUser");
            }}
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
