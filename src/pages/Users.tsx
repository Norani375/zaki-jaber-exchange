// src/components/Users.tsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users_custom').select('*')
      if (error) console.error(error)
      else setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.username} | {user.full_name} | {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}