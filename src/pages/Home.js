import React, { useEffect, useState } from "react";
import { Content } from "../components/layout/Content";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCols, fetchVouchers, vouchersSelector } from '../slices/vouchers'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField } from "@material-ui/core";

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
  const [formVal, setFormVal] = useState({})

  useEffect(() => {
    dispatch(fetchCols())
  }, [dispatch])

  const renderSearchBox = () => {
    if (loading) return <p>Loading SearchBox...</p>
    if (hasErrors) return <p>Unable to display SearchBox.</p>

    return cols.map((col, idx) =>
      <TextField key={idx} label={col}
        name={col} onChange={(e) => handleChange(e)} />)
  }

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  }
  const handleSubmit = () => {
    console.log(formVal)
    dispatch(fetchVouchers(formVal))
  }

  return (
    <Content>
      {cols && (<Paper variant="outlined" square>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            {renderSearchBox()}
          </div>
          <Button
            onClick={handleSubmit}
            variant="contained" color="primary">
            Submit
        </Button>
        </form>
      </Paper>)
      }
    </Content>
  )
}
