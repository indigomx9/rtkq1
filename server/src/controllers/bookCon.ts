import express from "express";
import { Books } from "../models/Books";
import { Users } from "../models/Users";

export const CreateBook: express.RequestHandler =
async (req, res, next) => {
    try {
        const book: Books = new Books();
        book.title = req.body.title;
        book.author = req.body.author;
        book.email = req.body.email;
        book.age = req.body.age;
        book.info = req.body.info;
        await book.save();
        return res.status(201).json(book);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const FetchAllBooks: express.RequestHandler =
async (req, res, next) => {
    try {
        await Books.find()
            .then((books) => res.status(201).json(books));
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const GetOneBook: express.RequestHandler =
async (req, res, next) => {
    try {
        const book: Books = 
            await Books.findOneOrFail(req.params.id);
        return res.status(201).json(book);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const UpdateBook: express.RequestHandler =
async (req, res, next) => {
    try {
        const book: Books = 
            await Books.findOneOrFail(req.params.id);
        book.title = req.body.title;
        book.author = req.body.author;
        book.email = req.body.email;
        book.age = req.body.age;
        book.info = req.body.info;
        await book.save();
        return res.status(201).json("The Book was Updated!");
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const DeleteBook: express.RequestHandler =
async (req, res, next) => {
    try {
        const book: Books = 
            await Books.findOneOrFail(req.params.id);
        await book.remove();
        res.status(201).json("The Book was Deleted!");
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};


