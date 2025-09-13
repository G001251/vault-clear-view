import { Category, FileItem } from "./Dashboard";
import { formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MoreHorizontal, Share, Trash2, Edit, FolderOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryDetailProps {
  category: Category;
  onBack: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const CategoryDetail = ({ category, onBack, searchQuery, setSearchQuery }: CategoryDetailProps) => {
  const Icon = category.icon;
  
  // Mock extended file list for demonstration
  const allFiles: FileItem[] = [
    ...category.recentFiles,
    // Add more mock files
    { id: 'f1', name: 'Annual Report 2023.pdf', size: 24 * 1024 * 1024, dateModified: '2024-01-12', type: category.id as any },
    { id: 'f2', name: 'Contract Template.docx', size: 5 * 1024 * 1024, dateModified: '2024-01-11', type: category.id as any },
    { id: 'f3', name: 'Financial Statements.xlsx', size: 18 * 1024 * 1024, dateModified: '2024-01-10', type: category.id as any },
    { id: 'f4', name: 'Project Timeline.pdf', size: 12 * 1024 * 1024, dateModified: '2024-01-09', type: category.id as any },
    { id: 'f5', name: 'Marketing Brief.pptx', size: 35 * 1024 * 1024, dateModified: '2024-01-08', type: category.id as any },
    { id: 'f6', name: 'Client Feedback.docx', size: 8 * 1024 * 1024, dateModified: '2024-01-07', type: category.id as any },
  ];
  
  const filteredFiles = searchQuery 
    ? allFiles.filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allFiles;
  
  const usagePercentage = 75; // Mock usage percentage
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="h-10 w-10 rounded-xl hover:bg-surface"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${category.color}/10`}>
                  <Icon className={`h-6 w-6 text-${category.color}`} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {category.fileCount} files • {formatBytes(category.totalSize)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={`Search in ${category.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-surface border-border/50 focus:border-primary rounded-xl"
                />
              </div>
            </div>
            
            <Button className="btn-primary h-10 px-4 rounded-xl">
              <FolderOpen className="h-4 w-4 mr-2" />
              Add Files
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Stats */}
        <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Files</h3>
              <p className="text-2xl font-bold text-foreground">{category.fileCount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Storage Used</h3>
              <p className="text-2xl font-bold text-foreground">{formatBytes(category.totalSize)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Usage</h3>
              <div className="flex items-center gap-3">
                <div className="storage-bar flex-1">
                  <div 
                    className={`storage-segment bg-${category.color}`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{usagePercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Files Grid */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-md overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">
              Files {searchQuery && `(${filteredFiles.length} found)`}
            </h2>
          </div>
          
          <div className="divide-y divide-border/50">
            {filteredFiles.map((file) => (
              <div 
                key={file.id} 
                className="p-4 hover:bg-surface/50 smooth-transition group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg bg-${category.color}/10`}>
                      <Icon className={`h-5 w-5 text-${category.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {file.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatBytes(file.size)} • Modified {file.dateModified}
                      </p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
          
          {filteredFiles.length === 0 && (
            <div className="p-12 text-center">
              <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'No files found' : 'No files yet'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No files match "${searchQuery}" in ${category.name}`
                  : `Start uploading files to your ${category.name} category`
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};