const getFilenameFromUrl = (url: string): string => {
    const urlParts = url.split('/');
    return urlParts.pop() as string;
};

export { getFilenameFromUrl };
