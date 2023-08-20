import { NextFunction, Request, Response } from "express";
import { UserEntryRequestDto } from "../dto/entry.dto";
import entryService from "../services/entry.service";
import { AuthorizedRequest } from "../middlewares/auth.middleware";

const createEntry = async (req: Request, res: Response, next: NextFunction) => {
  const userEntryRequestDto: UserEntryRequestDto = req.body;
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const operationResponseDto = await entryService.createEntry(authorizedUserId, userEntryRequestDto);
    return res.json(operationResponseDto);
  } catch (e) {
    return next(e);
  }
};

export default { createEntry };
