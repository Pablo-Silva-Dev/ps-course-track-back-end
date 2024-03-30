import { Module } from "@nestjs/common";
import { CreateAppVersionController } from "./controllers/appVersion/create_app_version";
import { GetAppVersionController } from "./controllers/appVersion/get_app_version";
import { UpdateAppVersionController } from "./controllers/appVersion/update_app_version";
import { CreateClassController } from "./controllers/classes/create_class";
import { DeleteClassController } from "./controllers/classes/delete_class";
import { GetClassController } from "./controllers/classes/get_class";
import { ListClassesController } from "./controllers/classes/list_classes";
import { UpdateClassController } from "./controllers/classes/update_class";
import { CreateCommentaryController } from "./controllers/commentaries/create_commentary";
import { DeleteCommentaryController } from "./controllers/commentaries/delete_commentary";
import { GetCommentaryController } from "./controllers/commentaries/get_commentary";
import { ListCommentariesController } from "./controllers/commentaries/list_commentaries";
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
import { UsersRepository } from "./repositories/implementations/usersRepository";
import { PrismaService } from "./services/prismaService";
import { CreateUserUseCase } from "./useCases/createUserUseCase";
import { ListUsersUseCase } from "./useCases/listUsersUseCase";
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
  ],
  providers: [
    PrismaService,
    CreateUserUseCase,
    UsersRepository,
    ListUsersUseCase,
  ],
})
export class AppModule {}
