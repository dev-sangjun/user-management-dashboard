import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getEntries, selectEntry } from "../store/entry.reducer";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modal.reducer";
import { formatValue } from "../utils";
import { USER_ENTRY_DEFAULT_FIELDS } from "../global/constants";

const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector((state: RootState) => getEntries(state));
  const renderEntries = () => {
    return entries.map(entry => {
      // skip table data for fields in skipFieldList
      const skipFieldList = ["_id", "other"];
      return (
        <tbody
          key={entry._id}
          className="cursor-pointer bg-white hover:bg-slate-100"
          onClick={() => {
            dispatch(selectEntry(entry));
            dispatch(openModal("ENTRY_VIEW"));
          }}
        >
          <tr className="border-b border-b-slate-300">
            {Object.entries(entry)
              .filter(([key]) => !skipFieldList.includes(key))
              .map(([key, value]) => (
                <td key={key} className="p-4 text-slate-500 whitespace-pre">
                  {formatValue(key, value)}
                </td>
              ))}
          </tr>
        </tbody>
      );
    });
  };
  console.log(USER_ENTRY_DEFAULT_FIELDS);
  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-b-slate-300">
            {USER_ENTRY_DEFAULT_FIELDS.map(field => (
              <th key={field} className="p-4 bg-primary text-white text-left">
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
