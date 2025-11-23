// app/projects/components/StatusBadge.tsx
"use client";

import { Badge } from "@/components/ui/badge";  // shadcn path
import { ProjectStatus } from "@/types/project";  // Adjust nếu types ở root

const statusConfig: Record<ProjectStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Bản nháp", variant: "secondary" },
  "in-progress": { label: "Đang chỉnh sửa", variant: "default" },
  completed: { label: "Hoàn thành", variant: "outline" },
  shared: { label: "Đã chia sẻ", variant: "destructive" },
};

interface StatusBadgeProps {
  status: ProjectStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  );
}