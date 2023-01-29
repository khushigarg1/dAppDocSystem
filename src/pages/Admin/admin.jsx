// import React from "react";
// import { Card, List } from 'antd';
// import { Button } from 'antd';
// import { CheckOutlined } from '@ant-design/icons';
// import { CloseOutlined } from '@ant-design/icons';

// function Admin({ files }) {
//     return (
//         <div>
//             <Card title="Not Assigned Yet">
//                 <List
//                     dataSource={files}
//                     renderItem={(file) => (
//                         <List.Item>
//                             {file.name}.{file.type}
//                             <button>Verify</button>
//                             <button>Reject</button>
//                         </List.Item>
//                     )}
//                 />
//             </Card>
//             <Card title="Rejected Files">
//                 <List
//                     dataSource={files}
//                     renderItem={(file) => (
//                         <List.Item>
//                             {file.name}.{file.type}
//                             <Button disabled type="danger" shape="round" icon={<CloseOutlined />}>
//                                 Rejected
//                             </Button>
//                         </List.Item>
//                     )}
//                 />
//             </Card>
//             <Card title="verified Files">
//                 <List
//                     dataSource={files}
//                     renderItem={(file) => (
//                         <List.Item>
//                             {file.name}.{file.type}
//                             <Button disabled type="primary" shape="round" icon={<CheckOutlined />}>
//                                 Verified
//                             </Button>
//                         </List.Item>
//                     )}
//                 />


//             </Card>
//         </div>
//     )
// };
// export default Admin;


import React from "react";
import { Card, List } from 'antd';
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './admin.css';
function Admin() {

    const [docs, setDocs] = useState([]);

    const handleVerify = async (hash) => {
        const config = {
            'username': localStorage.getItem('Name'),
        };
        const response = await axios.patch(`${process.env.API_LINK}verify/${hash}`, config);
        // alert(`${response.msg}`);
    }

    const handleReject = async (hash) => {
        const config = {
            'username': localStorage.getItem('Name'),
        };
        const response = await axios.patch(`${process.env.API_LINK}reject/${hash}`, config);
        const data = response.json();
        // alert(`${data.msg}`);
    }


    const fetchDocs = async () => {
        const heads = {
            headers: {
                'mode': 'no-cors',
                'Access-Control-Allow_origin': '*',
            }
        }
        try {
            const response = await axios.get(`${process.env.API_LINK}alldocs`, heads);
            setDocs(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDocs();
    }, []);


    return (
        <div className="divcontainer">
            <Card className="cardcontain" title="Documents Data">
            </Card>

            <TableContainer className='container' component={Paper} border={3}>
                <Table className='table table2' sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{
                        background: "#f2f2f274",
                    }}>
                        <TableRow sx={{
                            background: "#f2f2f274",
                        }}>
                            <TableCell className='tbcell' align='center'>Document Name</TableCell>
                            {/* <TableCell align='center'>Date of Upload</TableCell> */}
                            <TableCell className='tbcell' align='center'>Created By</TableCell>
                            <TableCell className='tbcell' align='center'>Verified By</TableCell>
                            <TableCell className='tbcell' align='center'>Status</TableCell>
                            <TableCell className='tbcell' align='center'></TableCell>
                            <TableCell className='tbcell' align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="doctable">
                        {docs.map((doc) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{doc.name}</TableCell>
                                <TableCell align="center">{doc.created_by}</TableCell>
                                <TableCell align="center">{doc.verified_by}</TableCell>
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
                                <TableCell align="center"><Button size="medium" variant="contained" color="success" onClick={() => handleVerify(doc.hash)}>
                                    Success
                                </Button>
                                    <Button size="medium" variant="outlined" color="error" onClick={() => handleReject(doc.hash)}>
                                        Error
                                    </Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
};
export default Admin;

