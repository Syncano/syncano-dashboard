import React from 'react';
import _ from 'lodash';
import { Stepper, Step } from 'material-ui';
import StepLabel from './StepLabel';

const StepperWrapper = ({ activeStep, children }) => (
  <Stepper activeStep={activeStep}>
    {_.map(children, (stepLabel, index) => (
      <Step key={`step${index}`}>
        <StepLabel
          stepIndex={index}
          activeStep={activeStep}
          stepsCount={children.length}
        >
          {stepLabel}
        </StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default StepperWrapper;
