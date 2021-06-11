import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Prepare', 'Wrap', 'Measure'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Prepare string or paper that long enough to wrap around your wrist. If you have measuring tape, please skip. `;
    case 1:
      return 'Wrap it around your wrist, and mark off where the string comes together.';
    case 2:
      return `Measure the length of marked point with ruler.`;
    default:
      return 'Unknown step';
  }
}

export default function MeasureWristStep() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep(steps.length);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    // disabled={activeStep === 0}
                    onClick={activeStep === 0 ? handleSkip : handleBack}
                    className={classes.button}
                  >
                    {activeStep === 0 ? 'Skip' : 'Back'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
        <FormControl>
          <Input
            id="standard-adornment-weight"
            // value={values.weight}
            // onChange={handleChange('weight')}
            endAdornment={<InputAdornment position="end">centimetres</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="standard-weight-helper-text">Wrist size</FormHelperText>
          </FormControl>
          <Button onClick={handleReset} className={classes.button} style={{marginLeft: 25}}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
