import React, { useState } from 'react';
import './Survey.css';  // Add a new CSS file for styling
import Welcome from './Welcome';  // Import Welcome component

const questionsData = [
  {
    id: 1,
    question: 'How satisfied are you with our products?',
    type: 'rating',
    scale: 5,
  },
  {
    id: 2,
    question: 'How fair are the prices compared to similar retailers?',
    type: 'rating',
    scale: 5,
  },
  {
    id: 3,
    question: 'How satisfied are you with the value for money of your purchase?',
    type: 'rating',
    scale: 5,
  },
  {
    id: 4,
    question: 'On a scale of 1-10, how would you recommend us to your friends and family?',
    type: 'rating',
    scale: 10,
  },
  {
    id: 5,
    question: 'What could we do to improve our service?',
    type: 'text',
  },
];

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [surveyStarted, setSurveyStarted] = useState(false);  // Survey start status
  const [completed, setCompleted] = useState(false);  // Survey completed status

  const handleAnswerChange = (value) => {
    const updatedAnswers = { ...answers, [questionsData[currentQuestionIndex].id]: value };
    setAnswers(updatedAnswers);
    localStorage.setItem('survey-answers', JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setCompleted(true);
    localStorage.setItem('survey-status', 'COMPLETED');
  };

  const handleStartSurvey = () => {
    setSurveyStarted(true);
  };

  const currentQuestion = questionsData[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  // Conditional Rendering for Welcome, Survey, and Thank You screens
  if (!surveyStarted) {
    return <Welcome onStart={handleStartSurvey} />;
  }

  if (completed) {
    return (
      <div className="thank-you-container">
        <h2>Thank You!</h2>
        <p>We appreciate you taking the time to complete our survey.</p>
        <p>Your feedback helps us improve our service and provide you with the best possible experience.</p>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <h2>Customer Survey</h2>
      <p>{`${currentQuestionIndex + 1}/${questionsData.length}`}</p>
      <p>{currentQuestion.question}</p>

      {currentQuestion.type === 'rating' && (
        <div className="rating-buttons">
          {Array.from({ length: currentQuestion.scale }, (_, i) => (
            <button
              key={i + 1}
              className={`rating-btn ${currentAnswer === String(i + 1) ? 'selected' : ''}`}
              onClick={() => handleAnswerChange(String(i + 1))}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
        
        {currentQuestion.type === 'text' && (
        <textarea
        style={{
          width: '100%',
          height: '150px',
          padding: '2px',
          fontSize: '16px',
          // fontWeight: 'bold',    // Makes the text bold
          fontStyle: 'italic', 
          border: '1px solid #ccc',
          borderRadius: '5px',
          outline: 'none',
        }}
         
          value={currentAnswer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      )}
      
      

      <div className="nav-buttons">
        {currentQuestionIndex > 0 && <button className="prev-btn" onClick={handlePrev}>Prev</button>}
        {currentQuestionIndex < questionsData.length - 1 ? (
          <button className="next-btn" onClick={handleNext}>Next</button>
        ) : (
          <button className="next-btn" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Survey;

