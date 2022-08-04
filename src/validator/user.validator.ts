import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationDecoratorOptions, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {

  constructor(private userService: UserService) { }

  public async validate(value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService
        .getUserByEmail(value)
        .then((res) => resolve(res ? false : true))
        .catch(() => reject());
    });
  }

  defaultMessage() { return `L'email existe déjà` }
}

export function UserExists(validationOptions?: ValidationOptions) {

  return (object: ValidationDecoratorOptions, propertyName: string) => {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
}
