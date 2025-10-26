import { Button } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectListItemProps {
  projectId: string;
  title: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ projectId, title, onEdit, onDelete }) => {
  return (
    <div
      className={cn(
        'cursor-pointer w-full flex items-center justify-between p-4 border rounded-md transition-colors',
        'bg-white border-gray-200 hover:border-red-400 hover:bg-gray-50',
        'dark:bg-black dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-gray-900'
      )}
    >
      <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</span>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(projectId)}
          className={cn(
            'cursor-pointer border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-500',
            'dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:text-gray-400'
          )}
        >
          <PencilIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(projectId)}
          className={cn(
            'cursor-pointer border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-500',
            'dark:border-gray-600 dark:text-gray-200 dark:hover:border-red-600 dark:hover:text-red-400'
          )}
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectListItem;
