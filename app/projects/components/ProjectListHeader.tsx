// app/projects/components/ProjectListHeader.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  filter: string;
  setFilter: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
}

export function ProjectListHeader({ search, setSearch, filter, setFilter, sort, setSort }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm bài giảng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11">
                Trạng thái: {filter === "all" ? "Tất cả" : filter === "draft" ? "Bản nháp" : filter === "in-progress" ? "Đang làm" : "Hoàn thành"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                <DropdownMenuRadioItem value="all">Tất cả</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="draft">Bản nháp</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="in-progress">Đang chỉnh sửa</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">Hoàn thành</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11">
                Sắp xếp: {sort === "newest" ? "Mới nhất" : sort === "oldest" ? "Cũ nhất" : "Tên A→Z"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">Mới nhất</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Cũ nhất</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name">Tên A → Z</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}