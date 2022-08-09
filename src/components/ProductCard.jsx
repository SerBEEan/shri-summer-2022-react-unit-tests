import {useState} from 'react';

import {ReactComponent as EmptyFavoriteIcon} from '../assets/emptyFavoriteIcon.svg';
import {ReactComponent as FillHeartIcon} from '../assets/fillHeartIcon.svg';
import {ReactComponent as BouquetHeightIcon} from '../assets/bouquetHeightIcon.svg';
import {ReactComponent as BouquetWidthIcon} from '../assets/bouquetWidthIcon.svg';
import {ReactComponent as FlowersCountIcon} from '../assets/flowersCountIcon.svg';

import styles from './ProductCard.module.css';

export const ProductCard = (props) => {
    const {
        bouquetHeight,
        bouquetWidth,
        currentPrice,
        flowersCount,
        imageUrl,
        isFavorite,
        isHit,
        isSale,
        oldPrice,
        title,
    } = props;

    const [isFavoriteActive, setIsFavoriteActive] = useState(isFavorite);

    const changeIsFavoriteActive = () => {
        setIsFavoriteActive((prev) => !prev);
    };

    const hasNotParams = flowersCount === 0 && bouquetHeight === 0 && bouquetWidth === 0;

    return (
        <div className={styles.card} data-testid="product-card">
            <div className={styles.imgContainer}>
                {imageUrl ? (
                    <img className={styles.img} data-testid="img" src={imageUrl} alt={title} />
                ) : (
                    <div className={styles.emptyImg} data-testid="empty-img"></div>
                )}
                <div className={styles.imgHeader}>
                    <div className={styles.imgLabels}>
                        {isHit && <span data-hit="true" data-testid="label-hit">хит</span>}
                        {isSale && <span data-save="true" data-testid="label-sale">скидка</span>}
                    </div>
                    {isFavoriteActive ? (
                        <FillHeartIcon onClick={changeIsFavoriteActive} data-testid="favorite-active" />
                    ) : (
                        <EmptyFavoriteIcon onClick={changeIsFavoriteActive} data-testid="favorite-not-active" />
                    )}
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <div className={styles.price}>
                    {Boolean(currentPrice) && <span data-testid="current-price">{`${divideNumber(currentPrice)} `}&#8381;</span>}
                    {Boolean(oldPrice) && <span data-testid="old-price">{`${divideNumber(oldPrice)} `}&#8381;</span>}
                </div>
                {!hasNotParams && (
                    <div className={styles.params}>
                        {Boolean(flowersCount) && (
                            <div>
                                <FlowersCountIcon />
                                <span>{divideNumber(flowersCount)} шт.</span>
                            </div>
                        )}
                        {Boolean(bouquetHeight) && (
                            <div>
                                <BouquetHeightIcon />
                                <span data-testid="param-height">{bouquetHeight} см</span>
                            </div>
                        )}
                        {Boolean(bouquetWidth) && (
                            <div>
                                <BouquetWidthIcon />
                                <span data-testid="param-width">{bouquetWidth} см</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.buttons}>
                <button disabled={!Boolean(flowersCount)} data-testid="button-basket">В корзину</button>
                <button disabled={!Boolean(flowersCount)} data-testid="button-buy">Купить сразу</button>
            </div>
        </div>
    );
}

function divideNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
