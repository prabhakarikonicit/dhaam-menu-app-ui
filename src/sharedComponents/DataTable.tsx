import React, { useEffect, useRef, useState } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  selectableRows?: boolean;
  onSelect?: (selectedRows: T[]) => void;
}

const DataTable = <T extends { id: number }>({
  data,
  columns,
  selectableRows = true,
  onSelect,
}: DataTableProps<T>) => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const isAllSelected =
    selectedRowIds.length === data.length && data.length > 0;
  const isIndeterminate =
    selectedRowIds.length > 0 && selectedRowIds.length < data.length;

  // Apply indeterminate state to the header checkbox
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const toggleSelectAll = () => {
    if (isAllSelected || isIndeterminate) {
      setSelectedRowIds([]); // clear all
    } else {
      setSelectedRowIds(data.map((row) => row.id)); // select all
    }
  };

  const toggleRow = (id: number) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Notify parent on selection change
  useEffect(() => {
    if (onSelect) {
      const selectedRows = data.filter((row) =>
        selectedRowIds.includes(row.id)
      );
      onSelect(selectedRows);
    }
  }, [selectedRowIds, data, onSelect]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left text-[12px] overflow-hidden truncate font-inter leading-tight">
        <thead className="text-xs">
          <tr className="text-headding-color bg-background-grey">
            {selectableRows && (
              <th className="p-4">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  className="w-4 h-4"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
            )}
            {columns.map((col, i) => (
              <th key={i} className={`p-4 font-[600] ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const isChecked = selectedRowIds.includes(row.id);
            return (
              <tr key={row.id} className="border-b hover:bg-background-grey">
                {selectableRows && (
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={isChecked}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-4">
                    {col.render ? col.render(row) : (row as any)[col.accessor]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
