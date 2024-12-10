import { initComments } from "./initComments";
import { initGallery } from "./initGallery";
import { initSections } from "./initSections";
import { initUsers } from "./initUsers";
// import { initSections } from "./initSections";
// import { initUsers } from "./initUsers";

export const initData = async () => {
  const videoId = "jbMKDhgx4eM";
  initSections(videoId);
  initComments(videoId);
  initUsers();
  initGallery(videoId);
};
