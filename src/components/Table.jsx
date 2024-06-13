import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { fetchUsers, deleteUser } from '../redux/thunks/userThunks';
import UserForm from './UserForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DataTable = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.data);
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleAddUser = () => {
        setCurrentUser(null);
        setOpen(true);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentUser(null);
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nama', headerName: 'Nama', width: 150 },
        { field: 'jalan', headerName: 'Jalan', width: 150 },
        {
            field: 'provinsi', headerName: 'Provinsi', width: 150,
            renderCell: (params) => params.row.provinsi?.name || ''
        },
        {
            field: 'kabupaten', headerName: 'Kabupaten', width: 150,
            renderCell: (params) => params.row.kabupaten?.name || ''
        },
        {
            field: 'kecamatan', headerName: 'Kecamatan', width: 150,
            renderCell: (params) => params.row.kecamatan?.name || ''
        },
        {
            field: 'kelurahan', headerName: 'Kelurahan', width: 150,
            renderCell: (params) => params.row.kelurahan?.name || ''
        },
        {
            field: 'actions',
            headerName: 'Aksi',
            width: 120,
            sortable: false,
            resizable: false,
            type: "actions",
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}><EditIcon fontSize='small' sx={{ color: "#3C5B6F" }} /></IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon fontSize='small' sx={{ color: "#153448" }} /></IconButton>
                </>
            )
        }
    ];

    return (
        <div style={{ height: 370, width: '100%' }}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </div>
            ) : (
                <DataGrid
                    responsive
                    sx={{
                        [`& .${gridClasses.row}`]: {
                            textTransform: 'capitalize',
                        },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    rows={users}
                    columns={columns}
                    pageSize={5}
                />
            )}
            <UserForm open={open} handleClose={handleClose} initialData={currentUser} />
            <Button style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', fontSize: '12px' }} variant="contained" sx={{ backgroundColor: "#153448", ":hover": { backgroundColor: "#3C5B6F" } }} onClick={handleAddUser}>Tambah Pegawai</Button>
        </div>
    );
};

export default DataTable;
