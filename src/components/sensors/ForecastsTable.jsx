import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ForecastsTable({ algorithms, measurements })
{
    const limitDecimalsWithoutRounding = (val, decimals) =>
    {
        let parts = val.toString().split(".");
        return parseFloat(parts[0] + "." + parts[1].substring(0, decimals));
    }

    return (
        <div>

            <TableContainer
                className={'mt-5'}
                component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>

                            {
                                algorithms.map(algorithm => (
                                    <TableCell

                                        key={algorithm.name}>
                                        {algorithm.name}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    {
                        measurements.map(measure => (
                            <TableBody>

                                <TableCell component="th" scope="row">
                                    {measure.hour}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {limitDecimalsWithoutRounding(measure.LSTM_Forecast, 2) + " Bq/m³"}
                                </TableCell>
                                {/* <TableCell component="th" scope="row">
                                    {measure.ARIMA_Forecast + " Bq/m³"}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {measure.Prophet_Forecast + " Bq/m³"}
                                </TableCell> */}
                            </TableBody>
                        ))
                    }
                </Table>
            </TableContainer>


        </div >
    )
}

export default ForecastsTable
