import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    //execute(arg0: { type: string; comment: string; screenshot: string; }): any {
        //throw new Error("Method not implemented.");
    //} // it's commented
    constructor (
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ) {}



    async run(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if (!type) // if left type will have an error
        {
            throw new Error('Type is required.')
        }

        if (!comment)  // if left comment will have an error
        {
            throw new Error('Type is required.')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64'))  // if screenshot type wasn't be "data:image..." will have an error
        {
            throw new Error('Invalid screenshot format.')
        }

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