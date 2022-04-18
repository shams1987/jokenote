import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      {sessionUser.id === user.id && (
        <button
          className=""
          onClick={() => history.push(`/users/${userId}/edit`)}
        >
          Edit
        </button>
      )}
    </ul>
  );
}
export default User;
