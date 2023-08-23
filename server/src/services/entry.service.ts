import moment from "moment";
import Entry, { IEntry } from "../../models/entry.model";
import User from "../../models/user.model";
import { OperationResponseDto } from "../dto/common.dto";
import { EntityNotFoundError } from "../global/errors";
import { QueryType } from "../global/types";

const createEntry = async (
  userId: string,
  dto: IEntry
): Promise<OperationResponseDto> => {
  try {
    const entry = await Entry.create({
      ...dto,
      birthDate: moment(dto.birthDate).format("MM/DD/YYYY"),
      createdBy: userId,
    });
    if (!entry) {
      return {
        success: false,
        message: "Server error",
      };
    }
    return {
      success: true,
    };
  } catch (e) {
    throw e;
  }
};

const getEntries = async (
  userId: string,
  query?: QueryType
): Promise<IEntry[]> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new EntityNotFoundError();
    }

    // return all entries by the user
    if (!query) {
      const entries = await Entry.find({
        createdBy: userId,
      }).select("-__v -createdBy");
      return entries;
    }

    // use nested field key for custom fields
    const { customFields } = user.toJSON();
    if (Object.keys(customFields).includes(query.field)) {
      const customFieldKey = `other.${query.field}`;
      const entries = await Entry.find({
        createdBy: userId,
      })
        .find({ [customFieldKey]: query.value })
        .select("-__v -createdBy");
      return entries;
    }

    const entries = await Entry.find({
      createdBy: userId,
      [query.field]: query.value,
    }).select("-__v -createdBy");
    return entries;
  } catch (e) {
    throw e;
  }
};

export default { createEntry, getEntries };
