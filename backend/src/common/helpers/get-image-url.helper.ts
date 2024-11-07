import { config } from '~/common/config/config.js';

const getImageUrl = (filename: string): string => {
    return `${config.ENV.APP.BASE_URL}/images/${filename}`;
};

export { getImageUrl };
