import { Module } from "@nestjs/common";
import { CreateAppVersionController } from "./controllers/appVersion/create_app_version";
import { GetAppVersionController } from "./controllers/appVersion/get_app_version";
import { UpdateAppVersionController } from "./controllers/appVersion/update_app_version";
import { CreateClassController } from "./controllers/classes/create_class";
import { DeleteClassController } from "./controllers/classes/delete_class";
import { GetClassController } from "./controllers/classes/get_class";
import { ListClassesByModuleController } from "./controllers/classes/list_class_by_module";
import { ListClassesController } from "./controllers/classes/list_classes";
import { UpdateClassController } from "./controllers/classes/update_class";
import { CreateCommentaryController } from "./controllers/commentaries/create_commentary";
import { DeleteCommentaryController } from "./controllers/commentaries/delete_commentary";
import { GetCommentaryController } from "./controllers/commentaries/get_commentary";
import { ListCommentariesController } from "./controllers/commentaries/list_commentaries";
import { ListCommentariesByClassController } from "./controllers/commentaries/list_commentaries_by_class";
import { ListCommentariesByUserController } from "./controllers/commentaries/list_commentaries_by_user";
import { UpdateCommentaryController } from "./controllers/commentaries/update_commentary";
import { CreateCourseController } from "./controllers/courses/create_course";
import { DeleteCourseController } from "./controllers/courses/delete_course";
import { GetCourseController } from "./controllers/courses/get_course";
import { ListCoursesController } from "./controllers/courses/list_courses";
import { UpdateCourseController } from "./controllers/courses/update_course";
import { CreateModuleController } from "./controllers/modules/create_module";
import { DeleteModuleController } from "./controllers/modules/delete_module";
import { GetModuleController } from "./controllers/modules/get_module";
import { ListModulesController } from "./controllers/modules/list_modules";
import { UpdateModuleController } from "./controllers/modules/update_module";
import { CreateTutorController } from "./controllers/tutors/create_tutor";
import { DeleteTutorController } from "./controllers/tutors/delete_tutor";
import { GetTutorController } from "./controllers/tutors/get_tutor";
import { ListTutorsController } from "./controllers/tutors/list_tutors";
import { UpdateTutorController } from "./controllers/tutors/update_tutor";
import { CreateUserCourseMetricsController } from "./controllers/userCourseMetrics/create_user_course_metrics";
import { GetUserCourseMetricsController } from "./controllers/userCourseMetrics/get_user_course_metrics";
import { UpdateUserCourseMetricsController } from "./controllers/userCourseMetrics/update_user_course_metrics";
import { CreateUserController } from "./controllers/users/create_user";
import { DeleteUserController } from "./controllers/users/delete_user";
import { GetUserController } from "./controllers/users/get_user";
import { ListUsersController } from "./controllers/users/list_users";
import { UpdateUserController } from "./controllers/users/update_user";
import { FetchClassController } from "./controllers/watchedClasses/fetch_watched_class";
import { UnwatchClassesController } from "./controllers/watchedClasses/unwatch_class";
import { WatchClassesController } from "./controllers/watchedClasses/watch_class";
import { ClassesRepository } from "./repositories/implementations/classesRepository";
import { CommentariesRepository } from "./repositories/implementations/commentariesRepository";
import { CoursesRepository } from "./repositories/implementations/coursesRepository";
import { ModulesRepository } from "./repositories/implementations/modulesRepository";
import { TutorsRepository } from "./repositories/implementations/tutorsRepository";
import { UsersRepository } from "./repositories/implementations/usersRepository";
import { WatchedClassesRepository } from "./repositories/implementations/watchedClassesRepository";
import { PrismaService } from "./services/prismaService";
import { CreateClassUseCase } from "./useCases/classes/createClassUseCase";
import { DeleteClassUseCase } from "./useCases/classes/deleteClassUseCase";
import { GetClassUseCase } from "./useCases/classes/getClassUseCase";
import { ListClassesByModuleUseCase } from "./useCases/classes/listClassesByModuleUseCase";
import { ListClassesUseCase } from "./useCases/classes/listClassesUseCase";
import { UpdateClassUseCase } from "./useCases/classes/updateClassUseCase";
import { CreateCommentaryUseCase } from "./useCases/commentaries/createCommentaryUseCase";
import { DeleteCommentaryUseCase } from "./useCases/commentaries/deleteCommentaryUseCase";
import { GetCommentaryUseCase } from "./useCases/commentaries/getCommentary";
import { ListCommentariesByClassUseCase } from "./useCases/commentaries/listCommentariesByClassUseCase";
import { ListCommentariesByUserUseCase } from "./useCases/commentaries/listCommentariesByUserUseCase";
import { ListCommentariesUseCase } from "./useCases/commentaries/listCommentariesUseCase";
import { UpdateCommentaryUseCase } from "./useCases/commentaries/updateCommentaryUseCase";
import { CreateCourseUseCase } from "./useCases/courses/createCourseUseCase";
import { DeleteCourseUseCase } from "./useCases/courses/deleteCourseUseCase";
import { GetCourseUseCase } from "./useCases/courses/getCourseUseCase";
import { ListCoursesUseCase } from "./useCases/courses/listCoursesUseCase";
import { UpdateCourseUseCase } from "./useCases/courses/updateCourseUseCase";
import { CreateModuleUseCase } from "./useCases/modules/createModuleUseCase";
import { DeleteModuleUseCase } from "./useCases/modules/deleteModuleUseCase";
import { GetModuleUseCase } from "./useCases/modules/getModuleUseCase";
import { ListModulesUseCase } from "./useCases/modules/listModulesUseCase";
import { UpdateModuleUseCase } from "./useCases/modules/updateModuleUseCase";
import { CreateTutorUseCase } from "./useCases/tutors/createTutorUseCase";
import { DeleteTutorUseCase } from "./useCases/tutors/deleteTutorUseCase";
import { GetTutorUseCase } from "./useCases/tutors/getTutorUseCase";
import { ListTutorsUseCase } from "./useCases/tutors/listTutorsUseCase";
import { UpdateTutorUseCase } from "./useCases/tutors/updateTutorUseCase";
import { CreateUserUseCase } from "./useCases/users/createUserUseCase";
import { DeleteUserUseCase } from "./useCases/users/deleteUserUseCase";
import { GetUserUseCase } from "./useCases/users/getUserUseCase";
import { ListUsersUseCase } from "./useCases/users/listUsersUseCase";
import { UpdateUserUseCase } from "./useCases/users/updateUserUseCase";
import { FetchWatchedClassUseCase } from "./useCases/watchedClasses/fetchClassUseCase";
import { UnwatchClassUseCase } from "./useCases/watchedClasses/unwatchClass";
import { WatchClassUseCase } from "./useCases/watchedClasses/watchClassUseCase";
@Module({
  controllers: [
    CreateCourseController,
    ListCoursesController,
    DeleteCourseController,
    UpdateCourseController,
    CreateCourseController,
    CreateModuleController,
    ListModulesController,
    DeleteModuleController,
    GetModuleController,
    UpdateModuleController,
    CreateTutorController,
    ListTutorsController,
    DeleteTutorController,
    GetTutorController,
    UpdateTutorController,
    CreateClassController,
    ListClassesController,
    ListClassesByModuleController,
    DeleteClassController,
    GetClassController,
    UpdateClassController,
    GetCourseController,
    CreateUserController,
    ListUsersController,
    GetUserController,
    DeleteUserController,
    UpdateUserController,
    CreateCommentaryController,
    ListCommentariesController,
    GetCommentaryController,
    DeleteCommentaryController,
    UpdateCommentaryController,
    CreateAppVersionController,
    GetAppVersionController,
    UpdateAppVersionController,
    WatchClassesController,
    UnwatchClassesController,
    FetchClassController,
    CreateUserCourseMetricsController,
    UpdateUserCourseMetricsController,
    GetUserCourseMetricsController,
    ListCommentariesByClassController,
    ListCommentariesByUserController,
  ],
  providers: [
    PrismaService,
    CreateUserUseCase,
    UsersRepository,
    ListUsersUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    CreateTutorUseCase,
    TutorsRepository,
    ListTutorsUseCase,
    GetTutorUseCase,
    DeleteTutorUseCase,
    UpdateTutorUseCase,
    CreateCommentaryUseCase,
    CommentariesRepository,
    ListCommentariesUseCase,
    ListCommentariesByClassUseCase,
    ListCommentariesByUserUseCase,
    GetCommentaryUseCase,
    UpdateCommentaryUseCase,
    DeleteCommentaryUseCase,
    CreateCourseUseCase,
    ListCoursesUseCase,
    GetCourseUseCase,
    CoursesRepository,
    UpdateCourseUseCase,
    DeleteCourseUseCase,
    ModulesRepository,
    CreateModuleUseCase,
    ListModulesUseCase,
    GetModuleUseCase,
    UpdateModuleUseCase,
    DeleteModuleUseCase,
    ClassesRepository,
    CreateClassUseCase,
    ListClassesUseCase,
    ListClassesByModuleUseCase,
    GetClassUseCase,
    UpdateClassUseCase,
    DeleteClassUseCase,
    WatchedClassesRepository,
    WatchClassUseCase,
    FetchWatchedClassUseCase,
    UnwatchClassUseCase,
  ],
})
export class AppModule {}
