import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/services-submit';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
    
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackService.run({ type, comment, screenshot } )

    return res.status(201).send();

})