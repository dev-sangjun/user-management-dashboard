import { NextFunction, Request, Response } from "express";
import entryService from "../services/entry.service";
import { AuthorizedRequest } from "../middlewares/auth.middleware";
import { IEntry } from "../../models/entry.model";
import { QueryType } from "../global/types";

const createEntry = async (req: Request, res: Response, next: NextFunction) => {
  const userEntryRequestDto: IEntry = req.body;
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const operationResponseDto = await entryService.createEntry(
      authorizedUserId,
      userEntryRequestDto
    );
    return res.json(operationResponseDto);
  } catch (e) {
    return next(e);
  }
};

const getEntries = async (req: Request, res: Response, next: NextFunction) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const entries = await entryService.getEntries(
      authorizedUserId,
      req.query as QueryType
    );
    return res.json(entries);
  } catch (e) {
    return next(e);
  }
};

export default { createEntry, getEntries };
