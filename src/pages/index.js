import { Badge, Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper, Tooltip, Typography, CardActionArea, CardMedia } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React, { useState, useEffect } from 'react';
import { mixed, number, object } from 'yup';
import { ColorExtractor } from 'react-color-extractor';
import { ColorPicker, ColorButton } from 'material-ui-color';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import NumericInput from 'react-numeric-input';

import AddressForm from '../components/AddressForm' ;
import MeasureWristStep from '../components/MeasureWristStep' ;

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const IMAGE_STYLES = { width: 700, height: 500};

const SWATCHES_STYLES = {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignSelf: 'center',
};


export default function Home() {
  const [colors, setColors] = useState([]) ;
  const [picture, setPicture] = useState(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(null);
  const [isColorChange, setIsColorChange] = useState(false) ;

  const _handleImageChange = async (e) => {
    setIsColorChange(false);
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
     setFile(file);
     setPicture(reader.result)
    };

    reader.readAsDataURL(file) ;

    await sleep(1500);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateColor = (value, index) => {
    let cl = [...colors];
    cl[index] = '#'+value.hex;
    setColors(cl);
    setIsColorChange(true);
  };

  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
            firstName: '',
            lastName: '',
            millionaire: false,
            money: 0,
            description: '',
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log('values', values);
          }}
        >
          <FormikStep label="Extract Color">
          
            <div style={{ display: picture==null ? "none" : "flex", justifyContent: "center", alignItems: 'center' }}>
                <ColorExtractor getColors={color => !isColorChange ? setColors(color): null}>
                    <img src={picture} style={IMAGE_STYLES} />
                </ColorExtractor>
            </div>

            <Tooltip title="Custom your pallete" placement="bottom" arrow open={open} enterDelay={100000} onClose={handleClose}>
                <div style={SWATCHES_STYLES}>{colors && colors.map((color, id) => 
                      <ColorPicker key={id} value={color} hideTextfield onChange={(c) => updateColor(c, id)}/>)}
                </div>
            </Tooltip>

           <div style={{display:"flex", justifyContent:"center", marginTop: 45, marginBottom: 25}}> 
              <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                  color="primary"
                > 
                { picture==null ?
                  "Upload picture"
                  :
                  "Change picture"
                }
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e)=> _handleImageChange(e)} 
                  />
                </Button>
            </div>


          </FormikStep>

          <FormikStep
            label="Size and Design"
            validationSchema={object({
              money: mixed().when('millionaire', {
                is: true,
                then: number()
                  .required()
                  .min(
                    1_000_000,
                    'Because you said you are a millionaire you need to have 1 million'
                  ),
                otherwise: number().required(),
              }),
            })}
          >
          <Box paddingBottom={4} paddingX={4}>
            <Grid container spacing={3}>
                <Grid item xs>
                <Card variant= {size=='s' ? "outlined" : "elevation"}>
                    <CardActionArea onClick={() => setSize('s')}>
                    <CardMedia
                        image="https://toneoftrip.com/wp-content/uploads/2021/06/1327295-1-600x600.jpg"
                        title="Design 1"
                        style={{height: 300}}
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h6" >
                              Design 1
                          </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs>
                    <Card variant= {size=='m' ? "outlined" : "elevation"}>
                    <CardActionArea onClick={() => setSize('m')}>
                    <CardMedia
                        image="https://toneoftrip.com/wp-content/uploads/2021/05/1320454-600x600.jpg"
                        title="Design 2"
                        style={{height: 300}}
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h6" >
                          Design 2
                          </Typography>
                      </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card variant= {size=='l' ? "outlined" : "elevation"}>
                    <CardActionArea onClick={() => setSize('l')}>
                    <CardMedia
                        image="https://toneoftrip.com/wp-content/uploads/2021/06/1327298-1-600x600.jpg"
                        title="Design 3"
                        style={{height: 300}}
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h6" >
                          Design 3
                          </Typography>
                      </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            </Box>
          </FormikStep>

          <FormikStep label="Alphabet Pendant">
            <Box paddingBottom={4} paddingLeft={10} >
                {/* <Field name="description" component={TextField} label="Alphabet/Word" /> */}
            
              <Grid container spacing={1}>

                <Grid item xs={6} lg={2}>
                  <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'A'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

               
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'B'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'C'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                        <Badge badgeContent={'D'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                        <Badge badgeContent={'E'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                        <Badge badgeContent={'F'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                        <Badge badgeContent={'G'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                        <Badge badgeContent={'H'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                        <Badge badgeContent={'I'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'J'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'K'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'L'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'M'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'N'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'O'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'P'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'Q'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'R'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'S'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'T'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'U'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'V'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'W'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'X'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'Y'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6} lg={2} >
                <div>
                    <Grid container spacing={0} alignItems='center'>
                      <Grid item xs={2} lg={2}>
                      <Badge badgeContent={'Z'} color="secondary" />
                      </Grid>
                      <Grid item xs={10} lg={10} >
                        <NumericInput min={0} max={100} value={0} size='1'/>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

            </Grid>
            </Box>
          </FormikStep>

          <FormikStep label="Measure Wrist">
            <Box paddingBottom={2}>
              <MeasureWristStep />
            </Box>
          </FormikStep>

          <FormikStep label="Shipping Address">
            <Box paddingBottom={4} paddingX={4}>
              <AddressForm />
            </Box>
          </FormikStep>

        </FormikStepper>

      </CardContent>
    </Card>
  );
};


export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children) ;
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2} justify="flex-end">
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Checkout' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
