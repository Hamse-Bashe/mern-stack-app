import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import useAuthStore from "../../lib/store/authStore";
import { extractErrorMessages } from "../../util/errorUtil";
import { Loader } from "lucide-react";

const TASK_STATUSES = [
    { value: 'pending', label: 'Pending' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
];

const TaskForm = ({task, open, onOpenChange}) => {

    const [formValues,setFormValues] = useState({
            title: "",
            description: "",
            status: "pending",
            dueDate: ""
    })

    const queryClient = useQueryClient()

    const handleCancel = ()=> {
        onOpenChange?.(false)
    }



    const handleStatusChange = (value)=>{

        setFormValues({
            ...formValues,
            status: value
        })
    }

    const handleInputChange = (e)=>{
        const {name,value} = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    // create task mutation
    const createTaskMutation = useMutation({
        mutationFn: async(taskData)=>{
            const response = await api.post("/tasks", taskData);
            return response.data;
        },
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            toast.add({
                type: "success",
                description: "Task created successfully.",
            });
            onOpenChange?.(false)
            setFormValues({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
        },
        onError: (error)=>{
            console.error("creating task error: ", error);
            toast.add({
                type: "error",
                description: `Error creating task: ${extractErrorMessages(error)}`,
            });
            setValidationError(extractErrorMessages(error));
        }
    })

    // update task mutation
    const updateTaskMutation = useMutation({
        mutationFn: async(taskData)=>{
            const response = await api.put(`/tasks/${task._id}`, taskData);
            return response.data;
        },
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            toast.add({
                type: "success",
                description: "Task updated successfully.",
            });
            onOpenChange?.(false)
            setFormValues({
                title: '',
                description: '',
                status: 'pending',
                dueDate: ''
            });
        },
        onError: (error)=>{
            console.error("updating task error: ", error);
            toast.add({
                type: "error",
                description: `Error updating task: ${extractErrorMessages(error)}`,
            });
            setValidationError(extractErrorMessages(error));
        }
    })

    const [validationError,setValidationError] = useState(null)

    const handleSubmit = (e)=> {
        e.preventDefault();

        if(!formValues.title){
            setValidationError("Task title is required")
            return
        }

        const taskData = {
            title: formValues.title.trim(),
            description: formValues.description.trim() || "",
            status: formValues.status,
            dueDate: formValues.dueDate ? new Date(formValues.dueDate).toISOString() : null
        }

        if(task){
            updateTaskMutation.mutate(taskData);
        }else{
          // create task mutation
            createTaskMutation.mutate(taskData)  
        }

        


    }

    useEffect(()=>{
        if(task){
            setFormValues({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'pending',
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
            })
        }else{
            setFormValues({
                title: "",
                description: "",
                status: "pending",
                dueDate: ""
            })
        }
    },[task,open])

    const displayError = validationError ||
        extractErrorMessages(createTaskMutation.error);

    const isLoading = createTaskMutation.isPending || updateTaskMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create New Task
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>
        {/* Inputs */}
        <form className="space-y-6" onSubmit={handleSubmit}>
            {displayError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {displayError}
                        </div>
            )}

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            type="text"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Enter task description"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Select
                            value={formValues.status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {TASK_STATUSES.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            value={formValues.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <DialogFooter className="flex justify-end space-x-2">

                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>


                        {/* <Button type="submit">Create Task</Button> */}
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    {task ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                task ? 'Update Task' : 'Create Task'
                            )}
                        </Button>

                    </DialogFooter>

                </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
