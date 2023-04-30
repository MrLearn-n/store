import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../../../store/api/apiSlice';
import { getCategoriesById } from '../../../../store/categories/categoriesSlice';
import { Products } from '../../Products/Products';
import style from './Category.module.css';


export const Category = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { categories: {currentList } } = useSelector((state) => state);
    const [cat, setCat] = useState(null);
    
    const [values, setValues] = useState({
        title: '',
        price_min: 0,
        price_max: 0,
        categoryId: id,
    });

    const { data, isLoading, isSuccess } = useGetProductsQuery({
        title: values.title,
        price_min: values.price_min,
        price_max: values.price_max,
        categoryId: values.categoryId, 
    });


    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleReset = () => {
        setValues({
            title: '',
            price_min: 0,
            price_max: 0,
            categoryId: id,
        });
    };

    useEffect(() => {
        if(!currentList || !id) {
            return;
        }

        const category = currentList.find(({id}) => id === id);
        setCat(category);
    }, [currentList, id])

    
    useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(getCategoriesById(id));
    }, [dispatch, id])

    return (
        <section className={style.wrapper}>
           <h2 className={style.title}>{cat?.category.name}</h2>

            <form className={style.filters} onSubmit={handleSubmit}>
                <div className={style.filter}>
                    <input 
                        type='text'
                        name='title'
                        onChange={handleChange}
                        placeholder="Product name"
                        value={values.title}
                    />
                </div>

                <div className={style.filter}>
                    <input 
                        type='number'
                        name='price_min'
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_min}
                    />
                </div>

                <div className={style.filter}>
                    <input 
                        type='number'
                        name='price_max'
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_max}
                    />
                </div>

                <button type='submit' hidden={true}></button>
            </form>

            {isLoading ? (
                <div className="preloader">
                    Loading...
                </div>
            ) :  !isSuccess || !data.length ? (
                <div className={style.back}>
                    <span>No results</span>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <Products 
                    title=''
                    products={data}
                    amount={data.length}
                />
            )
        }
        </section>
    )
}
