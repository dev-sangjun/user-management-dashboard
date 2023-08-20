const Table = () => {
  const fields = ["name", "birthdate", "status", "address"];
  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <tr className="border-b border-b-slate-300">
          {fields.map(field => <th key={field} className="p-4 bg-teal-700 text-white">{field}</th>)}
        </tr>
      </table>
    </div>
  );
}

export default Table;