import React, {useState, useEffect} from 'react'
import { makeStyles, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  createStyles, 
  Theme,
  Typography,
  Grid,
  Avatar
} from '@material-ui/core';
import { useQuery} from '@apollo/client'

import {LOAD_PEOPLE} from '../graphql/queries'
import Person from './Person'
import {PersonType} from '../graphql/types'

const useStyles = makeStyles(({palette, spacing }: Theme)=>
createStyles({
  table: {
    maxWidth: "100%",
  },
  tableContainer:{
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: '100%'
  },
  tableHeaderCell:{
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: palette.primary.dark,
    color: palette.getContrastText(palette.primary.dark) 
  },
  avatar: {
    color: palette.getContrastText(palette.primary.light),
    backgroundColor: palette.primary.dark
  },
  name: {
    fontWeight: 'bold',
    color: 'black'
  },
  paper: {
    border: '1px solid',
    padding: spacing(1),
    backgroundColor: palette.background.paper,
  },
  typography: {
    padding: 10
  }
}));


const columns = [
  { id: 'name', label: 'name' },
  { id: 'height', label: 'height'},
  { id: 'mass', label: 'mass'},
  { id: 'gender', label: 'gender'}
];

export default function People() {
  const classes = useStyles();
  const [people, setPeople] = useState<PersonType[]>([])
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');


  const {error, loading, data} = useQuery(LOAD_PEOPLE, {variables: { filter: {name: '' }}});

  useEffect(() => {
    if (data) {
      const { fetchPeople} = data
      setPeople(fetchPeople.data)
    }
  }, [data])
  
  const handleClickOpen = (name: any) => {
    setName(name)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (error) return <p>Error: {error.message}</p>;


  return (
    <>
    {loading ? (<p>Loading...</p>) :
      <TableContainer component={Paper} className={classes.tableContainer}>
        <h1>STAR WARS</h1>
        <Person open={open} name={name} onClose={handleClose} />
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
          {columns.map((col)=>(
            <TableCell 
            className={classes.tableHeaderCell} 
            key={col.id}
            >
              {col.label}
          </TableCell>
          ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {people.map((person, index) => (
              <TableRow key={index} onClick={()=>{handleClickOpen(person.name)}}>
                <TableCell component="th" scope="row">
                  <Grid container>
                    <Grid item lg={4}>
                      <Avatar alt={person.name} src={'.'} className={classes.avatar}/>
                    </Grid>
                    <Grid item lg={8}> 
                      <Typography className={classes.name} component='span'>{person.name}</Typography>
                    </Grid>
                  </Grid>
                    
                </TableCell>
                <TableCell >{person.mass}</TableCell>
                <TableCell >{person.height}</TableCell>
                <TableCell >{person.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
    </>
  )
}
