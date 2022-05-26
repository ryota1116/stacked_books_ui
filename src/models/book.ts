/*
 * ==========
 * Bookモデル
 * ==========
 */
type Book = {
  googleBooksId: string;
  title: string;
  authors: string[]|null;
  description: string;
  isbn10: string;
  isbn13: string;
  pageCount: number;
  publishedAt: string;
};

export default Book;
