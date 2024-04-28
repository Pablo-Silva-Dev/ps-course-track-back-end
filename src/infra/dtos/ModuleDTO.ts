interface ICreateModuleDTO {
    name: string;
    description: string;
    duration: number;
    cover_url: string;
    courseId: string;
}

interface IUpdateModuleDTO {
    name: string;
    description: string;
    duration: number;
    cover_url: string;
}

export {ICreateModuleDTO, IUpdateModuleDTO}