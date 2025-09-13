import { Category } from "./Dashboard";
import { formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface StorageOverviewProps {
  categories: Category[];
  totalUsed: number;
  totalAvailable: number;
}

export const StorageOverview = ({ categories, totalUsed, totalAvailable }: StorageOverviewProps) => {
  const usagePercentage = (totalUsed / totalAvailable) * 100;
  
  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">Storage Overview</h2>
          <p className="text-muted-foreground">
            {formatBytes(totalUsed)} of {formatBytes(totalAvailable)} used
          </p>
        </div>
        
        <Button variant="outline" className="btn-secondary rounded-xl">
          <ArrowUp className="h-4 w-4 mr-2" />
          Upgrade Storage
        </Button>
      </div>
      
      {/* Main Storage Bar */}
      <div className="mb-6">
        <div className="storage-bar h-3 mb-3">
          {categories.map((category, index) => {
            const categoryPercentage = (category.totalSize / totalAvailable) * 100;
            return (
              <div
                key={category.id}
                className={`storage-segment ${category.color} ${index === 0 ? 'rounded-l-full' : ''} ${index === categories.length - 1 ? 'rounded-r-full' : ''}`}
                style={{ width: `${categoryPercentage}%` }}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0 GB</span>
          <span>{Math.round(usagePercentage)}% used</span>
          <span>{formatBytes(totalAvailable)}</span>
        </div>
      </div>
      
      {/* Category Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const categoryPercentage = (category.totalSize / totalAvailable) * 100;
          
          return (
            <div key={category.id} className="text-center">
              <div className="inline-flex p-2 rounded-lg mb-2" style={{ backgroundColor: `hsl(var(--${category.color.replace('storage-', '')})) / 0.1` }}>
                <Icon className="h-5 w-5" style={{ color: `hsl(var(--${category.color.replace('storage-', '')}))` }} />
              </div>
              <p className="text-sm font-medium text-foreground">{category.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(category.totalSize)}</p>
              <p className="text-xs text-muted-foreground">{categoryPercentage.toFixed(1)}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};