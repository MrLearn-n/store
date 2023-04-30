import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../images/logo.svg';
import style from './Footer.module.css';

export const Footer = () => {
    return (
        <section className={style.footer}>
            <div className={style.logo}>
                <Link to='/' >
                    <img src={logo} alt='stuff' />
                </Link>
            </div>

            <div className={style.rights}>
                Developed by MrLearn
            </div>

            <div className={style.socials}>
                <a 
                    href=''
                    target='_blank'
                    rel='noreferrer'
                >
                    <svg className="icon">
                        <use xlinkHref={'./sprite.svg#instagram'} />
                    </svg>
                </a>

                <a 
                    href=''
                    target='_blank'
                    rel='noreferrer'
                >
                    <svg className="icon">
                        <use xlinkHref={'./sprite.svg#facebook'} />
                    </svg>
                </a>

                <a 
                    href=''
                    target='_blank'
                    rel='noreferrer'
                >
                    <svg className="icon">
                        <use xlinkHref={'./sprite.svg#youtube'} />
                    </svg>
                </a>
            </div>
        </section>
    )
}
