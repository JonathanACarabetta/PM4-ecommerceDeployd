import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/rol.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor( private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const requiredRoles=
        this.reflector.getAllAndOverride<Role[]>("roles",[
            context.getHandler(),
            context.getClass(),
        ])
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = ()=>requiredRoles.some((role)=> user?.roles?.includes(role));

        const valid= user && user.roles && hasRole();

        if(!valid){
            throw new ForbiddenException("No tiene permisos para acceder a esta ruta")
        }
        return valid;

    }
    
}