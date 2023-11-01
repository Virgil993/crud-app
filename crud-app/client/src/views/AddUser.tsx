// client/src/views/AddUser.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserHandler } from "@genezio-sdk/crud-app_us-east-1";

function AddUser() {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [verified, setVerified] = React.useState<boolean | null>(null);
  const [gender, setGender] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name == "") {
      setError("Name is mandatory");
      return;
    }
    if (email == "") {
      setError("Email is mandatory");
      return;
    }
    if (gender == "") {
      setError("Gender is mandatory");
      return;
    }
    if (verified == null) {
      setError("Verified is mandatory");
      return;
    }
    const res = await UserHandler.createUser(name, email, gender, verified);
    if (!res) {
      setError("Unexpected error, please try again later");
      return;
    }
    if (!res.success) {
      setError(res.msg || "");
      return;
    }

    alert("User created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="add-user">
      <div className="header-all">User management system</div>
      <div className="header">Add user</div>
      <div className="add-user-container">
        <form className="add-user-form">
          <div className="form-group">
            <label>Name</label>
            <input
              id="name"
              name="name"
              placeholder="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              id="email"
              name="email"
              placeholder="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-button-container">
              <input
                name="gender"
                type="radio"
                value="Male"
                onClick={() => setGender("Male")}
              />
              Male
            </div>
            <div className="radio-button-container">
              <input
                name="gender"
                type="radio"
                value="Female"
                onClick={() => setGender("Female")}
              />
              Female
            </div>
          </div>
          <div className="form-group">
            <label>Verified</label>
            <div className="radio-button-container">
              <input
                name="verified"
                type="radio"
                value="true"
                onClick={() => setVerified(true)}
              />
              True
            </div>
            <div className="radio-button-container">
              <input
                name="verified"
                type="radio"
                value="false"
                onClick={() => setVerified(false)}
              />
              False
            </div>
          </div>
          <div className="submit">
            <button
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              Add user
            </button>
          </div>
          {error != "" ? <div className="error-alert">{error}</div> : <></>}
        </form>
      </div>
    </div>
  );
}

export default AddUser;
