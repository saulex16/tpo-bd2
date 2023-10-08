const HttpStatusCodes = {
    OK: {
        code: 200,
        message: 'OK',
    },
    Created: {
        code: 201,
        message: 'Created',
    },
    Accepted: {
        code: 202,
        message: 'Accepted',
    },
    BadRequest: {
        code: 400,
        message: 'Bad Request',
    },
    Unauthorized: {
        code: 401,
        message: 'Unauthorized',
    },
    Forbidden: {
        code: 403,
        message: 'Forbidden',
    },
    NotFound: {
        code: 404,
        message: 'Not Found',
    },
    InternalServerError: {
        code: 500,
        message: 'Internal Server Error',
    },
}

export { HttpStatusCodes }
