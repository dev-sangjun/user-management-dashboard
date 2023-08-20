import DBClient from "../../prisma/DBClient";
import { OperationResponseDto } from "../dto/common.dto";
import { UserEntryRequestDto } from "../dto/entry.dto";

const createEntry = async (
  userId: string,
  userEntryRequestDto: UserEntryRequestDto
): Promise<OperationResponseDto> => {
  console.log(userId)
  try {
    await DBClient.userEntry.create({
      data: {
        ...userEntryRequestDto,
        birthDate: new Date(userEntryRequestDto.birthDate),
        createdBy: userId
      }
    })
    return {
      success: true
    }
  } catch (e) {
    throw e;
  }
}


export default { createEntry };
