import React, { useEffect, useState } from "react";
import { Content } from "../components/layout/Content";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCols, fetchVouchers, vouchersSelector } from '../slices/vouchers'

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import VoucherTable from "../components/VoucherTable";

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
  const { cols, loading, hasErrors, vouchers } = useSelector(vouchersSelector)
  const [formVal, setFormVal] = useState({})

  useEffect(() => {
    dispatch(fetchCols())
  }, [dispatch])

  const renderSearchBox = () => {
    // if (loading) return <p>Loading SearchBox...</p>
    // if (hasErrors) return <p>Unable to display SearchBox.</p>

    return cols.map((col, idx) =>
      <TextField
        key={idx}
        label={col}
        name={col}
        onChange={(e) => handleChange(e)}
        onKeyPress={handleKeyPress}
      />)
  }

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  }
  const handleSearch = () => {
    // console.log(formVal)
    // check empty obj
    Object.keys(formVal).length === 0 &&
      formVal.constructor === Object ?
      alert('Please enter keyword in textbox at least 1.') :

      dispatch(fetchVouchers(formVal))

    // clear input
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setFormVal({})
  }
  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      handleSearch();
    }
  }

  return (
    <Content>
      {cols ? (<div style={{ textAlign: 'center' }}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            {renderSearchBox()}
          </div>
          <div>
            <p style={{ color: 'red' }}>*หากต้องการค้นหาโดยใช้วันที่ให้ระบุเป็น วัน/เดือน/ปี
            เช่น 31/12/2019</p>
          </div>
          <Button
            onClick={handleSearch}
            variant="contained" color="primary">
            Search
        </Button>
        </form>
      </div>) :
        (<h1>No data in table.</h1>)
      }
      {hasErrors && <h3>Something went wrong.!</h3>}
      {loading &&
        <div>
          <img style={{
            maxWidth: 500, maxHeight: 500, display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%'
          }} src={process.env.PUBLIC_URL + 'images/loading.gif'} alt="loading" />
        </div>
      }
      {
        vouchers.recordset && !loading && !hasErrors &&
        <VoucherTable />
      }
    </Content >
  )
}
