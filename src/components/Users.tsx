import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Users(){
  const [users,setUsers]=useState<any[]>([])
  const [name,setName]=useState("")

  const fetchUsers=async()=>{
    const {data}=await supabase.from('users').select('*')
    if(data) setUsers(data)
  }

  const addUser=async()=>{
    if(!name) return
    await supabase.from('users').insert({username:name,full_name:name})
    setName("")
    fetchUsers()
  }

  useEffect(()=>{fetchUsers()},[])

  return(
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Users</h2>
      <div className="flex gap-2 mb-2">
        <input value={name} onChange={e=>setName(e.target.value)}
         className="border p-1 rounded" placeholder="Name"/>
        <button onClick={addUser}
         className="bg-blue-500 text-white px-3 rounded">Add</button>
      </div>
      {users.map(u=>(
        <div key={u.id}>{u.full_name}</div>
      ))}
    </div>
  )
}
