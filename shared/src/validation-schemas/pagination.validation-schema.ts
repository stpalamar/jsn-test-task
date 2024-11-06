import { z } from 'zod';

type PaginationValidationDto = {
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
};

const PaginationValidationMessage = {
    PAGE_NUMBER: 'Page number must be a number',
    PAGE_MIN: 'Page number must be greater than 0',
    LIMIT_NUMBER: 'Limit number must be a number',
    LIMIT_MIN: 'Limit number must be greater than 0',
};

const paginationValidationSchema = z
    .object<PaginationValidationDto>({
        page: z.string().optional(),
        limit: z.string().optional(),
    })
    .refine((data) => (data.page ? !Number.isNaN(Number(data.page)) : true), {
        message: PaginationValidationMessage.PAGE_NUMBER,
    })
    .refine((data) => (data.page ? Number(data.page) >= 1 : true), {
        message: PaginationValidationMessage.PAGE_MIN,
    })
    .refine((data) => (data.limit ? !Number.isNaN(Number(data.limit)) : true), {
        message: PaginationValidationMessage.LIMIT_NUMBER,
    })
    .refine((data) => (data.limit ? Number(data.limit) >= 1 : true), {
        message: PaginationValidationMessage.LIMIT_MIN,
    });

export { paginationValidationSchema };
