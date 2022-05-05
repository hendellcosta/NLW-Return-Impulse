import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor (
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ) {}



    async run(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot, 
        })

        await this.mailAdapter.sendMail({
            subject: 'New feedback',
            body: [
                    `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                      `<p>Feedback Type: ${type}</p>`,
                      `<p>Comment: ${comment}</p>`,
                   `</div>`
               ].join('\n')
        })
    }
}