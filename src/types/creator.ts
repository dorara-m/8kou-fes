export type CreatorDepartment = "制作室" | "美術部" | "放送部" | "写真部" | "軽音部";

export type CreatorItem = {
  department: CreatorDepartment;
  role: string;
  name: string;
  image?: string;
  xUrl?: string;
};
