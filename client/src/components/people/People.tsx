import React, {useState, useEffect} from 'react'
import { 
  Theme,
  createStyles, 
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader, 
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { useQuery} from '@apollo/client'
import ReactPaginate from 'react-paginate'

import StarWarImage from '../../assets/skywalker_saga.jpeg'
import {LOAD_PEOPLE} from '../../graphql/queries'
import Person from '../person/Person'
import {PersonType} from '../../graphql/types'
import './people.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      padding: 10
    },
    gridList: {
      width: "70%",
      maxHeight: "30%",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    image:{
      objectFit: 'cover'
    },
    hover: {
      "&:hover": {
        backgroundColor: theme.palette.primary.light
      }
    },
    headerName:{
      color: '#800',
      fontWeight: 'bolder'
    },
    loader:{
      color: 'blue',
      fontWeight: 'bolder'
    }
  }),
);


export default function People() {
  const classes = useStyles();
  const perPage = 10;
  const [people, setPeople] = useState<PersonType[]>([])
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(1);
  

  const {error, loading, data} = useQuery(LOAD_PEOPLE, {variables: { filter: {name: '', page:pageNumber}}});

  useEffect(() => {
    if (data) {
      const { fetchPeople} = data
      setPeople(fetchPeople.data)      
      setCount(fetchPeople.page.total)
    }
  }, [data, pageNumber])
  
  const handleClickOpen = (name: any) => {
    setName(name)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pageCount: number = Math.ceil(count / perPage);
  
  const changePage = ({selected}: any)=>{
    setPageNumber(selected)
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {loading ? (<p className={classes.loader}>Loading...</p>) :
        <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList} cols={3}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div"><h1 className={classes.headerName}>STAR WARS</h1></ListSubheader>
            <Person open={open} name={name} onClose={handleClose} />
          </GridListTile>
          {people.map((person, index) => (
            <GridListTile key={index} onClick={()=>{handleClickOpen(person.name)}} className={classes.hover}>
              <img src={StarWarImage} alt={person.name} className={classes.image}/>
              <GridListTileBar
                title={person.name}
                subtitle={<span>gender: {person.gender}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${person.name}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageRangeDisplayed={10}
            marginPagesDisplayed={10}
          />
      </div>
      }
    </>
  )
}
