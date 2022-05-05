import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe("Submit feedback", () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Application is not working",
        screenshot: "data:image/png;base64,12312sda",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it("should not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Application is not working",
        screenshot: "data:image/png;base64,12312sda",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,12312sda",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Application is not working",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
