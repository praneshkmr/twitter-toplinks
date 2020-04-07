import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { string, arrayOf } from 'prop-types';

const useStyles = makeStyles({
  table: {
    margin: '0 auto',
  },
});

const StatsTable = ({ headings, mostLinkSharingUsers }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading) => (<TableCell>{heading}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mostLinkSharingUsers.map((data) => (
            <TableRow key={data.value.name}>
              <TableCell component="th" scope="row">
                {data.value.name}
              </TableCell>
              <TableCell>{data.value.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

StatsTable.propTypes = {
  headings: arrayOf(string),
  mostLinkSharingUsers: arrayOf(string),
};

export default StatsTable;
