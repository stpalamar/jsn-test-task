import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import { getValidClassNames } from '~/common/helpers/get-valid-class-names.helper.js';
import { useCallback, useState } from '~/common/hooks/hooks.js';

type Properties = {
    images: string[];
};

const ImageCarousel: React.FC<Properties> = ({ images }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setSlide(slide === images.length - 1 ? 0 : slide + 1);
    }, [setSlide, slide, images.length]);

    const previousSlide = useCallback(() => {
        setSlide(slide === 0 ? images.length - 1 : slide - 1);
    }, [setSlide, slide, images.length]);

    return (
        <div className="relative flex h-full w-full items-center justify-center">
            <ChevronLeftIcon
                onClick={previousSlide}
                className="absolute left-[1rem] size-12 cursor-pointer text-white drop-shadow-lg"
            />
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt="Superhero"
                    className={getValidClassNames(
                        'h-full w-full select-none rounded-md object-cover',
                        slide === index ? 'block' : 'hidden',
                    )}
                />
            ))}
            <ChevronRightIcon
                onClick={nextSlide}
                className="absolute right-[1rem] size-12 cursor-pointer text-white drop-shadow-lg"
            />
            <div className="absolute bottom-[1rem] flex">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setSlide(index)}
                        className={getValidClassNames(
                            'mx-1 inline-block size-4 cursor-pointer rounded-full',
                            slide === index ? 'bg-blue-500' : 'bg-gray-300',
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export { ImageCarousel };
