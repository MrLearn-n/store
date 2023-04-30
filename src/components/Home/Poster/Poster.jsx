import React from 'react'
import style from './../Home.module.css'
import bgImg from './../../../images/computer.png'

export const Poster = () => {
    return (
        <section className={style.home}>
            <div className={style.title}>BIG SALE 20%</div>
            <div className={style.product}>
                <div className={style.text}>
                    <div className={style.subtitle}> the bestseller of 2022 </div>
                    <h1 className={style.head}>LENNOn r2d2 with NVIDIA 5090 TI</h1>
                    <button className={style.button}>Shop now</button>
                </div>
                <div className={style.image}>
                    <img src={bgImg} alt='' />
                </div>
            </div>
        </section>
    )
}
