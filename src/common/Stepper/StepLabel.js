import React from 'react';
import { StepLabel, FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

export default ({ activeStep, stepsCount, stepIndex, children }) => {
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === stepsCount - 1;
  const isStepCompleted = activeStep > stepIndex;
  const isActiveOrCompleted = activeStep >= stepIndex;
  const styles = {
    icon: {
      paddingTop: 4,
      fontSize: 26
    },
    firstLabel: {
      paddingLeft: 0
    },
    lastLabel: {
      paddingRight: 0
    },
    notCompletedLabel: {
      color: Colors.grey300
    }
  };
  const icon = (
    <FontIcon
      className={isStepCompleted ? 'synicon-checkbox-marked-circle' : `synicon-numeric-${stepIndex + 1}-box`}
      style={styles.icon}
      color={isActiveOrCompleted ? Colors.blue400 : Colors.grey400}
    />
  );

  return (
    <StepLabel
      style={{ ...(isFirst && styles.firstLabel), ...(isLast && styles.lastLabel) }}
      icon={icon}
    >
      <span
        style={{ ...(!isActiveOrCompleted && styles.notCompletedLabel) }}
        className="hm-1-l"
      >
        {children}
      </span>
    </StepLabel>
  );
};
