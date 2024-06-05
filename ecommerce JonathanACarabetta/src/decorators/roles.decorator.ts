import { Role } from "src/rol.enum";
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles:Role[])=>SetMetadata("roles",roles)