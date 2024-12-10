import { addSection, SectionData } from "../../apis/sections";

export const initSections = (videoId: string) => {
  for (const section of sections) {
    addSection(videoId, section);
  }
};

const sections: SectionData[] = [
  {
    sectionName: "Introduction",
    startTime: 0,
    endTime: 85,
    id: "1",
  },
  {
    sectionName: "Make a stem",
    startTime: 1359,
    id: "6",
    endTime: 1607,
  },
  {
    endTime: 101,
    id: "2",
    sectionName: "Prepare Materials",
    startTime: 85,
  },
  {
    sectionName: "Learn Slip Knot",
    startTime: 101,
    id: "3",
    endTime: 198,
  },
  {
    startTime: 198,
    endTime: 1137,
    sectionName: "Make 1st Leaf",
    id: "4",
  },
  {
    sectionName: "Outro",
    id: "7",
    startTime: 1607,
    endTime: 1705,
  },
  {
    sectionName: "Make 2nd Leaf",
    id: "5",
    startTime: 1137,
    endTime: 1359,
  },
];
