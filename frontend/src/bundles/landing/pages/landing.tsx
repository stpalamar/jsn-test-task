import landingImage from '~/assets/img/landing.png';

const Landing: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-32 pt-8 lg:flex-row lg:px-16">
            <div className="lg: w-[24rem]">
                <h1 className="mb-4 text-4xl">
                    Welcome to
                    <br />{' '}
                    <span className="font-bold">Superheroes Database!</span>
                </h1>
                <p className="text-lg">
                    You can view the list of superheroes, add new ones, edit and
                    delete them.
                </p>
            </div>
            <div>
                <img
                    src={landingImage}
                    className="size-full"
                    alt="Supeheroes"
                />
            </div>
        </div>
    );
};

export { Landing };
