import Question from "../models/questionModel.js";
import Product from "../models/productModel.js";

export function likeQuestion({ body: { questionId }, user }, res) {
  if (typeof questionId === "string") {
    Question.findById(questionId, async (error, question) => {
      if (!question)
        res.status(404).json({ message: "Question doesn't exist." });
      else {
        let index = 0;
        for await (const userId of question.usersThatLiked) {
          if (userId.equals(user._id)) {
            question.usersThatLiked.splice(index, 1);
            question.save();
            return res
              .status(200)
              .json({ message: "Succesfully unliked question." });
          }
          index += 1;
        }

        question.usersThatLiked.push(user._id);
        question.save();
        res.status(200).json({ message: "Succesfully liked review." });
      }
    });
  } else
    res.status(400).json({ message: "Question id is empty or wrong type." });
}
export function dislikeQuestion({ body: { questionId }, user }, res) {
  if (typeof questionId === "string") {
    Question.findById(questionId, async (error, question) => {
      if (!question)
        res.status(404).json({ message: "Question doesn't exist." });
      else {
        let index = 0;
        for await (const userId of question.usersThatDisliked) {
          if (userId.equals(user._id)) {
            question.usersThatDisliked.splice(index, 1);
            question.save();
            return res
              .status(200)
              .json({ message: "Succesfully unliked question." });
          }
          index += 1;
        }

        question.usersThatDisliked.push(user._id);
        question.save();
        res.status(200).json({ message: "Succesfully liked review." });
      }
    });
  } else
    res.status(400).json({ message: "Question id is empty or wrong type." });
}
export function createQuestion({ body, user }, res) {
  const newQuestion = new Question(body);
  newQuestion.userUsername = user.username;
  newQuestion.userId = user._id;
  const error = newQuestion.validateSync();
  if (error) res.status(400).json({ message: error.message });
  else {
    Product.findById(newQuestion.productId, (error, product) => {
      if (!product)
        res
          .status(404)
          .json({ message: "Product with this id doesn't exist." });
      newQuestion.save();
      res.status(201).json({ message: "Question created." });
    });
  }
}

export function answerQuestion({ body, user }, res) {
  if (typeof body.questionId === "string" && typeof body.text === "string")
    Question.findById(body.questionId, (error, question) => {
      if (!question)
        res
          .status(404)
          .json({ message: "Question with this id doesn't exist." });
      else {
        const newAnswer = {
          userId: user._id,
          userUsername: user.username,
          text: body.text,
        };
        question.answers.push(newAnswer);
        question.save();
        res.status(201).json({ message: "Answer created." });
      }
    });
  else res.status(400).json({ message: "Wrong type or empty." });
}
export function likeAnswer({ body: { questionId, answerId }, user }, res) {
  if (typeof questionId === "string" && typeof answerId === "string") {
    Question.findById(questionId, async (error, question) => {
      if (!question)
        res.status(404).json({ message: "Question doesn't exist." });
      else {
        const answer = await question.answers.find(
          (e) => answerId === e._id.toString()
        );
        let index = 0;
        for await (const userId of answer.usersThatLiked) {
          if (userId.equals(user._id)) {
            answer.usersThatLiked.splice(index, 1);
            question.save();
            return res
              .status(200)
              .json({ message: "Succesfully unliked answer." });
          }
          index += 1;
        }

        answer.usersThatLiked.push(user._id);
        question.save();
        res.status(200).json({ message: "Succesfully liked answer." });
      }
    });
  } else
    res.status(400).json({ message: "Question id is empty or wrong type." });
}

export function dislikeAnswer({ body: { questionId, answerId }, user }, res) {
  if (typeof questionId === "string" && typeof answerId === "string") {
    Question.findById(questionId, async (error, question) => {
      if (!question)
        res.status(404).json({ message: "Question doesn't exist." });
      else {
        const answer = await question.answers.find(
          (e) => answerId === e._id.toString()
        );
        let index = 0;
        for await (const userId of answer.usersThatDisliked) {
          if (userId.equals(user._id)) {
            answer.usersThatDisliked.splice(index, 1);
            question.save();
            return res
              .status(200)
              .json({ message: "Succesfully unliked answer." });
          }
          index += 1;
        }

        answer.usersThatDisliked.push(user._id);
        question.save();
        res.status(200).json({ message: "Succesfully liked answer." });
      }
    });
  } else
    res.status(400).json({ message: "Question id is empty or wrong type." });
}
export function deleteAnswer({ body: { questionId, answerId }, user }, res) {
  if (typeof answerId === "string" && typeof questionId === "string") {
    Question.findOne({ _id: questionId }, async (error, question) => {
      if (!question)
        res.status(404).json({ message: "Question doesn't exists." });
      else {
        const answerIndex = await question.answers.findIndex((a) =>
          a._id.equals(answerId)
        );
        if (answerIndex !== null) {
          question.answers.splice(answerIndex, 1);
          question.save();
          res.status(200).json({ message: "Answer deleted." });
        } else res.status(200).json({ message: "Answer doesn't exist." });
      }
    });
  } else {
    res.status(400).json({ message: "Question id is empty of wrong type." });
  }
}
export function deleteQuestion({ body: { id }, user }, res) {
  if (typeof id === "string") {
    Question.findOneAndDelete({ _id: id }, function (error, question) {
      if (!question)
        res.status(404).json({ message: "Question doesn't exists." });
      else {
        if (user.isAdmin === true || user._id.equals(question.userId)) {
          question.remove();
          res.status(200).json({ message: "Question deleted." });
        }
      }
    });
  } else {
    res.status(400).json({ message: "Question id is empty of wrong type." });
  }
}
