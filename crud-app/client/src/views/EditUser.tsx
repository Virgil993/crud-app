import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserHandler, User } from "@genezio-sdk/crud-app_us-east-1";

function EditUser() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = React.useState<User | null>(null);
  const [name, setName] = React.useState<string>("");
  const [verified, setVerified] = React.useState<boolean | null>(null);
  const [gender, setGender] = React.useState<string>("");
  const [error, setError] = React.useState("");

  const getUser = async (email: string) => {
    const res = await UserHandler.getUserByEmail(email);
    if (!res || !res.success) {
      navigate("/dashboard");
      return;
    }
    setName(res.user!.name);
    setVerified(res.user!.verified);
    setGender(res.user!.gender);
    setUser(res.user!);
  };

  const handleSubmit = async () => {
    if (name == "") {
      setError("Name is mandatory");
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
    const newUser = {
      userId: user!.userId,
      email: user!.email,
      name: name,
      gender: gender,
      verified: verified,
    };
    const res = await UserHandler.updateUser(user!.email, newUser);
    if (!res) {
      setError("Unexpected error, please try again later");
      return;
    }
    if (!res.success) {
      setError(res.msg || "");
      return;
    }

    alert("User updated successfully!");
    navigate("/dashboard");
  };
  React.useEffect(() => {
    if (!user && params) {
      getUser(params.email || "");
    }
  }, [user, params]);

  return user ? (
    <div className="edit-user">
      <div className="header-all">User management system</div>
      <div className="header">Edit user</div>
      <div className="edit-user-container">
        <form className="edit-user-form">
          <div className="form-group">
            <label>Email</label>
            <div>{user.email}</div>
          </div>
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
            <label>Gender</label>
            <div className="radio-button-container">
              <input
                name="gender"
                type="radio"
                value="Male"
                defaultChecked={gender == "Male"}
                onClick={() => setGender("Male")}
              />
              Male
            </div>
            <div className="radio-button-container">
              <input
                name="gender"
                type="radio"
                value="Female"
                defaultChecked={gender == "Female"}
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
                defaultChecked={verified == true}
                onClick={() => setVerified(true)}
              />
              True
            </div>
            <div className="radio-button-container">
              <input
                name="verified"
                type="radio"
                value="false"
                defaultChecked={!verified == true}
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
              Edit user
            </button>
          </div>
          {error != "" ? <div className="error-alert">{error}</div> : <></>}
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default EditUser;
