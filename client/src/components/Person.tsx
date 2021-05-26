import React, {useState, useEffect} from 'react'
import {
  makeStyles,
  Card, 
  CardActions, 
  CardContent,
  Typography, 
  DialogTitle, 
  Dialog,
  Button,
  Chip
} from '@material-ui/core';
import { useQuery} from '@apollo/client'

import {LOAD_PEOPLE} from '../graphql/queries'
import {PersonType} from '../graphql/types'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  chip:{
    marginRight: 10
  }
});


export default function Person({open, onClose, name}: any) {
  const classes = useStyles();
  const [personDetail, setPersonDetail] = useState<PersonType>()

  const handleClose = () => {
    onClose();
  };

  const {error, loading, data} = useQuery(LOAD_PEOPLE, {variables: { filter: {name }}});

  useEffect(() => {
    if (data && name) {
      const { fetchPeople} = data
      setPersonDetail(fetchPeople?.data[0])
    }
  }, [data, name])
  
  if (error) return <p>Error: {error.message}</p>;


   
  return (
    <>
      {loading ? (<p>Loading...</p>) :
        <Dialog onClose={handleClose}  aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">{name} Details</DialogTitle>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Name
                </Typography>
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Height
                </Typography>
                <Typography variant="h5" component="h2">
                {personDetail?.height}
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Mass
                </Typography>
                <Typography variant="h5" component="h2">
                  {personDetail?.mass}
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Gender
                </Typography>
                <Typography variant="h5" component="h2">
                  {personDetail?.gender}
                </Typography>

                <h3>Home World Details</h3>
                <hr/>
                <Typography variant="h5" className={classes.title} color="textSecondary" >
                  Name: <Chip className={classes.chip} label={personDetail?.home_world.name} />
                  Rotation Period: <Chip className={classes.chip} label={personDetail?.home_world.rotation_period} />
                  Orbital Period: <Chip className={classes.chip} label={personDetail?.home_world.orbital_period}/>
                  Diameter:  <Chip className={classes.chip} label={personDetail?.home_world.diameter} />
                  Climate: <Chip className={classes.chip} label={personDetail?.home_world.climate} /> 
                  Gravity : <Chip className={classes.chip} label={personDetail?.home_world.gravity} /> 
                  Terrain: <Chip className={classes.chip} label={personDetail?.home_world.terrain} />
                  Surface Water: <Chip className={classes.chip} label={personDetail?.home_world.surface_water} />
                  Population: <Chip className={classes.chip} label={personDetail?.home_world.population} />
                </Typography>
                
              </CardContent>
              <CardActions>
                <Button color='primary' size="small" onClick={handleClose}>close</Button>
              </CardActions>
            </Card>
        </Dialog>
      }
    </>
  )
}
