import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserPayloadSchema } from "../auth/jw_strategy";

export const GetCurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as UserPayloadSchema;
  }
);
