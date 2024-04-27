interface ICreateClassDTO {
  name: string;
  description: string;
  duration: number;
  url: string;
  moduleId: string;
  tutorId: string;
  courseId: string;
}

interface IUpdateClassDTO {
  name?: string;
  description?: string;
  duration?: number;
  url?: string;
}

export { ICreateClassDTO, IUpdateClassDTO };
