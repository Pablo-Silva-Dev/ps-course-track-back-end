import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TEnv } from "src/infra/env";
import { z } from "zod";

const UserAdminPayloadSchema = z.object({
  sub: z.string().uuid(),
  isAdmin: z.boolean(),
});

export type UserAdminPayloadSchema = z.infer<typeof UserAdminPayloadSchema>;

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(config: ConfigService<TEnv, true>) {
    const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    });
  }

  async validate(payload: UserAdminPayloadSchema) {
    if (!payload.isAdmin) {
      throw new UnauthorizedException(
        "Only admin have access to this resource"
      );
    }
    return UserAdminPayloadSchema.parse(payload);
  }
}
