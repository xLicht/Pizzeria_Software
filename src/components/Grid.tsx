interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  widthClass?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  heightClass?: string;
}

export default function Table<T>({ columns, data, heightClass }: Props<T>) {
  return (
    <div
      className={`${
        heightClass || ""
      } overflow-y-auto border border-gray-200 rounded-md`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider${
                  col.widthClass || ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 whitespace-nowrap text-sm text-gray-700 ${
                    col.widthClass || ""
                  }`}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-4 text-center text-gray-500"
              >
                No hay datos que mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
