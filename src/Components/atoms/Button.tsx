import shadows from "@mui/material/styles/shadows";
import { border } from "@mui/system";
import React from "react";

// https://zenn.dev/yahsan2/articles/20220118-987ddf760fbdb2
type Props = {
    bg: string;
    border?: string;
    onClick: () => void;
}

const Button: React.FC<Props> = React.memo(
    ({bg, border, onClick, children}) => {

        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }
);
