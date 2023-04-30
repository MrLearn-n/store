import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import style from './Sidebar.module.css';

export const Sidebar = () => {
    const { list } = useSelector((state) => state.categories);

    const arraySlice = list.slice(0, 10);


    return (
        <section className={style.sidebar}>
            <div className={style.title}>
                Categories
            </div>
            <nav>
                <ul className={style.menu}>
                    {arraySlice.map((({id, name}) => (
                        <li key={id}>
                            <NavLink 
                                className={({isActive}) => `${style.link} ${isActive ? style.active : ""}`}
                                to={`/categories/${id}`}>
                                {name}
                            </NavLink>
                        </li>
                        )
                    ))}
                </ul>
            </nav>

            <div className={style.footer}>
                <a 
                    href='' 
                    className={style.link}
                    target='_blank'
                >
                    Help
                </a>
                <a 
                    href='' 
                    className={style.link}
                    target='_blank'
                    style={{
                        textDecoration: 'underline'
                    }}
                >
                    Terms & Conditions
                </a>
            </div>
        </section>
    )
}
