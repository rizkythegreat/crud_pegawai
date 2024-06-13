export const handleChange = (formData, setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

export const handleProvinceChange = (formData, setFormData, dispatch, fetchRegencies) => (event, value) => {
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
        }));
    }
};

export const handleRegencyChange = (formData, setFormData, dispatch, fetchDistricts) => (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        kabupaten: value,
        kecamatan: '',
        kelurahan: ''
    }));
    dispatch(fetchDistricts(value));
};

export const handleDistrictChange = (formData, setFormData, dispatch, fetchVillages) => (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        kecamatan: value,
        kelurahan: ''
    }));
    dispatch(fetchVillages(value));
};

export const handleSubmit = (formData, provinces, regencies, districts, villages, dispatch, createUser, updateUser, handleClose) => () => {
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
