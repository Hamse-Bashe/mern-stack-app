import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

async function createTask(newTask) {
    const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export const Task = () => {

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["tasks"]})
        }
    })

    const [task,setTask] = useState("")

    const queryClient = useQueryClient();

    const handleAdd = ()=>{
        mutation.mutate({ title: task, completed: false})
        setTask("")
    }

  return (
    <div>
        <button onClick={handleAdd}>Add task</button>
        <Button variant="default" size="lg">Add task</Button>
        <Input type="text" value={task} onChange={(e)=> setTask(e.target.value)} className='border-2 border-black' />
    </div>
  )
}
