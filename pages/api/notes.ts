// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';
import { NoteModel } from '../../models';

type Data = {
  success: boolean;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      if (id) {
        return getNotesById(req, res);
      } else {
        return getNotes(req, res);
      }
    default:
      return res.status(400).json({
        success: false,
        message: 'Bad Request',
      });
  }
}

const getNotesById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  try {
    await db.connect();

    const data = await NoteModel.findOne({ _id: id }).lean();
    res.status(200).json({ success: true, data });

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
  }
};

const getNotes = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const data = await NoteModel.find().lean();
    res.status(200).json({ success: true, data });

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
  }
};
