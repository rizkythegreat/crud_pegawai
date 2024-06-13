import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle } from '@mui/material';
import UserFormDialogContent from './UserFormDialogContent';
import UserFormDialogActions from './UserFormDialogActions';
import { createUser, updateUser } from '../redux/thunks/userThunks';
import { fetchProvinces, fetchRegencies, fetchDistricts, fetchVillages } from '../redux/thunks/regionThunks';

const UserForm = ({ open, handleClose, initialData }) => {
    const dispatch = useDispatch();
    const provinces = useSelector((state) => state.user.provinces);
    const regencies = useSelector((state) => state.user.regencies);
    const districts = useSelector((state) => state.user.districts);
    const villages = useSelector((state) => state.user.villages);

    const [isDataReady, setIsDataReady] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        nama: '',
        jalan: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
    });

    useEffect(() => {
        if (open) {
            dispatch(fetchProvinces());
            if (initialData) {
                setFormData({
                    id: initialData.id || '',
                    nama: initialData.nama || '',
                    jalan: initialData.jalan || '',
                    provinsi: initialData.provinsi?.id || '',
                    kabupaten: initialData.kabupaten?.id || '',
                    kecamatan: initialData.kecamatan?.id || '',
                    kelurahan: initialData.kelurahan?.id || ''
                });
            } else {
                setFormData({
                    id: '',
                    nama: '',
                    jalan: '',
                    provinsi: '',
                    kabupaten: '',
                    kecamatan: '',
                    kelurahan: ''
                });
            }
            setIsDataReady(true);
        }
    }, [open, initialData, dispatch]);

    useEffect(() => {
        if (formData.provinsi) {
            dispatch(fetchRegencies(formData.provinsi));
        }

        if (formData.kabupaten) {
            dispatch(fetchDistricts(formData.kabupaten));
        }

        if (formData.kecamatan) {
            dispatch(fetchVillages(formData.kecamatan));
        }
    }, [formData.provinsi, formData.kabupaten, formData.kecamatan, dispatch]);


    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setIsDataReady(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setIsDataReady(false);
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProvinceChange = (event, value) => {
        if (value) {
            setFormData(prevState => ({
                ...prevState,
                provinsi: value.id,
                kabupaten: '',
                kecamatan: '',
                kelurahan: ''
            }));
            dispatch(fetchRegencies(value.id));
        } else {
            setFormData(prevState => ({
                ...prevState,
                provinsi: '',
                kabupaten: '',
                kecamatan: '',
                kelurahan: ''
            }))
        }
    };

    const handleRegencyChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            kabupaten: value,
            kecamatan: '',
            kelurahan: ''
        }));
        dispatch(fetchDistricts(value));
    };

    const handleDistrictChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            kecamatan: value,
            kelurahan: ''
        }));
        dispatch(fetchVillages(value));
    };

    const handleSubmit = () => {
        const { id, nama, jalan, provinsi, kabupaten, kecamatan, kelurahan } = formData;
        if (!nama || !jalan || !provinsi || !kabupaten || !kecamatan || !kelurahan) {
            alert("Please fill in all fields.");
            return;
        }
        const selectedProvince = provinces.find((province) => province.id === formData.provinsi);
        const selectedRegency = regencies.find((regency) => regency.id === formData.kabupaten);
        const selectedDistrict = districts.find((district) => district.id === formData.kecamatan);
        const selectedVillage = villages.find((village) => village.id === formData.kelurahan);

        const dataToSend = {
            id: id,
            nama: nama,
            provinsi: selectedProvince,
            kabupaten: selectedRegency,
            kecamatan: selectedDistrict,
            kelurahan: selectedVillage,
            jalan: jalan
        };
        if (id) {
            dispatch(updateUser({ id: id, updatedUser: dataToSend }));
        } else {
            dispatch(createUser(dataToSend));
        }
        handleClose();
    };

    return (
        <Dialog open={open && isDataReady} onClose={handleClose}>
            <DialogTitle>{!initialData ? 'Add New User' : 'Edit User'}</DialogTitle>
            <UserFormDialogContent
                formData={formData}
                provinces={provinces}
                regencies={regencies}
                districts={districts}
                villages={villages}
                handleChange={handleChange}
                handleProvinceChange={handleProvinceChange}
                handleRegencyChange={handleRegencyChange}
                handleDistrictChange={handleDistrictChange}
            />
            <UserFormDialogActions
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                initialData={initialData}
            />
        </Dialog>
    );
};

export default UserForm;
