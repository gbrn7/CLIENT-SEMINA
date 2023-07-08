import React from 'react'

export default function Table({users}) {
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key ={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}
