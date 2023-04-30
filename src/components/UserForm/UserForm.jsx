import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm, toggleFormType } from './../../store/user/userSlice';
import style from './User.module.css';
import { UserLoginForm } from './UserLoginForm';
import { UserSignUpForm } from './UserSignUpForm';

export const UserForm = () => {
    const typeForm = "signup";

    const dispatch = useDispatch();
    const { showForm, formType } = useSelector(({ user }) => user);

    const closeForm = () => {
        dispatch(toggleForm(false));
    };

    const toggleCurrentFormType = (type) => {
        dispatch(toggleFormType(type));
    };
    
    return showForm ? (
        <>
            <div className={style.overlay} onClick={closeForm} />
           {formType === typeForm ? ( 
                <UserSignUpForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType}/> 
            )   :   ( 
                <UserLoginForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType}/>
            )}
        </>
    ) : 
    (
        <></>
    )
}
