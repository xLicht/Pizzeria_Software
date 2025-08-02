interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  widthClass?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  heightClass?: string;
  containerClassName?: string;
  tableClassName?: string;
  headClassName?: string;
  evenRowClassName?: string;
  oddRowClassName?: string;
  rowDividerClassName?: string;
  onRowClick?: (row: T) => void;
}

export default function Table<T>({
  columns,
  data,
  heightClass = "",
  containerClassName = "",
  tableClassName = "",
  headClassName = "",
  evenRowClassName = "bg-white",
  oddRowClassName = "bg-gray-50",
  rowDividerClassName = "divide-gray-200",
  onRowClick,
}: Props<T>) {
  return (
    <div
      className={`${heightClass} overflow-y-auto rounded-md border ${containerClassName}`}
    >
      <table className={`min-w-full divide-y ${tableClassName}`}>
        <thead className={`${headClassName}`}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`bg-white divide-y ${rowDividerClassName}`}>
          {" "}
          {data.map((row, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? evenRowClassName : oddRowClassName} ${
                onRowClick ? "cursor-pointer hover:bg-gray-100" : ""
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, j) => (
                <td key={j} className="px-4 py-2 whitespace-nowrap text-sm">
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
