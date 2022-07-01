import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import User from "../../models/user";
import React from 'react';

/*
 * ============
 * ログインする
 * ============
 */
type Response = {
    userName: string;
    email: string;
    token: string
}

const SignIn = async ( email: string, password: string): Promise<Response> => {
    const url = `http://localhost:3000/signin`;

    const response :Response = await axios.post(url, {
        email: email,
        password: password
    }).then((response)  => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });

    return response;
}

/*
 * ==========================
 * ログインフォームコンポーネント
 * ==========================
 */
const SignInForm = () => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [user, setUser] = React.useState<User | null>(null);
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

    return (
        <Box
            component="form"
            noValidate
            sx={{
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
            }}
        >
            <div>
                <TextField
                    required
                    label="メールアドレス"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    label="パスワード"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={async (e) => {
                        const response: Response = await SignIn(email, password);

                        // ローカルストレージにトークンを保存
                        localStorage.setItem('token', response.token);
                        // ユーザー情報をstateにセット
                        setUser({
                            userName: response.userName,
                            email: response.email
                        })
                        setLoggedIn(true);
                    }}
                >
                    ログインする
                </Button>
            </div>
        </Box>
    )
}

export default SignInForm;
