interface ICreateCourseDTO {
  name: string;
  description: string;
  duration: number;
  cover_url: string;
}

interface IUpdateCourseDTO {
  name?: string;
  description?: string;
  duration?: number;
  cover_url?: string;
}

export { ICreateCourseDTO, IUpdateCourseDTO };
