import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import logo from './../../images/logo.svg';
import avatar from './../../images/avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../store/user/userSlice';
import { getProductsByTitle } from '../../store/products/productsSlice';


export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchResult, isSearchLoading } = useSelector(({ products }) => products)
    const { currentUser } = useSelector(({ user }) => user)
    const [searchValue, setSearchValue] = useState("");
    const [valuse, setValues] = useState({
        name: 'Guest',
        avatar: avatar,
    })

    useEffect(() => {
        if(!currentUser) {
            return;
        }
        setValues(currentUser);
    }, [currentUser]);

    useEffect(() => {
        dispatch(getProductsByTitle(searchValue));
    },[dispatch, searchValue])

    const handleClick = () => {
        if(!currentUser) {
            dispatch(toggleForm(true));
        }  else {
            navigate('/profile');
        }
    };


    const handleChange = (event) => {
        setSearchValue(event.target.value);
    }


    return (
        <div className={style.header}>
            <div className={style.logo}>
                <Link to='/' >
                    <img src={logo} alt='stuff' />
                </Link>
            </div>
            <div className={style.info}>
                <div className={style.user}>
                    <div className={style.avatar} style = {{backgroundImage: `url{${valuse.avatar}}`}} onClick={handleClick}/>
                    <div className={style.username}>{valuse.name}</div>
                </div>
                <form className={style.form}>
                    <div className={style.icon}>
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
                    </svg>
                    </div>
                    <div className={style.input}>
                        <input 
                            type="search" 
                            name="search" 
                            placeholder='Search for anything...' 
                            autoComplete='off'
                            onChange={handleChange}
                            value = {searchValue} 
                        />
                    </div>

                    {searchValue && <div className={style.box}>
                        {
                            isSearchLoading ? "Loading..." : !searchResult.length ? "No results" 
                            : searchResult.map(({title, images, id}) => {
                                return (
                                    <Link 
                                        to={`/products/${id}`} 
                                        className={style.item}
                                        key={id}
                                        onClick={() => setSearchValue("")}
                                    >
                                        <div 
                                            className={style.image}
                                            style={{
                                                backgroundImage: `url(${images[0]})`
                                            }}
                                        />
                                        <div className={style.title}>
                                            {title}
                                        </div>
                                    </Link>
                                )
                            }) 
                        }
                    </div>}
                </form>
                <div className={style.account}>
                    <Link to='' className={style.favourites}>
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
                        </svg>
                    </Link>0

                    <Link to='/cart' className={style.cart}>
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                        </svg>
                        <span className={style.count}>2</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
