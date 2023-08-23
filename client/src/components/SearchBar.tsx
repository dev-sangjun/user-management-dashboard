import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getUser } from "../store/user.reducer";
import {
  USER_ENTRY_FIELD_NAMES,
  USER_ENTRY_DEFAULT_KEYS,
  INPUT_CLASSES,
} from "../global/constants";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncFetchEntries } from "../store/entry.reducer";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customFields = useSelector(
    (state: RootState) => getUser(state).customFields
  );
  const fields = USER_ENTRY_DEFAULT_KEYS.concat(
    Object.keys(customFields || {})
  );
  const [field, setField] = useState(fields?.[0] || "firstName");
  const renderFields = () => {
    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setField(e.currentTarget.value);
    };
    return (
      <select
        className="select select-sm select-bordered"
        onChange={onSelectChange}
      >
        {fields.map((field: string) => (
          <option key={field} value={field}>
            {USER_ENTRY_FIELD_NAMES?.[field] || field}
          </option>
        ))}
      </select>
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget?.["field-value"]?.value;
    if (field && value) {
      try {
        await dispatch(asyncFetchEntries({ field, value }));
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await dispatch(asyncFetchEntries({}));
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
      {renderFields()}
      <input name="field-value" className={INPUT_CLASSES} placeholder="Value" />
      <button className="btn btn-sm btn-outline normal-case">Search</button>
    </form>
  );
};

export default SearchBar;
