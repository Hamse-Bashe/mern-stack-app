import React, { useState } from 'react'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import DashboardWelcome from '../../components/dashboard/DashboardWelcome'
import TaskForm from '../../components/task/TaskForm'
import TaskList from '../../components/task/TaskList'
import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { Loader } from 'lucide-react'

export const DashboardPage = () => {

  const [showCreateForm,setShowCreateForm] = useState(false)
  const [editingTask,setEditingTask] = useState(null)

  const handleFormClose = ()=> {
    setShowCreateForm(false)
    setEditingTask(null)
  }

  const handleCreateTaskClick = ()=>{
    setShowCreateForm(true)
  }

  const handleEditTask = (task)=>{
    setEditingTask(task);
    setShowCreateForm(true)
  }

  const handleTaskStatusChange = async (taskId, statusData)=>{
    // mutation to update task status
    // this function will be called when the status of a task is changed
  }


  const taskQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async ()=> {
      const response = await api.get('/tasks');
      return response.data
    },
    retry: 1
  })

  if(taskQuery.isLoading){
    return (
      <div className='flex h-screen justify-center items-center'>
        <Loader className='animate-spin'/>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <DashboardHeader/>
      {/* Main section */}
      <main className='max-w-7xl mx-auto px-4 py-8 space-y-6 '>
        {/* Welcome section */}
        <DashboardWelcome
          showCreateForm={showCreateForm}
          onCreateTask={handleCreateTaskClick}
          tasks={taskQuery.data}
        />
        {/* Tasks section */}
        <div>
          <TaskList
            tasks={taskQuery.data || []}
            isLoading={taskQuery.isLoading}
            onEdit={handleEditTask}
            onStatusChange={handleTaskStatusChange}
          />
        </div>
      </main>

        {/* Tasks dialog form */}
        <TaskForm
          task={editingTask}
          open={showCreateForm || !!editingTask}
          onOpenChange={handleFormClose}
        />
    </div>
  )
}
