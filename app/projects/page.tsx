// app/projects/page.tsx
"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectListHeader } from "./components/ProjectListHeader";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Layout, Image } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const mockData = [
  { id: "1", name: "Nhập môn Java OOP", creator: { name: "Trần Minh" }, status: "in-progress" as const, createdAt: "2025-11-23T10:00:00Z", slideCount: 42 },
  { id: "2", name: "Cơ sở dữ liệu nâng cao", creator: { name: "Lan Anh" }, status: "completed" as const, createdAt: "2025-11-18T14:30:00Z", slideCount: 68 },
  { id: "3", name: "Machine Learning cơ bản", creator: { name: "Huy Nguyễn" }, status: "draft" as const, createdAt: "2025-11-23T09:15:00Z", slideCount: 12 },
  { id: "4", name: "Phát triển Web với Next.js", creator: { name: "Minh Vũ" }, status: "in-progress" as const, createdAt: "2025-11-22T16:20:00Z", slideCount: 29 },
  { id: "5", name: "Thiết kế giao diện người dùng", creator: { name: "Ngọc Ánh" }, status: "completed" as const, createdAt: "2025-11-20T08:00:00Z", slideCount: 55 },
  { id: "6", name: "Cấu trúc dữ liệu và giải thuật", creator: { name: "Đức Anh" }, status: "draft" as const, createdAt: "2025-11-19T13:45:00Z", slideCount: 8 },
  // Thêm nhiều hơn để test phân trang
];

const ITEMS_PER_PAGE = 8;

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [projects, setProjects] = useState(mockData);

  const filtered = useMemo(() => {
    let result = [...projects];
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (filter !== "all") result = result.filter(p => p.status === filter);
    result.sort((a, b) => {
      if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return result;
  }, [projects, search, filter, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài giảng này?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleCreate = (template: string) => {
    const newProject = {
      id: Date.now().toString(),
      name: template === "blank" ? "Bài giảng mới" : `Mẫu ${template}`,
      creator: { name: "Bạn" },
      status: "draft" as const,
      createdAt: new Date().toISOString(),
      slideCount: 0,
    };
    setProjects(prev => [newProject, ...prev]);
    setOpenCreate(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">プロジェクト一覧</h1>
            <p className="text-gray-600 mt-1">Tổng {filtered.length} bài giảng</p>
          </div>
          <Button onClick={() => setOpenCreate(true)} size="lg" className="shadow-lg">
            <Plus className="mr-2 h-5 w-5" /> Tạo bài giảng mới
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <ProjectListHeader search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
            <p className="text-gray-500 text-lg">Chưa có bài giảng nào</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-7">
              {paginated.map(project => (
                <div key={project.id} className="aspect-[3/2.7] relative group">
                  <ProjectCard project={project} onDelete={() => handleDelete(project.id)} />
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Phân trang đẹp */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={() => setPage(p => Math.max(1, p-1))} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <PaginationItem key={p}>
                        <PaginationLink href="#" isActive={p === page} onClick={() => setPage(p)}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext href="#" onClick={() => setPage(p => Math.min(totalPages, p+1))} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal tạo project */}
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chọn mẫu để bắt đầu</DialogTitle>
            <DialogDescription>Chọn một template phù hợp với bài giảng của bạn</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <button onClick={() => handleCreate("blank")} className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="font-medium">Trắng</p>
              <p className="text-sm text-gray-500">Bắt đầu từ trang trắng</p>
            </button>
            <button onClick={() => handleCreate("standard")} className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
              <Layout className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="font-medium">Tiêu chuẩn</p>
              <p className="text-sm text-gray-500">Mẫu Bách Khoa chuẩn</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}