import * as React from 'react';
import Book from '../../models/book';
import axios from 'axios';
import Layout from '../Layout';

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

export default BookSearchForm;
