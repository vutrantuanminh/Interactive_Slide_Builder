// app/projects/components/ProjectCard.tsx
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { StatusBadge } from "./StatusBadge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, Calendar, Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  creator: { name: string };
  status: "draft" | "in-progress" | "completed" | "shared";
  createdAt: string;
  slideCount?: number;
}

interface ProjectCardProps {
  project: Project;
  onDelete?: () => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <Card
      className="group relative h-full flex flex-col border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden bg-white"
      onClick={() => {
        // TODO: Sau này thêm navigation vào editor
        console.log("Mở bài giảng:", project.id);
      }}
    >
      {/* Nút XÓA hiện khi hover */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
          title="Xóa bài giảng"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Nội dung card */}
      <div className="p-5 pb-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 leading-6 flex-1 min-w-0 pr-6">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="text-xs bg-gray-100 text-gray-700 font-medium">
              {project.creator.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600 truncate">
            {project.creator.name}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-5 pt-0 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {format(new Date(project.createdAt), "dd/MM/yyyy", { locale: vi })}
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <FileText className="h-3.5 w-3.5" />
            {project.slideCount ?? 0} trang
          </div>
        </div>
      </div>

      {/* Thanh hiệu ứng dưới cùng khi hover */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Card>
  );
}