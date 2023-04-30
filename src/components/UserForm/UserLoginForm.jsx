import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/user/userSlice';
import style from './User.module.css';


export const UserLoginForm = ({closeForm, toggleCurrentFormType}) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    console.log(values);

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser(values));
        closeForm();
    }


    return (
        <div className={style.wrapper}>
            <div className={style.close}>
                <svg className='icon'>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                </svg>
            </div>

            <div className={style.title}>
                Login
            </div>

            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.group}>
                    <input 
                            type='email'
                            placeholder='Your email'
                            name='email'
                            value={values.email}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                </div>

                <div className={style.group}>
                    <input 
                            type='password'
                            placeholder='Your password'
                            name='password'
                            value={values.password}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                </div>


                <div className={style.link} onClick={() => toggleCurrentFormType('signup')}>
                    Create an account
                </div>

                <button type='submit' className={style.submit}>
                    Login
                </button>
            </form>
        </div>
    )
}
