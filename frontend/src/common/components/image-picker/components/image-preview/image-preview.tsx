import { TrashIcon } from '@heroicons/react/16/solid';

import {
    Button,
    ButtonSize,
    ButtonVariant,
} from '~/common/components/components.js';

type Properties = {
    src: string;
    onDrop: () => void;
};

const ImagePreview: React.FC<Properties> = ({ src, onDrop }) => {
    return (
        <div className="relative h-[8rem] w-[12rem] cursor-pointer rounded-md bg-gray-200 text-transparent shadow-md hover:text-white">
            <img
                src={src}
                alt="Uploaded preview"
                className="img-preview sticky h-full w-full rounded-md object-cover"
            />
            <div className="absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs">
                <p className="font-semibold">Uploaded</p>
            </div>
            <div className="absolute top-0 z-20 flex h-full w-full flex-col items-end justify-end break-words rounded-md px-3 py-2 text-xs">
                <Button
                    size={ButtonSize.ICON}
                    variant={ButtonVariant.DANGER}
                    label=""
                    onClick={onDrop}
                    type="button"
                    leftIcon={<TrashIcon className="size-4" />}
                    className="max-w-[2rem]"
                />
            </div>
        </div>
    );
};

export { ImagePreview };
