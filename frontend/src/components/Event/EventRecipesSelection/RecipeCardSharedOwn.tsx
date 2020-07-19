import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

 /** (✓)
  * This shows the OWN and SHARED recipes on a card with the relevant information shown.
  * Can select and cancel the recipe.
  */

// Basic Styling specification of the all the components
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      boxShadow: '0px 0px 8px 1px rgba(0,0,0,0.75)',
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      width: '100%',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    content: {
      flex: '1 0 auto',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
    },
    iconrow: {
        display: 'flex',
        flexDirection: 'row',
    },
    iconGroup: {
        display: 'flex',
        alignContent: 'flex-end',
        flexDirection: 'column-reverse',
        height: '100%',
        justifyContent: 'space-evenly',
    },
    element: {
        display: 'flex',
        alignSelf: 'flex-start',
        padding: theme.spacing(1),
        paddingLeft: '15px',
    },
    elementTitle: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '16px',
        paddingRight: '10px ',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    elementContent: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '15px',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    icon2: {
        display: 'flex',
        alignSelf: 'center',
        padding: 0,
        fill: 'red',
    },
    icon1: {
        display: 'flex',
        alignSelf: 'center',
        padding: 0,
        fill: 'green',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: 'darkorange',
    },
  }),
);

// Interface specification for the exported default component and constants

interface Props {
    recipe_title: any;
    food_type: any;
    cuisine_type: any;
    preparation_time: any;
    index?: any;
    deleteId?: any;
    accept: any;
    addId?: any;
    id?:any;
  }


export default function MediaControlCard(props: Props) {
    // type: cookroom, course, recipe
  const classes = useStyles();
  const theme = useTheme();

  const handleDelete = () => {
        props.deleteId(props.id, props.index);
  };

  const handleAdd= () => {
       props.addId(props.id, props.index);
  };

  return (
    <Card className={classes.root}>
        <div className={classes.info} >
            <div className={classes.details} >
                <div className={classes.content}>
                        <Typography className={classes.title} component="h6" variant="h6">
                            {props.recipe_title}
                        </Typography>
                        <Paper>
                            {
                                    props.food_type
                                    ?
                                    <>
                                        <div className={classes.element}>
                                            <div className={classes.elementTitle}>Food Type:</div>
                                            <div className={classes.elementContent}>{props.food_type}</div>
                                        </div>
                                        <Divider variant="middle" />
                                    </>
                                    
                                    :
                                    null
                            }
                            {
                                    props.cuisine_type
                                    ?
                                    <>
                                        <div className={classes.element}>
                                            <div className={classes.elementTitle}>Cuisine Type:</div>
                                            <div className={classes.elementContent}>{props.cuisine_type}</div>
                                        </div>
                                        <Divider variant="middle" />
                                    </>
                                    :
                                    null
                            }
                            {
                                    props.preparation_time
                                    ?
                                    <>
                                        <div className={classes.element}>
                                            <div className={classes.elementTitle}>Preparation Time:</div>
                                            <div className={classes.elementContent}>{props.preparation_time}</div>
                                        </div>
                                        <Divider variant="middle" />
                                    </>
                                    :
                                    null
                            }
                            <div className={classes.iconrow}>
                                <div className={classes.details} >
                                    {
                                        props.accept
                                        ?
                                        <CheckCircleIcon className={classes.icon1} onClick={handleAdd}/>
                                        :
                                        <DeleteIcon className={classes.icon2} onClick={handleDelete} />
                                    }                                    
                                </div>
                            </div>
                        </Paper>                
                </div>
            </div>
      </div>
    </Card>
  );
}