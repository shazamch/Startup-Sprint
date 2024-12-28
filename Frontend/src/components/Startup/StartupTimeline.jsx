import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const StartupTimeline = () => {
  // Hardcoded milestones
  const [milestones] = useState([
    { date: 'Founded', title: 'Startup Founded', description: 'The company was officially founded.', icon: '📅', color: '#1836b2' },
    { date: 'First Funding Round', title: 'Secured First Funding', description: 'The startup secured its first round of funding.', icon: '💰', color: '#e7c94d' },
    // Add more hardcoded milestones here
  ]);

  return (
    <div className="timeline-container">
      <VerticalTimeline lineColor="#1836b2">
        {milestones.map((milestone, index) => (
          <VerticalTimelineElement
            key={index}
            date={milestone.date}
            iconStyle={{ background: milestone.color, color: '#fff' }}
            icon={milestone.icon}
          >
            <h3>{milestone.title}</h3>
            <p>{milestone.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default StartupTimeline;
