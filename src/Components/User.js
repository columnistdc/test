import React from "react";

const User = ({ properties: { userName, avatar }, selected, onSelectUser }) => (
  <div className={`User ${selected && "selected"}`} onClick={onSelectUser}>
    <img className="User__img" src={avatar} alt={userName} />
    {userName}
  </div>
);

export default User;
