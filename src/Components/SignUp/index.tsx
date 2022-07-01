import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from '../../models/user';
import axios from 'axios';
import React from 'react';

/*
 * ==============
 * 会員登録する
 * ==============
 */
const SignUp = async (userName: string, email: string, password: string): Promise<User> => {
    const url = `http://localhost:3000/signup`;

    const { data: { user }} = await axios.post(url, {
        userName: userName,
        email: email,
        password: password
    });
    return user;
}

/*
 * ===============
 * 会員登録フォーム
 * ===============
 */
const SignUpForm: React.FC = () => {
    return (
        <div>
            aaa
        </div>
    )
}

export default SignUpForm;
