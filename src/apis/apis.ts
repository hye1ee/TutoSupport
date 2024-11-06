import { ThreadDto } from "../types/types";

export const isValidWatchId = async (_watchId: string): Promise<boolean> => {
  // check whether the watch id is valid or not
  return true;
};

export const clapComment = async (
  commentId: string,
  clapped: boolean
): Promise<boolean> => {
  // clap or unclap a comment with commentId
  return true;
};

export const fetchVideoComments = async (
  _watchId: string
): Promise<ThreadDto[]> => {
  // fetch all comments for watch id
  console.log("TODO: fetchVideoComments");
  return [];
};

export const writeComment = async (
  content: string,
  media: string | null,
  parentCommentId?: string
): Promise<boolean> => {
  console.log("TODO: writeComment");
  return true;
};
