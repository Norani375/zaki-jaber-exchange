import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Accounts(){
  const [accounts,setAccounts]=useState<any[]>([])

  const fetchAccounts=async()=>{
    const {data}=await supabase.from('accounts').select('*')
    if(data) setAccounts(data)
  }

  useEffect(()=>{fetchAccounts()},[])

  return(
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Accounts</h2>
      {accounts.map(a=>(
        <div key={a.id}>
          {a.account_number} - {a.balance}
        </div>
      ))}
    </div>
  )
}
