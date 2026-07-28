import type { ReactNode } from "react";

export type Column<T> = {
    key: keyof T;
    title: string;
    isClickable?:boolean
    render?: (value: T[keyof T], row: T) => ReactNode;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data?: T[];
    message?: string;
    rowClickHandler?: (row: T) => void;
    mouseEnter?: (row:T)=>void;
    onCellClick?:(row:T)=>void
};

const DataTable = <T extends Record<string, any>>({ columns, data = [], message, rowClickHandler,mouseEnter,onCellClick }: DataTableProps<T>) => {
    if (data.length === 0) {
        return <div>{message || "No data available"}</div>;
    }
    return (
        <table style={tableStyle}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={String(column.key)} style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={row?.id || index} 
                    onMouseEnter={()=>mouseEnter?.(row)}
                    >
                        {columns.map((column) => (
                            <td
                                key={String(column.key)}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    cursor: column.isClickable ? "pointer" : "default",
                                }}
                                onClick={(event) => {
                                    if (column.isClickable) {
                                        event.stopPropagation();
                                        onCellClick?.(row);
                                        
                                    }else{
                                        rowClickHandler?.(row);

                                    }
                                }}
                            >
                                {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
const tableStyle:React.CSSProperties={
    width:"100%",
    borderCollapse:"collapse",  
    backgroundColor:"white",
}

export default DataTable;