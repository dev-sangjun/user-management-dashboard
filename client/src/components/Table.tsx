import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getEntries } from "../store/entry.reducer";
import moment from "moment";

const Table = () => {
  const fields = [
    "First Name",
    "Middle Name",
    "Last Name",
    "Birth Date",
    "Status",
    "Address",
  ];
  const entries = useSelector((state: RootState) => getEntries(state));
  const renderEntries = () => {
    return entries.map(entry => {
      // skip table data for fields in skipFieldList
      // TODO: skip these from the server
      const skipFieldList = ["_id", "createdBy", "__v"];
      const formatValue = (key: string, value: string) => {
        if (key === "birthDate") {
          return moment(value).format("MM/DD/YYYY");
        }
        return value;
      };
      return (
        <tbody>
          <tr className="border-b border-b-slate-300">
            {Object.entries(entry)
              .filter(([key]) => !skipFieldList.includes(key))
              .map(([key, value]) => (
                <td key={key} className="p-4 bg-white text-slate-500">
                  {formatValue(key, value)}
                </td>
              ))}
          </tr>
        </tbody>
      );
    });
  };
  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-b-slate-300">
            {fields.map(field => (
              <th key={field} className="p-4 bg-teal-700 text-white text-left">
                {field}
              </th>
            ))}
          </tr>
        </tbody>
        {renderEntries()}
      </table>
    </div>
  );
};

export default Table;
