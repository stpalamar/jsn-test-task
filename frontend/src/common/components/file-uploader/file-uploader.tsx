import {
    Button,
    ButtonSize,
    ButtonVariant,
} from '~/common/components/components.js';
import { useCallback, useRef } from '~/common/hooks/hooks.js';

type Properties = {
    onUpload: (files: File[]) => void;
    buttonLabel?: string;
    accept?: string;
};

const FileUploader: React.FC<Properties> = ({
    onUpload,
    buttonLabel = 'Upload files',
    accept,
}) => {
    const fileInputReference = useRef<HTMLInputElement>(null);
    const handleUploadClick = useCallback((): void => {
        if (fileInputReference.current) {
            fileInputReference.current.click();
        }
    }, [fileInputReference]);

    const selectFile = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;

            if (files) {
                const filesArray = [...files];
                if (filesArray.length > 0) {
                    onUpload(filesArray);
                }
            }
        },
        [onUpload],
    );

    return (
        <div className="flex flex-col items-center gap-2 border-4 border-dotted p-16">
            <Button
                label={buttonLabel}
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.MEDIUM}
                type="button"
                className="max-w-[12rem]"
                onClick={handleUploadClick}
            />
            <input
                type="file"
                className="hidden"
                accept={accept}
                multiple
                ref={fileInputReference}
                onChange={selectFile}
            />
        </div>
    );
};

export { FileUploader };
