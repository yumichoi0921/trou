import React from "react";
import Button from "@mui/material/Button";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function TagList() {
  const users = [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ];

  return (
    <React.Fragment>
      {users.map((user) => (
        <Button user={user} key={user.id}>
          {user.username}
        </Button>
      ))}
    </React.Fragment>
  );
}

export default TagList;
