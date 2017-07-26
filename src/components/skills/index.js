import React, { PropTypes } from 'react';

const Skills = ({ skills }) => (
  <div>
    {skills.join(', ')}
  </div>
);

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Skills;
