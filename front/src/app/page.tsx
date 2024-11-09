'use client'
import { useEffect, useState } from "react";

interface User {
  id: number
  email: string
  password: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  const getData = async () => {
    return fetch('/api/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      }
    )
    .then(response => response.json())
    .then(response => setUsers(response.data));
  }

  return (
    <div>
      Olá mundo
      <ul>
        {users && users.map((user) => (
          <li key={user.id}>{user.id} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
