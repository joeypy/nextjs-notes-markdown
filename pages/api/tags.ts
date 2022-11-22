// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';
import { TagModel } from '../../models';

type Data = {
  success: boolean;
  message?: string;
  data?: any;
  tag?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      if (id) {
        return getTagById(req, res);
      } else {
        return getTags(req, res);
      }
    case 'POST':
      return createTag(req, res);
    case 'PATCH':
      return updateTag(req, res);
    case 'DELETE':
      return deleteTag(req, res);
    default:
      return res.status(400).json({
        success: false,
        message: 'Bad Request',
      });
  }
}

const getTagById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const data = await TagModel.findOne({ _id: id }).lean();
    res.status(200).json({ success: true, data });

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
    res.status(500).json({ success: false, error: err });
  }
};

const getTags = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const data = await TagModel.find().lean();
    res.status(200).json({ success: true, data });

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
    res.status(500).json({ success: false, error: err });
  }
};

const createTag = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();

    const data = await TagModel.create({ label: req.body.label });
    res.status(200).json({ success: true, tag: data });

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
    res.status(500).json({ success: false, error: err });
  }
};

const updateTag = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const data = await TagModel.updateOne({ _id: id }, { ...req.body });
    res.status(200).json({ success: true, message: 'Tag Updated.', data });

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
    res.status(400).json({ success: false, error: err });
  }
};

const deleteTag = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();

    const data = await TagModel.findOneAndDelete({ _id: id });
    res.status(200).json({ success: true, message: 'Tag deleted.', data });

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
    res.status(400).json({ success: false, error: err });
  }
};
