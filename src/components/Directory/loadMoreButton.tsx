import { useState } from 'react';
import PokeballLoader from '../PokeballLoader/pokeballLoader';

interface LoadMoreButtonProps {
    onClick: () => void;
    loading: boolean;
}
const LoadMoreButton = ({ onClick, loading = false }: LoadMoreButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const delay = (delay: number) => {
        return new Promise((res) => setTimeout(res, delay));
    };
    const clickHandler = async () => {
        setIsLoading(true);
        await delay(500);
        onClick();
        await delay(500);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <PokeballLoader />
            ) : (
                <button
                    className='directory-load-more-btn'
                    onClick={() => clickHandler()}
                    disabled={isLoading}
                >
                    Click To Load More Pokemon
                </button>
            )}
        </>
    );
};

export default LoadMoreButton;
