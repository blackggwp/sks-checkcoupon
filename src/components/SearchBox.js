import React from "react";
import TextField from '@material-ui/core/TextField';

export default function SearchBox(props) {
  return <TextField id="standard-search" label={props.label} type="search" />
}