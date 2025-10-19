// src/components/ProgressPhotos/mockData.ts

export interface ProgressEntry {
  month: string;
  frontPhoto: string;
  sidePhoto: string;
}

export const progressPhotos: ProgressEntry[] = [
  {
    month: "January 2024",
    frontPhoto: "https://placehold.co/150x200?text=Front+Jan",
    sidePhoto: "https://placehold.co/150x200?text=Side+Jan",
  },
  {
    month: "March 2024",
    frontPhoto: "https://placehold.co/150x200?text=Front+Mar",
    sidePhoto: "https://placehold.co/150x200?text=Side+Mar",
  },
  {
    month: "May 2024",
    frontPhoto: "https://placehold.co/150x200?text=Front+May",
    sidePhoto: "https://placehold.co/150x200?text=Side+May",
  },
];

export const tipsText = `
Consistency is key! Try to take your photos at the same time of day, 
in similar lighting, and wearing similar clothing for accurate comparison.
`;
