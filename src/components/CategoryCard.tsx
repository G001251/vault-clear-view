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
        <div className={`p-3 rounded-xl bg-${category.color}/10`}>
          <Icon className={`h-6 w-6 text-${category.color}`} />
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
        
        {/* Recent Files Preview */}
        <div className="space-y-2">
          {category.recentFiles.slice(0, 3).map((file) => (
            <div key={file.id} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground truncate flex-1 mr-2">{file.name}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatBytes(file.size)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Usage Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Storage used</span>
        </div>
        <div className="storage-bar">
          <div 
            className={`storage-segment bg-${category.color}`}
            style={{ width: '70%' }} // This would be calculated based on actual usage
          />
        </div>
      </div>
    </div>
  );
};