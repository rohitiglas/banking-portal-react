const TableSkeleton = () => {
    return (<div>
        {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} style={rowStyle}>
                {Array.from({ length: 4 }).map((_, cellIndex) => (
                    <div key={cellIndex} style={cellStyle}></div>
                ))}
            </div>
        ))}
    </div>)
}
const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
}
const cellStyle: React.CSSProperties = {
    flex: 1,
    height: "20px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
}
export default TableSkeleton;