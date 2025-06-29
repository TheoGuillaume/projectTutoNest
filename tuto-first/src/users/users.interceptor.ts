import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('In UsersInterceptor');
    return next.handle().pipe(map((data) => data.map(({ userPassword, ...user }) => user)));
  }
}
