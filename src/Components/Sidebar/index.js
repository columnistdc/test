import * as React from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import User from "../User";
import { selectUserById } from "../../Actions";

// const SideBar = props => {
//   const { sideBar: { users, selected } } = props;
//   if (!users) {
//     return <div>loading...</div>;
//   }

//   return (
//     <div className="SideBar">
//       {_.map(users, user => (
//         <User
//           onSelectUser={() => props.selectUserById(user.id)}
//           key={user.id}
//           {...user}
//           selected={user.id === selected}
//         />
//       ))}
//     </div>
//   );
// };

const SideBar = ({ props }) => <div>aa;lajs;asj;</div>;

const mapStateToProps = state => ({
  sideBar: state.sideBar
});

const mapDispatchToProps = dispatch => ({
  selectUserById: id => {
    dispatch(selectUserById(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
