import mongoose, { ObjectId, model } from "mongoose";
import { UserStatus } from "../src/global/types";

const Schema = mongoose.Schema;

export interface IEntry {
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
  status: UserStatus;
  address: string[];
  other: { [key: string]: string | number };
  createdBy: ObjectId;
}

const EntrySchema = new Schema<IEntry>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  address: [
    {
      type: String,
      required: true,
    },
  ],
  other: {
    type: Schema.Types.Map,
    of: Schema.Types.Mixed,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
  },
});

const Entry = model("Entry", EntrySchema);
export default Entry;
