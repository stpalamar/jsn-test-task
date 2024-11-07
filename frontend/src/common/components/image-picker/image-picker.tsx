import { TrashIcon } from '@heroicons/react/16/solid';

import { FileUploader } from '~/common/components/components.js';
import { getValidClassNames } from '~/common/helpers/helpers.js';
import { useCallback, useState } from '~/common/hooks/hooks.js';

import { Button, ButtonSize, ButtonVariant } from '../components.js';

type Properties = {
    className?: string;
};

const ImagePicker: React.FC<Properties> = ({ className }) => {
    const [selectedFiles, setSelectedFiles] = useState<
        { file: File; url: string }[]
    >([]);

    const handleUpload = useCallback((files: File[]) => {
        setSelectedFiles((previousState) => {
            const fileMap = new Map(
                previousState.map((file) => [file.file.name, file]),
            );
            const updatedFiles = files.map((file) => {
                if (fileMap.has(file.name)) {
                    const previousFile = fileMap.get(file.name);
                    URL.revokeObjectURL(previousFile ? previousFile.url : '');
                    return {
                        file,
                        url: URL.createObjectURL(file),
                    };
                }

                return {
                    file,
                    url: URL.createObjectURL(file),
                };
            });

            const previousFiles = previousState.filter(
                (file) =>
                    !files.some((newFile) => newFile.name === file.file.name),
            );

            return [...previousFiles, ...updatedFiles];
        });
    }, []);

    const removeImage = useCallback((file: { file: File; url: string }) => {
        setSelectedFiles((previousState) =>
            previousState.filter((item) => {
                if (item.file.name === file.file.name) {
                    URL.revokeObjectURL(file.url);
                    return false;
                } else {
                    return true;
                }
            }),
        );
    }, []);

    return (
        <div className={getValidClassNames(className, 'flex flex-col gap-4')}>
            <FileUploader
                onUpload={handleUpload}
                accept="image/png image/jpeg"
                buttonLabel="Upload images"
            />
            <div className="min-h-[12rem]">
                <p className="text-lg">To Upload</p>
                {selectedFiles.length > 0 && selectedFiles ? (
                    <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {selectedFiles.map((file, index) => {
                            return (
                                <div
                                    key={index}
                                    className="relative h-[8rem] w-[12rem] cursor-pointer rounded-md bg-gray-200 text-transparent shadow-md hover:text-white"
                                >
                                    <img
                                        src={file.url}
                                        alt="Uploaded preview"
                                        className="img-preview sticky h-full w-full rounded-md object-cover"
                                    />
                                    <div className="absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs">
                                        <p className="font-semibold">
                                            {file.file.name}
                                        </p>
                                    </div>
                                    <div className="absolute top-0 z-20 flex h-full w-full flex-col items-end justify-end break-words rounded-md px-3 py-2 text-xs">
                                        <Button
                                            size={ButtonSize.ICON}
                                            variant={ButtonVariant.DANGER}
                                            label=""
                                            onClick={() => removeImage(file)}
                                            type="button"
                                            leftIcon={
                                                <TrashIcon className="size-4" />
                                            }
                                            className="max-w-[2rem]"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-8 flex h-full w-full justify-center">
                        <p className="font-semibold">No images selected</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { ImagePicker };
