interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
}

const StatCard = ({ title, value, icon, description }: StatCardProps) => {
  return (
    <div className="border-1 border-gray-300 rounded-lg  bg-white p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="bg-blue-100 p-2 rounded-full text-blue-700">{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default StatCard;
