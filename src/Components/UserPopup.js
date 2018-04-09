import * as React from "react";

const PopUpUser = ({ userName, email }) => (
  <ul>
    <li>
      <b>userName:</b>
      {userName}
    </li>
    <li>
      <b>email:</b>
      {email}
    </li>
  </ul>
);

export default PopUpUser;
