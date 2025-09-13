import { Category } from "./Dashboard";
import { formatBytes } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const Icon = category.icon;
  
  return (
    <div 
      className="category-card group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl" style={{ backgroundColor: `hsl(var(--${category.color.replace('storage-', '')})) / 0.1` }}>
          <Icon className="h-6 w-6" style={{ color: `hsl(var(--${category.color.replace('storage-', '')}))` }} />
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{category.fileCount} files</p>
          <p className="text-lg font-semibold text-foreground">{formatBytes(category.totalSize)}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        
      </div>
      
      {/* Usage Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Storage used</span>
        </div>
        <div className="storage-bar">
          <div 
            className={`storage-segment ${category.color} rounded-full`}
            style={{ width: `${Math.min((category.totalSize / (10 * 1024 * 1024 * 1024)) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};