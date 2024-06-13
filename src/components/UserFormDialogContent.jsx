import React from 'react';
import { TextField, Autocomplete, MenuItem, DialogContent } from '@mui/material';

const UserFormDialogContent = ({
    formData,
    provinces,
    regencies,
    districts,
    villages,
    handleChange,
    handleProvinceChange,
    handleRegencyChange,
    handleDistrictChange
}) => {
    return (
        <DialogContent className='user-form-dialog-content'>
            <TextField
                autoFocus
                margin="dense"
                name="nama"
                label="Nama"
                type="text"
                fullWidth
                value={formData.nama}
                required
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                name="jalan"
                label="Jalan"
                type="text"
                fullWidth
                required
                value={formData.jalan}
                onChange={handleChange}
            />
            <Autocomplete
                options={provinces}
                getOptionLabel={(option) => option.name}
                onChange={handleProvinceChange}
                value={provinces.find((province) => province.id === formData.provinsi) || null}
                renderInput={(params) => <TextField {...params} label="Provinsi" fullWidth />}
                fullWidth
                aria-required
            />
            <TextField
                select
                required
                margin="dense"
                name="kabupaten"
                label="Kabupaten"
                fullWidth
                value={formData.kabupaten}
                onChange={handleRegencyChange}
                disabled={!formData.provinsi}
            >
                {regencies.map((regency) => (
                    <MenuItem key={regency.id} value={regency.id}>
                        {regency.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                required
                select
                margin="dense"
                name="kecamatan"
                label="Kecamatan"
                fullWidth
                value={formData.kecamatan}
                onChange={handleDistrictChange}
                disabled={!formData.kabupaten}
            >
                {districts.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                        {district.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                margin="dense"
                name="kelurahan"
                label="Kelurahan"
                fullWidth
                value={formData.kelurahan}
                onChange={handleChange}
                disabled={!formData.kecamatan}
            >
                {villages.map((village) => (
                    <MenuItem key={village.id} value={village.id}>
                        {village.name}
                    </MenuItem>
                ))}
            </TextField>
        </DialogContent>
    );
};

export default UserFormDialogContent;
