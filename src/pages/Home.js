import React, { useEffect, useState } from "react";
import { Content } from "../components/layout/Content";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCols, vouchersSelector } from '../slices/vouchers'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import SearchBox from "../components/SearchBox";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { cols, loading, hasErrors } = useSelector(vouchersSelector)
  const [formVal, setFormVal] = useState('')

  useEffect(() => {
    dispatch(fetchCols())
  }, [dispatch])

  const handleChange = (event) => {
    console.log('hhhh')
    // setFormVal({value: event.target.value});
  }
  const renderSearchBox = () => {
    if (loading) return <p>Loading SearchBox...</p>
    if (hasErrors) return <p>Unable to display SearchBox.</p>

    return cols.map((col, idx) => <SearchBox key={idx} label={col} value={formVal} onChange={() => handleChange()} excerpt />)
  }

  return (
    <Content>
      {cols && (<Paper variant="outlined" square>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            {renderSearchBox()}
          </div>
          <Button
            variant="contained" color="primary">
          Submit
        </Button>
        </form>
        
      </Paper>)
      }
    </Content>
  )
}
