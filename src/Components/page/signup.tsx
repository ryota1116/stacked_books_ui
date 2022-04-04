import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from '../../models/user';
import axios from 'axios';
import React, { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

const { register, handleSubmit, watch, formState: { errors } } = useForm();

const SignUp = async (userName: string, email: string, password: string): Promise<User> => {
    const url = `http://localhost:3000/signup`;

    const { data: { user }} = await axios.post(url, {
        userName: userName,
        email: email,
        password: password
    });
    return user;
}

const SignUpForm: React.FC = () => {
    const [userName, setUserName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [user, setUser] = React.useState<User | null>(null);

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={async (e: BaseSyntheticEvent) => {
                // e.preventDefault();
                const user: User = await SignUp(userName, email, password);

                setUser(user);
            }}
        >
            <TextField
                id="standard-basic"
                label="ユーザー名"
                variant="standard"
                onChange={(e) => setUserName(e.target.value)}
                />
            <br></br>
            <TextField
                id="standard-basic"
                label="メールアドレス"
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
                />
            <br></br>
            <TextField
                id="standard-basic"
                label="パスワード"
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                />
            <br></br>

            <Button variant="contained" href="/signup">
                登録する
            </Button>
        </Box>
    )
}

export default SignUpForm;
