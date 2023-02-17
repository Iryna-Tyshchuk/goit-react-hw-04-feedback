import { useState } from 'react';
import { GlobalStyle } from '../styles/GlobalStyle';

import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedbackOptions = Object.keys({ good, neutral, bad });

  const onLeaveFeedback = option => {
    if (option === 'good') setGood(state => state + 1);
    if (option === 'neutral') setNeutral(state => state + 1);
    if (option === 'bad') setBad(state => state + 1);
  };

  const totalFeedback = () => good + neutral + bad;

  const positiveFeedbackPercentage = () =>
    `${Math.round((good / totalFeedback()) * 100)}%` || 0;

  return (
    <>
      <Section title="Please leave your feedback ">
        <FeedbackOptions
          options={feedbackOptions}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      {totalFeedback() > 0 ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback()}
            positivePercentage={positiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Section>
          <Notification message="There is no feedback" />
        </Section>
      )}

      <GlobalStyle />
    </>
  );
}
