import {
    NotAcceptableException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

export class TodoNotFoundException extends NotFoundException {
    constructor(message: string = 'The specified Todo item does not exist.') {
        super(message);
    }
}

export class PasswordDoesNotMatch extends UnauthorizedException {
    constructor(message: string = 'Password authentication failed.') {
        super(message);
    }
}

export class TodoAlreadyExistException extends NotAcceptableException {
    constructor(message: string = 'The Todo item already exists.') {
        super(message);
    }
}
