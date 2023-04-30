import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { filterProductById, getRelatedProducts } from '../../../store/products/productsSlice';
import { Product } from './Product/Product';
import { Products } from './Products';

export const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products: { currentProductId, related, isLoading, } } = useSelector((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoading) {
            navigate('/');
        }

        dispatch(filterProductById(id));
    }, [isLoading, id])

    useEffect(() => {
        currentProductId.map((item) => {
            dispatch(getRelatedProducts(item.category.id));
        })
    }, [currentProductId])


    return (
        <>
            {currentProductId.map((item, i) => (
                <Product {...item} key={i} />
            ))}
            <Products products={related} amount={5} title = "Related products"/>
        </>
    )
}
