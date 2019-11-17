export const loadQuestions = async (
    amount = 3,
    category = 9,
    difficulty = 'easy',
    type = 'multiple'
) => {
    try {
        const res = await fetch(
            `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
        );
        const { results } = await res.json();
        const questions = convertQuestionsFromAPI(results);
        return questions;
    } catch (ex) {
        console.error(ex);
        return null;
    }
};

export const convertQuestionsFromAPI = (rawQuestions) => {
    return rawQuestions.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        formattedQuestion.answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4);
        formattedQuestion.answerChoices.splice(
            formattedQuestion.answer,
            0,
            loadedQuestion.correct_answer
        );
        return formattedQuestion;
    });
};
