import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Book from '../../models/book';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import Layout from '../Layout';

const pages = ['アプリ名', '本棚', '読書量グラフ', '新規登録', 'ログイン'];
const settings = ['プロフィール', 'ログアウト'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const getBooks = async (keywords: string): Promise<Book[]> => {
  const url = `http://localhost:3000/books/search`;
  // const url = `https://www.googleapis.com/books/v1/volumes?q=${keywords}`;
  // GoogleBooksAPIの型に合わせている
  const {
    data: { books }
  } = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      "title": keywords
    }
  });
  return books;
}

// booksという配列の要素数が1個以上の場合、書籍検索結果をレンダリングする
const SearchBookResults = ({ books }: { books: Book[] }) => books.length > 0 ? (
  <table>
    <thead>
      <tr>
        <th>タイトル</th>
        <th>出版社</th>
        <th>出版年</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book: Book) => (
        <tr key={book.googleBooksId}>
          <td>{book.title}</td>
          {
            book.authors?.map((author: string) => (
              <td className="publisher">{author}</td>
            ))
          }
          <td className="publishedDate">{book.publishedAt}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <div className="empty-state" />
);

// 書籍検索フォーム
const BookSearchForm = () => {
  const [keyword, setKeyword] = React.useState<string>("");
  const [books, setBooks] = React.useState<Book[]>([]);

  return (
    <Layout title='書籍の検索'>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const books: Book[] = await getBooks(keyword);
          // getBooks(keyword)の結果が返ってくるまで、実行されない。
          setBooks(books);
        }}
      >
        <input
          type="text"
          name="search"
          onChange={(e) => setKeyword(e.target.value) }
        />
        <button type='submit'>検索する</button>
      </form>
      <SearchBookResults books={books} />
    </Layout>
  );
}

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // TODO: 型定義しっかりしたい
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  // TODO: 型定義しっかりしたい
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="本のタイトル、著者"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BookSearchForm;
