
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card, List } from 'antd';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Frame from '../Frame/Frame';
import { Link, Switch, Route, Router } from 'react-router-dom';
import './user.css';
function User() {
    // const [selectedFiles, setSelectedFiles] = useState([]);

    // const handleCheckboxChange = (file) => {
    //     if (selectedFiles.includes(file)) {
    //         setSelectedFiles(selectedFiles.filter((f) => f !== file));
    //     } else {
    //         setSelectedFiles([...selectedFiles, file]);
    //     }
    // };
    const [file, setFile] = useState();
    const [docs, setDocs] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            console.log(file);
        }
    };

    function handleSubmit(event) {
        event.preventDefault()
        const url = `${process.env.API_LINK}upload`;
        const formData = new FormData();
        formData.append('doc', file);
        formData.append('name', file.name);
        formData.append('userid', localStorage.getItem('Name'));
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            console.log(url);
        });

    }

    const fetchDocsforID = async () => {
        const heads = {
            headers: {
                'mode': 'no-cors',
                'Access-Control-Allow_origin': '*',
            }
        }
        try {
            const response = await axios.get(`${process.env.API_LINK}alldocs/${localStorage.getItem('Name')}`, heads);
            setDocs(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDocsforID();
    }, []);




    return (

        <div className='boxx'>
            <form className='userform' onSubmit={handleSubmit}>
                <Button variant="contained" component="label" >
                    New File? Upload Here
                    <input hidden accept="image/*" multiple type="file" onChange={handleFileChange} />
                </Button>
                <br></br>
                <input className='sbmt' type="submit" />
            </form>
            <br></br>
            <Card className='cards' title="Uploaded Files">
            </Card>
            <TableContainer className='container' component={Paper} border={3}>
                <Table className='table' aria-label="simple table">
                    <TableHead sx={{
                        background: "#f2f2f274",
                    }}>
                        < TableRow sx={{
                            background: "#f2f2f274",
                        }} >
                            <TableCell className='tbcell' align='center'>Document Name</TableCell>
                            {/* <TableCell align='center'>Date of Upload</TableCell> */}
                            <TableCell className='tbcell' align='center'>Current Status</TableCell>
                            <TableCell className='tbcell' align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docs.map((doc) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{doc.name}</TableCell>
                                <TableCell align="center">{doc.status}</TableCell>
                                <TableCell align="center">
                                    <Link to={{
                                        pathname: "/frame",
                                        state: {
                                            dname: doc.name,
                                            hash: doc.hash,
                                        },
                                    }} underline="hover"
                                        style={{
                                            marginRight: "1.5rem",
                                            color: "blue",
                                        }}>{`View Doc`}</Link>
                                    {/* <Switch>
                                        <Route path='/frame' exact component={Frame} >View Docs</Route>
                                    </Switch> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div >
    );
}

export default User;
