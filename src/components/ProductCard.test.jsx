import {render, screen, fireEvent} from '@testing-library/react';
import {ProductCard} from './ProductCard';

const getCardData = (data) => ({
    bouquetHeight: 77,
    bouquetWidth: 74,
    currentPrice: '49381',
    flowersCount: 254,
    imageUrl: 'https://loremflickr.com/400/400/nature?66833',
    id: '3defb81d-6290-42dd-b37f-ce6f5e47ea50',
    isFavorite: true,
    isHit: true,
    isSale: true,
    oldPrice: '33254',
    title: 'Грубый Стальной Ботинок',
    ...data,
});

const labelHit = 'label-hit';
const labelSale = 'label-sale';
const favoriteNotActive = 'favorite-not-active';
const favoriteActive = 'favorite-active';
const img = 'img';
const emptyImg= 'empty-img';
const currentPrice = 'current-price';
const oldPrice = 'old-price';
const paramWidth = 'param-width';
const paramHeight = 'param-height';
const buttonBasket = 'button-basket';
const buttonBuy = 'button-buy';

describe('Компонент «Карточка товара»', () => {
    it('рисуется две плашки - хит, скидка', () => {
        render(<ProductCard {...getCardData()} />);
        
        expect(screen.getByTestId(labelHit)).toBeInTheDocument();
        expect(screen.getByTestId(labelSale)).toBeInTheDocument();
    });

    it('рисуется одна плашка - хит', () => {
        render(<ProductCard {...getCardData({ isSale: undefined })} />);
        
        expect(screen.getByTestId(labelHit)).toBeInTheDocument();
        expect(screen.queryByTestId(labelSale)).toBeNull();
    });

    it('рисуется одна плашка - скидка', () => {
        render(<ProductCard {...getCardData({ isHit: undefined })} />);
        
        expect(screen.queryByTestId(labelHit)).toBeNull();
        expect(screen.getByTestId(labelSale)).toBeInTheDocument();
    });

    it('плашки отсутствуют', () => {
        render(<ProductCard {...getCardData({ isHit: undefined, isSale: undefined })} />);
        
        expect(screen.queryByTestId(labelHit)).toBeNull();
        expect(screen.queryByTestId(labelSale)).toBeNull();
    });

    it('toggle "избранное" выключен', () => {
        render(<ProductCard {...getCardData({ isFavorite: false })} />);
        
        expect(screen.getByTestId(favoriteNotActive)).toBeInTheDocument();
        expect(screen.queryByTestId(favoriteActive)).toBeNull();
    });

    it('toggle "избранное" включен', () => {
        render(<ProductCard {...getCardData()} />);
        
        expect(screen.getByTestId(favoriteActive)).toBeInTheDocument();
        expect(screen.queryByTestId(favoriteNotActive)).toBeNull();
    });

    it('переключается toggle "избранное"', () => {
        render(<ProductCard {...getCardData()} />);

        expect(screen.getByTestId(favoriteActive)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(favoriteActive));
        expect(screen.getByTestId(favoriteNotActive)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId(favoriteNotActive));
        expect(screen.getByTestId(favoriteActive)).toBeInTheDocument();
    });

    it('если есть картинка, то она рисуется', () => {
        render(<ProductCard {...getCardData()} />);
        
        expect(screen.getByTestId(img)).toBeInTheDocument();
    });

    it('если картинки нет, то рисуется empty-блок', () => {
        render(<ProductCard {...getCardData({ imageUrl: undefined })} />);
        
        expect(screen.queryByTestId(img)).toBeNull();
        expect(screen.getByTestId(emptyImg)).toBeInTheDocument();
    });

    it('если есть старая цена, то рисуется текущая и старая', () => {
        render(<ProductCard {...getCardData()} />);
        
        expect(screen.getByTestId(currentPrice)).toBeInTheDocument();
        expect(screen.getByTestId(oldPrice)).toBeInTheDocument();
    });

    it('рисуется текущая цена, без старой', () => {
        render(<ProductCard {...getCardData({ oldPrice: undefined })} />);
        
        expect(screen.getByTestId(currentPrice)).toBeInTheDocument();
        expect(screen.queryByTestId(oldPrice)).toBeNull();
    });

    it('число корректно разделяется по сотням', () => {
        render(<ProductCard {...getCardData({ flowersCount: '1212213' })} />);
        
        expect(screen.getByText(/1 212 213/i)).toBeInTheDocument();
    });

    it('если параметр равен 0, то он не рисуется', () => {
        render(<ProductCard {...getCardData({ bouquetWidth: 0 })} />);
        
        expect(screen.queryByTestId(paramWidth)).toBeNull();
    });

    it('если параметр отсутствует, то он не рисуется', () => {
        render(<ProductCard {...getCardData({ bouquetHeight: undefined })} />);
        
        expect(screen.queryByTestId(paramHeight)).toBeNull();
    });

    it('если количество равно 0, то кнопки заблокированы', () => {
        render(<ProductCard {...getCardData({ flowersCount: 0 })} />);
        
        expect(screen.getByTestId(buttonBasket)).toHaveAttribute('disabled');
        expect(screen.getByTestId(buttonBuy)).toHaveAttribute('disabled');
    });
});
