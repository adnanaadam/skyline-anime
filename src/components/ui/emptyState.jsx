import { Heart } from 'lucide-react';

export default function EmptyState({ title, description, icon = 'heart' }) {
  const Icon = {
    heart: Heart,
    // add more icons as needed
  }[icon];

  return (
    <div className="flex flex-col items-center justify-center h-96 text-center p-4">
      <div className="bg-gray-800/50 p-6 rounded-full mb-4">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md">{description}</p>
    </div>
  );
}