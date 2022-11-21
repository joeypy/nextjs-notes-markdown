export type TNote = {
  id: string;
} & TNoteData;

export type TRawNote = {
  id: string;
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
  id: string;
  label: string;
};
