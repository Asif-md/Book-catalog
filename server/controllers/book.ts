import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    let { title, year, description } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        year,
        description
    });

    return book
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    Book.find()
        .exec()
        .then((books) => {
            return res.status(200).json({
                books: books,
                count: books.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getBookByID = (req: Request, res: Response, next: NextFunction) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            return res.status(200).json({
                book
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getAllBooks, getBookByID };
