import { useState } from "react";
import { Search, Upload, User, FolderOpen, FileText, Image, Video, Presentation, FileType, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CategoryDetail } from "@/components/CategoryDetail";

export interface FileItem {
  id: string;
  name: string;
  size: number;
  dateModified: string;
  type: 'document' | 'image' | 'video' | 'presentation' | 'txt' | 'archive';
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
    color: 'bg-red-500',
    fileCount: 147,
    totalSize: 225 * 1024 * 1024, // 225 MB
    recentFiles: [
      { id: '1', name: 'The Science of Black', size: 630 * 1024, dateModified: '2024-01-15', type: 'document' },
      { id: '2', name: 'Budget Report.xlsx', size: 8 * 1024 * 1024, dateModified: '2024-01-14', type: 'document' },
    ],
    files: []
  },
  {
    id: 'videos',
    name: 'Videos',
    icon: Video,
    color: 'bg-yellow-500',
    fileCount: 42,
    totalSize: 100 * 1024 * 1024, // 100 MB
    recentFiles: [
      { id: '7', name: 'Unboxing Latest Tech', size: 650 * 1024, dateModified: '2024-01-16', type: 'video' },
      { id: '8', name: 'Training Video.mov', size: 180 * 1024 * 1024, dateModified: '2024-01-12', type: 'video' },
    ],
    files: []
  },
  {
    id: 'images',
    name: 'Images',
    icon: Image,
    color: 'bg-purple-900',
    fileCount: 1204,
    totalSize: 277 * 1024 * 1024, // 277 MB
    recentFiles: [
      { id: '4', name: 'Test Render C4d', size: 15 * 1024 * 1024, dateModified: '2024-01-16', type: 'image' },
      { id: '5', name: 'Team_Photo.png', size: 22 * 1024 * 1024, dateModified: '2024-01-15', type: 'image' },
    ],
    files: []
  },
  {
    id: 'presentations',
    name: 'Presentations',
    icon: Presentation,
    color: 'bg-indigo-600',
    fileCount: 28,
    totalSize: 95 * 1024 * 1024, // 95 MB
    recentFiles: [
      { id: '9', name: 'Q4 Business Review', size: 25 * 1024 * 1024, dateModified: '2024-01-16', type: 'presentation' },
      { id: '10', name: 'Project Proposal.pptx', size: 18 * 1024 * 1024, dateModified: '2024-01-15', type: 'presentation' },
    ],
    files: []
  },
  {
    id: 'txt',
    name: 'Text Files',
    icon: FileType,
    color: 'bg-green-600',
    fileCount: 65,
    totalSize: 12 * 1024 * 1024, // 12 MB
    recentFiles: [
      { id: '11', name: 'Meeting Notes.txt', size: 245 * 1024, dateModified: '2024-01-16', type: 'txt' },
      { id: '12', name: 'Project Requirements.md', size: 1.5 * 1024 * 1024, dateModified: '2024-01-14', type: 'txt' },
    ],
    files: []
  },
];

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const totalUsed = mockCategories.reduce((sum, cat) => sum + cat.totalSize, 0);
  const totalAvailable = 1024 * 1024 * 1024; // 1024 MB (1 GB)
  const usedPercentage = (totalUsed / totalAvailable) * 100;
  
  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };

  const recentFiles = [
    { id: '1', name: 'The Science of Black', size: 630 * 1024, preview: '🟥', type: 'document' },
    { id: '2', name: 'Unboxing Latest Tech', size: 650 * 1024, preview: '🔵', type: 'video' },
    { id: '3', name: 'Test Render C4d', size: 15 * 1024 * 1024, preview: '🟡', type: 'image' },
  ];
  
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-1">File Manager</p>
              <h1 className="text-3xl font-bold text-gray-900">Hello,</h1>
              <h1 className="text-3xl font-bold text-gray-900">Morsel</h1>
            </div>

            {/* Category Cards - Horizontal Scrollable */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">File Categories</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {mockCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className={`${category.color} rounded-3xl p-6 text-white cursor-pointer hover:scale-105 transition-transform relative overflow-hidden min-w-[280px] flex-shrink-0`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="h-6 w-6" />
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      <p className="text-white/90 text-sm mb-2">{category.fileCount} files</p>
                      <p className="text-white/90 text-sm">{formatSize(category.totalSize)}</p>
                      <div className="absolute bottom-4 right-4 opacity-30">
                        <Icon className="h-8 w-8 opacity-50" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Storage Analytics */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {formatSize(totalUsed)} / {formatSize(totalAvailable)}
                  </h3>
                  <p className="text-gray-500 text-sm">Available Storage</p>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray={`${usedPercentage}, 100`}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Recent Files */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Files</h2>
                <button className="text-gray-500 text-sm hover:text-gray-700">See All</button>
              </div>
              
              <div className="space-y-3">
                {recentFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${
                        file.type === 'document' ? 'bg-red-100' : 
                        file.type === 'video' ? 'bg-blue-100' : 'bg-yellow-100'
                      } flex items-center justify-center text-xl`}>
                        {file.preview}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{file.name}</h3>
                        <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Storage Breakdown & Upgrade */}
          <div className="space-y-6">
            {/* Storage Breakdown */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>Used Storage</span>
                  <span>{formatSize(totalUsed)} / {formatSize(totalAvailable)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 via-purple-900 to-indigo-600 h-2 rounded-full" 
                    style={{ width: `${usedPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{formatSize(category.totalSize)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Storage Card */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-2">Want to increase</h3>
                <h3 className="text-lg font-semibold mb-4">Storage Capacity?</h3>
                <Button className="bg-white text-orange-500 hover:bg-gray-100 rounded-xl px-6 py-2 font-medium">
                  Upgrade
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 opacity-30">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl">
                  📁
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};