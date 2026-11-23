import { ClipboardCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const CardStatus = ({tasks = []}) => {

    const getTaskStats = ()=> {
        const total = tasks.length;
        const pending = tasks.filter(task => task.status === 'pending').length;
        const inProgress = tasks.filter(task => task.status === 'in progress').length;
        const completed = tasks.filter(task => task.status === 'completed').length;

        const progressPercentage = inProgress/total * 100;
        // Math.round(progressPercentage)

        return {total, pending, inProgress, completed, progressPercentage}
    }

    const stats = getTaskStats()
    const progPer = Math.round(stats.progressPercentage)

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              In Progress
            </p>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>

        <div className="bg-card p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Progress
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <p className="text-2xl font-bold text-black">{progPer}%</p>
            <Badge variant='secondary'>In Progress</Badge>
          </div>
        </div>
    </div>
  )
}

export default CardStatus