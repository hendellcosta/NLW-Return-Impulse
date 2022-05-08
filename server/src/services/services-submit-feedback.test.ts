import { SubmitFeedbackService } from "./services-submit";

const createFeedbackSpy = jest.fn(); // notify when isn't been called
const createMailSpy = jest.fn();  // notify when isn't been called

const submitFeedback = new SubmitFeedbackService(
    {
        create: createFeedbackSpy
    },

    {
        sendMail: createMailSpy
    }
)

describe('Submit feedback', () => {
    it('should be able to submit feedback', async () => {

        await expect(submitFeedback.run({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,5646576jyujujmu',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(createMailSpy).toHaveBeenCalled();


    });



    it('should not be able to submit feedback without type', async () => {

        await expect(submitFeedback.run({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,5646576jyujujmu',
        })).rejects.toThrow();

    });



    it('should not be able to submit feedback without comment', async () => {

        await expect(submitFeedback.run({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,5646576jyujujmu',
        })).rejects.toThrow();

    });



    it('should not be able to submit feedback with an invalid screenshot', async () => {

        await expect(submitFeedback.run({
            type: 'BUG',
            comment: 'It all is bugged!',
            screenshot: 'spec.jpg',
        })).rejects.toThrow();

    });
})