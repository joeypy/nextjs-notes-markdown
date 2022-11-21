export type TNote = {
  _id: string;
} & TNoteData;

export type TRawNote = {
  _id: string;
} & TRawNoteData;

export type TRawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type TNoteData = {
  title: string;
  markdown: string;
  tags: TTag[];
};

export type TTag = {
  _id: string;
  label: string;
};
