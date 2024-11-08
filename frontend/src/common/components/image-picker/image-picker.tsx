import { FileUploader } from '~/common/components/components.js';
import { getValidClassNames } from '~/common/helpers/helpers.js';
import { useCallback, useState } from '~/common/hooks/hooks.js';

import { ImagePreview } from './components/components.js';

type Properties = {
    className?: string;
    onUpload: (file: File[]) => void;
    imageUrls?: string[];
    onRemoveImageUrl?: (url: string) => void;
};

const ImagePicker: React.FC<Properties> = ({
    className,
    onUpload,
    imageUrls,
    onRemoveImageUrl,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<
        { file: File; url: string }[]
    >([]);

    const handleUpload = useCallback(
        (files: File[]) => {
            setSelectedFiles((previousState) => {
                const fileMap = new Map(
                    previousState.map((file) => [file.file.name, file]),
                );
                const updatedFiles = files.map((file) => {
                    if (fileMap.has(file.name)) {
                        const previousFile = fileMap.get(file.name);
                        URL.revokeObjectURL(
                            previousFile ? previousFile.url : '',
                        );
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
                        !files.some(
                            (newFile) => newFile.name === file.file.name,
                        ),
                );

                const newFiles = [...previousFiles, ...updatedFiles];

                onUpload(newFiles.map((file) => file.file));
                return newFiles;
            });
        },
        [onUpload],
    );

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

    const removeImageUrl = useCallback(
        (url: string) => {
            if (onRemoveImageUrl) {
                onRemoveImageUrl(url);
            }
        },
        [onRemoveImageUrl],
    );

    return (
        <div className={getValidClassNames(className, 'flex flex-col gap-4')}>
            <FileUploader
                onUpload={handleUpload}
                accept="image/png image/jpeg"
                buttonLabel="Upload images"
            />
            <div className="min-h-[12rem]">
                <p className="text-lg">To Upload</p>
                {selectedFiles.length > 0 ||
                (imageUrls && imageUrls.length > 0) ? (
                    <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {selectedFiles.length > 0 &&
                            selectedFiles &&
                            selectedFiles.map((file, index) => {
                                return (
                                    <ImagePreview
                                        key={index}
                                        src={file.url}
                                        onDrop={() => removeImage(file)}
                                    />
                                );
                            })}
                        {imageUrls &&
                            imageUrls.length > 0 &&
                            imageUrls.map((url, index) => {
                                return (
                                    <ImagePreview
                                        key={index}
                                        src={url}
                                        onDrop={() => removeImageUrl(url)}
                                    />
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
