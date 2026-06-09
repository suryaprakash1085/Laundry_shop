import { ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RowActions, { RowActionType } from "./RowActions";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  accessor?: (row: T) => string | number;
  className?: string;
  hideOnMobile?: boolean;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T extends { id?: string | number }> {
  columns: DataTableColumn<T>[];
  rows: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  onAction?: (row: T, action: RowActionType) => void;
  hideActions?: RowActionType[];
  empty?: ReactNode;
  rowKey?: (row: T, index: number) => string | number;
  toolbar?: ReactNode;
}

function DataTable<T extends { id?: string | number }>({
  columns,
  rows,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys,
  onAction,
  hideActions,
  empty,
  rowKey,
  toolbar,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => {
      const keys = (searchKeys && searchKeys.length ? searchKeys : (Object.keys(r as object) as (keyof T)[]));
      return keys.some((k) => String((r as any)[k] ?? "").toLowerCase().includes(q));
    });
  }, [rows, query, searchKeys]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="gradient-card rounded-2xl border border-border/50 shadow-soft overflow-hidden"
    >
      {(searchable || toolbar) && (
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-3">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-muted/40 border border-border/40 outline-none text-sm focus:border-primary/40"
              />
            </div>
          )}
          {toolbar && <div className="sm:ml-auto flex items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className={`${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""} ${c.className || ""}`}
                >
                  {c.header}
                </TableHead>
              ))}
              {onAction && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (onAction ? 1 : 0)} className="py-12 text-center text-sm text-muted-foreground">
                  {empty || "No records found."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row, i) => (
                <motion.tr
                  key={rowKey ? rowKey(row, i) : (row.id ?? i)}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  {columns.map((c) => (
                    <TableCell
                      key={c.key}
                      className={`${c.hideOnMobile ? "hidden md:table-cell" : ""} ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : ""} ${c.className || ""}`}
                    >
                      {c.render ? c.render(row) : (c.accessor ? c.accessor(row) : (row as any)[c.key])}
                    </TableCell>
                  ))}
                  {onAction && (
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <RowActions size="sm" hide={hideActions} onAction={(a) => onAction(row, a)} />
                      </div>
                    </TableCell>
                  )}
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}

export default DataTable;
