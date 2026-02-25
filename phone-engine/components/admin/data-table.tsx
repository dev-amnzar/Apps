"use client";

import * as React from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  viewHref?: (item: T) => string;
  editHref?: (item: T) => string;
  onDelete?: (item: T) => void;
  keyExtractor: (item: T) => string;
}

export function DataTable<T>({
  data,
  columns,
  viewHref,
  editHref,
  onDelete,
  keyExtractor,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-start text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-start text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              إجراءات
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/50"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  {viewHref && (
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                      <Link href={viewHref(item)} aria-label="عرض">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {editHref && (
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                      <Link href={editHref(item)} aria-label="تعديل">
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => onDelete(item)}
                      aria-label="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-gray-500">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
