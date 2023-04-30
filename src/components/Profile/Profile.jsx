import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/user/userSlice';
import style from './Profile.module.css';

export const Profile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(({ user }) => user);
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
    });

    useEffect(() => {
        if(!currentUser) {
            return;
        }

        setValues(currentUser);
    }, [currentUser])

    const handleChange = ({ target: { value, name } }) => {
        setValues({...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateUser(values));
    };

    console.log(values);

    return (
        <section className={style.profile}>
            {!currentUser ? (
                <span>You need to log in</span>
            ) : (
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.group}>
                        <input 
                            type='email'
                            placeholder='You email'
                            name='email'
                            value={values.email}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={style.group}>
                        <input 
                            type='name'
                            placeholder='Your name'
                            name='name'
                            value={values.name}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={style.group}>
                        <input 
                            type='password'
                            placeholder='You password'
                            name='password'
                            value={values.password}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={style.group}>
                        <input 
                            type='avatar'
                            placeholder='Your avatar'
                            name='avatar'
                            value={values.avatar}
                            autoComplete='off'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type='submit' className={style.submit}>
                        Update
                    </button>
                </form>
            )
        }
        </section>
    )
}
