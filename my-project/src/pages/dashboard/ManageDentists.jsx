import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import DentistService from '../../service/DentistService';

const ManageDentists = () => {
    let emptyDentist = {
        dentist_id: null,
        user_id: '',
        license_number: '',
        first_name: '',
        last_name: '',
        years_of_experience: null,
        specialization: '',
        is_available: '',
        bio: '',
    };

    const [dentists, setDentists] = useState([]);
    const [dentistDialog, setDentistDialog] = useState(false);
    const [deleteDentistDialog, setDeleteDentistDialog] = useState(false);
    const [deleteDentistsDialog, setDeleteDentistsDialog] = useState(false);
    const [dentist, setDentist] = useState(emptyDentist);
    const [selectedDentists, setSelectedDentists] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);


    const retrieveDentists = () => {
        DentistService.getDentists()
          .then((response) => {
            setDentists(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
      };
    useEffect(() => {
        retrieveDentists();
    }, []);

    const openNew = () => {
        setDentist(emptyDentist);
        setSubmitted(false);
        setDentistDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDentistDialog(false);
    };

    const hideDeleteDentistDialog = () => {
        setDeleteDentistDialog(false);
    };

    const hideDeleteDentistsDialog = () => {
        setDeleteDentistsDialog(false);
    };

    const saveDentist = () => {
        setSubmitted(true);

        if (dentist.first_name.trim() && dentist.last_name.trim()) {
            let _dentists = [...dentists];
            let _dentist = { ...dentist };

            if (dentist.dentist_id) {
                DentistService.updateDentist(dentist.dentist_id, _dentist)
                    .then((response) => {
                        const index = dentists.findIndex((d) => d.dentist_id === dentist.dentist_id);
                        _dentists[index] = response.data;
                        setDentists(_dentists);
                        setDentistDialog(false);
                        setDentist(emptyDentist);
                        toast.current.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Dentist Updated',
                            life: 3000,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                DentistService.createDentist(_dentist)
                    .then((response) => {
                        _dentists.push(response.data);
                        setDentists(_dentists);
                        setDentistDialog(false);
                        setDentist(emptyDentist);
                        toast.current.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Dentist Created',
                            life: 3000,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    const editDentist = (dentist) => {
        setDentist({ ...dentist });
        setDentistDialog(true);
    };

    const confirmDeleteDentist = (dentist) => {
        setDentist(dentist);
        setDeleteDentistDialog(true);
    };

    const deleteDentist = () => {
        DentistService.deleteDentist(dentist.dentist_id)
            .then(() => {
                let _dentists = dentists.filter((val) => val.dentist_id !== dentist.dentist_id);
                setDentists(_dentists);
                setDeleteDentistDialog(false);
                setDentist(emptyDentist);
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Dentist Deleted',
                    life: 3000,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const confirmDeleteSelectedDentists = () => {
        setDeleteDentistsDialog(true);
    };

    const deleteSelectedDentists = () => {
        let _dentists = dentists.filter((val) => !selectedDentists.includes(val));
        setDentists(_dentists);
        setDeleteDentistsDialog(false);
        setSelectedDentists(null);
        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Dentists Deleted',
            life: 3000,
        });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _dentist = { ...dentist };
        _dentist[`${name}`] = val;
        setDentist(_dentist);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _dentist = { ...dentist };
        _dentist[`${name}`] = val;
        setDentist(_dentist);
    };

    const onAvailabilityChange = (e) => {
        let _dentist = { ...dentist };
        _dentist['is_available'] = e.value;
        setDentist(_dentist);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button
                    label="New"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                />
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelectedDentists}
                    disabled={!selectedDentists || !selectedDentists.length}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Export"
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportCSV}
            />
        );
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Dentists</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const dentistDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveDentist} />
        </React.Fragment>
    );

    const deleteDentistDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteDentistDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteDentist}
            />
        </React.Fragment>
    );

    const deleteDentistsDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteDentistsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteSelectedDentists}
            />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editDentist(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmDeleteDentist(rowData)}
                />
            </React.Fragment>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={leftToolbarTemplate}
                    right={rightToolbarTemplate}
                ></Toolbar>

                <DataTable
                    ref={dt}
                    value={dentists}
                    selection={selectedDentists}
                    onSelectionChange={(e) => setSelectedDentists(e.value)}
                    dataKey="dentist_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dentists"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="dentist_id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="user_id" header="User ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="license_number" header="License Number" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="first_name" header="First Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="last_name" header="Last Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="years_of_experience" header="Years of Experience" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="specialization" header="Specialization" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="is_available" header="Availability" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="bio" header="Bio" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={dentistDialog} style={{ width: '450px' }} header="Dentist Details" modal className="p-fluid" footer={dentistDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="user_id">User ID</label>
                    <InputText id="user_id" value={dentist.user_id} onChange={(e) => onInputChange(e, 'user_id')} required autoFocus className={classNames({ 'p-invalid': submitted && !dentist.user_id })} />
                    {submitted && !dentist.user_id && <small className="p-invalid">User ID is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="license_number">License Number</label>
                    <InputText id="license_number" value={dentist.license_number} onChange={(e) => onInputChange(e, 'license_number')} required className={classNames({ 'p-invalid': submitted && !dentist.license_number })} />
                    {submitted && !dentist.license_number && <small className="p-invalid">License Number is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="first_name">First Name</label>
                    <InputText id="first_name" value={dentist.first_name} onChange={(e) => onInputChange(e, 'first_name')} required className={classNames({ 'p-invalid': submitted && !dentist.first_name })} />
                    {submitted && !dentist.first_name && <small className="p-invalid">First Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="last_name">Last Name</label>
                    <InputText id="last_name" value={dentist.last_name} onChange={(e) => onInputChange(e, 'last_name')} required className={classNames({ 'p-invalid': submitted && !dentist.last_name })} />
                    {submitted && !dentist.last_name && <small className="p-invalid">Last Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="years_of_experience">Years of Experience</label>
                    <InputNumber id="years_of_experience" value={dentist.years_of_experience} onValueChange={(e) => onInputNumberChange(e, 'years_of_experience')} required className={classNames({ 'p-invalid': submitted && !dentist.years_of_experience })} />
                    {submitted && !dentist.years_of_experience && <small className="p-invalid">Years of Experience is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="specialization">Specialization</label>
                    <InputText id="specialization" value={dentist.specialization} onChange={(e) => onInputChange(e, 'specialization')} required className={classNames({ 'p-invalid': submitted && !dentist.specialization })} />
                    {submitted && !dentist.specialization && <small className="p-invalid">Specialization is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="is_available">Availability</label>
                    <div className="formgroup-inline">
                        <div className="field-radiobutton">
                            <RadioButton inputId="available" name="is_available" value="Available" onChange={onAvailabilityChange} checked={dentist.is_available === 'Available'} />
                            <label htmlFor="available">Available</label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton inputId="unavailable" name="is_available" value="Unavailable" onChange={onAvailabilityChange} checked={dentist.is_available === 'Unavailable'} />
                            <label htmlFor="unavailable">Unavailable</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="bio">Bio</label>
                    <InputTextarea id="bio" value={dentist.bio} onChange={(e) => onInputChange(e, 'bio')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteDentistDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDentistDialogFooter} onHide={hideDeleteDentistDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {dentist && <span>Are you sure you want to delete <b>{dentist.first_name} {dentist.last_name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteDentistsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDentistsDialogFooter} onHide={hideDeleteDentistsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {dentists && <span>Are you sure you want to delete the selected dentists?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default ManageDentists;
