import { useState } from "react";
import { Search, Upload, User, FolderOpen, FileText, Image, Video, Music, Archive, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/CategoryCard";
import { StorageOverview } from "@/components/StorageOverview";
import { CategoryDetail } from "@/components/CategoryDetail";

export interface FileItem {
  id: string;
  name: string;
  size: number;
  dateModified: string;
  type: 'document' | 'image' | 'video' | 'music' | 'archive' | 'presentation';
  preview?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  fileCount: number;
  totalSize: number;
  recentFiles: FileItem[];
  files: FileItem[];
}

const mockCategories: Category[] = [
  {
    id: 'documents',
    name: 'Documents',
    icon: FileText,
    color: 'storage-documents',
    fileCount: 147,
    totalSize: 2.3 * 1024 * 1024 * 1024, // 2.3 GB
    recentFiles: [
      { id: '1', name: 'Project Proposal.pdf', size: 12 * 1024 * 1024, dateModified: '2024-01-15', type: 'document' },
      { id: '2', name: 'Budget Report.xlsx', size: 8 * 1024 * 1024, dateModified: '2024-01-14', type: 'document' },
      { id: '3', name: 'Meeting Notes.docx', size: 3 * 1024 * 1024, dateModified: '2024-01-13', type: 'document' },
    ],
    files: []
  },
  {
    id: 'photos',
    name: 'Photos',
    icon: Image,
    color: 'storage-photos',
    fileCount: 1204,
    totalSize: 8.7 * 1024 * 1024 * 1024, // 8.7 GB
    recentFiles: [
      { id: '4', name: 'Vacation_2024.jpg', size: 15 * 1024 * 1024, dateModified: '2024-01-16', type: 'image' },
      { id: '5', name: 'Team_Photo.png', size: 22 * 1024 * 1024, dateModified: '2024-01-15', type: 'image' },
      { id: '6', name: 'Product_Shot.jpg', size: 18 * 1024 * 1024, dateModified: '2024-01-14', type: 'image' },
    ],
    files: []
  },
  {
    id: 'videos',
    name: 'Videos',
    icon: Video,
    color: 'storage-videos',
    fileCount: 42,
    totalSize: 15.2 * 1024 * 1024 * 1024, // 15.2 GB
    recentFiles: [
      { id: '7', name: 'Project Demo.mp4', size: 250 * 1024 * 1024, dateModified: '2024-01-16', type: 'video' },
      { id: '8', name: 'Training Video.mov', size: 180 * 1024 * 1024, dateModified: '2024-01-12', type: 'video' },
      { id: '9', name: 'Conference_Recording.mp4', size: 420 * 1024 * 1024, dateModified: '2024-01-10', type: 'video' },
    ],
    files: []
  },
  {
    id: 'presentations',
    name: 'Presentations',
    icon: Presentation,
    color: 'storage-presentations',
    fileCount: 28,
    totalSize: 1.8 * 1024 * 1024 * 1024, // 1.8 GB
    recentFiles: [
      { id: '10', name: 'Q4 Results.pptx', size: 45 * 1024 * 1024, dateModified: '2024-01-15', type: 'presentation' },
      { id: '11', name: 'Product Launch.key', size: 68 * 1024 * 1024, dateModified: '2024-01-13', type: 'presentation' },
      { id: '12', name: 'Sales Pitch.pptx', size: 32 * 1024 * 1024, dateModified: '2024-01-11', type: 'presentation' },
    ],
    files: []
  },
  {
    id: 'music',
    name: 'Music',
    icon: Music,
    color: 'storage-music',
    fileCount: 892,
    totalSize: 4.1 * 1024 * 1024 * 1024, // 4.1 GB
    recentFiles: [
      { id: '13', name: 'Podcast_Episode_12.mp3', size: 85 * 1024 * 1024, dateModified: '2024-01-16', type: 'music' },
      { id: '14', name: 'Background_Music.wav', size: 120 * 1024 * 1024, dateModified: '2024-01-14', type: 'music' },
      { id: '15', name: 'Interview_Audio.m4a', size: 95 * 1024 * 1024, dateModified: '2024-01-12', type: 'music' },
    ],
    files: []
  },
  {
    id: 'archives',
    name: 'Archives',
    icon: Archive,
    color: 'storage-archives',
    fileCount: 15,
    totalSize: 3.4 * 1024 * 1024 * 1024, // 3.4 GB
    recentFiles: [
      { id: '16', name: 'Project_Backup.zip', size: 890 * 1024 * 1024, dateModified: '2024-01-15', type: 'archive' },
      { id: '17', name: 'Old_Documents.rar', size: 560 * 1024 * 1024, dateModified: '2024-01-10', type: 'archive' },
      { id: '18', name: 'Database_Export.tar.gz', size: 1200 * 1024 * 1024, dateModified: '2024-01-08', type: 'archive' },
    ],
    files: []
  },
];

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const totalUsed = mockCategories.reduce((sum, cat) => sum + cat.totalSize, 0);
  const totalAvailable = 50 * 1024 * 1024 * 1024; // 50 GB
  
  if (selectedCategory) {
    return (
      <CategoryDetail 
        category={selectedCategory} 
        onBack={() => setSelectedCategory(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">BlockVault</h1>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search your vault..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-surface border-border/50 focus:border-primary rounded-xl"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button className="btn-primary h-12 px-6 rounded-xl">
                <Upload className="h-5 w-5 mr-2" />
                Upload
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-border/50">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Storage Overview */}
        <div className="mb-8">
          <StorageOverview 
            categories={mockCategories}
            totalUsed={totalUsed}
            totalAvailable={totalAvailable}
          />
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">File Categories</h2>
          </div>
          
          <div className="file-grid">
            {mockCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};