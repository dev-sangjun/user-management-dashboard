import Entry, { IEntry } from "../../models/entry.model";
import { OperationResponseDto } from "../dto/common.dto";

const createEntry = async (
  userId: string,
  dto: IEntry
): Promise<OperationResponseDto> => {
  try {
    const entry = await Entry.create({
      ...dto,
      birthDate: new Date(dto.birthDate),
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

export default { createEntry };
