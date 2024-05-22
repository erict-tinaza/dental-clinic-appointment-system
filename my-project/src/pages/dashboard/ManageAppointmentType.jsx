import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import AppointmentTypeService from '../../service/AppointmentTypeService';

const ManageAppointmentTypes = () => {
    let emptyAppointmentType = {
        id: null,
        type: '',
        description: ''
    };

    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [appointmentTypeDialog, setAppointmentTypeDialog] = useState(false);
    const [deleteAppointmentTypeDialog, setDeleteAppointmentTypeDialog] = useState(false);
    const [deleteAppointmentTypesDialog, setDeleteAppointmentTypesDialog] = useState(false);
    const [appointmentType, setAppointmentType] = useState(emptyAppointmentType);
    const [selectedAppointmentTypes, setSelectedAppointmentTypes] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const retrieveServices=() =>{
        AppointmentTypeService.getAppointmentTypes()
        .then((response) =>{
            setAppointmentTypes(response.data);
        })
        .catch((error) => {
            console.log(error);
          });
    }   

    useEffect(() => {
       retrieveServices();
    }, []);

    const openNew = () => {
        setAppointmentType(emptyAppointmentType);
        setSubmitted(false);
        setAppointmentTypeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAppointmentTypeDialog(false);
    };

    const hideDeleteAppointmentTypeDialog = () => {
        setDeleteAppointmentTypeDialog(false);
    };

    const hideDeleteAppointmentTypesDialog = () => {
        setDeleteAppointmentTypesDialog(false);
    };

    const saveAppointmentType = () => {
        setSubmitted(true);

        if (appointmentType.type.trim()) {
            let _appointmentTypes = [...appointmentTypes];
            let _appointmentType = { ...appointmentType };

            if (appointmentType.id) {
                AppointmentTypeService.updateAppointmentType(appointmentType.id, _appointmentType).then((response) => {
                    const index = appointmentTypes.findIndex((a) => a.id === appointmentType.id);
                    _appointmentTypes[index] = response.data;
                    setAppointmentTypes(_appointmentTypes);
                    setAppointmentTypeDialog(false);
                    setAppointmentType(emptyAppointmentType);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Appointment Type Updated',
                        life: 3000,
                    });
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                AppointmentTypeService.createAppointmentType(_appointmentType).then((response) => {
                    _appointmentTypes.push(response.data);
                    setAppointmentTypes(_appointmentTypes);
                    setAppointmentTypeDialog(false);
                    setAppointmentType(emptyAppointmentType);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Appointment Type Created',
                        life: 3000,
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    };

    const editAppointmentType = (appointmentType) => {
        setAppointmentType({ ...appointmentType });
        setAppointmentTypeDialog(true);
    };

    const confirmDeleteAppointmentType = (appointmentType) => {
        setAppointmentType(appointmentType);
        setDeleteAppointmentTypeDialog(true);
    };

    const deleteAppointmentType = () => {
        AppointmentTypeService.deleteAppointmentType(appointmentType.id).then(() => {
            let _appointmentTypes = appointmentTypes.filter((val) => val.id !== appointmentType.id);
            setAppointmentTypes(_appointmentTypes);
            setDeleteAppointmentTypeDialog(false);
            setAppointmentType(emptyAppointmentType);
            toast.current.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Appointment Type Deleted',
                life: 3000,
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    const confirmDeleteSelectedAppointmentTypes = () => {
        setDeleteAppointmentTypesDialog(true);
    };

    const deleteSelectedAppointmentTypes = () => {
        let _appointmentTypes = appointmentTypes.filter((val) => !selectedAppointmentTypes.includes(val));
        setAppointmentTypes(_appointmentTypes);
        setDeleteAppointmentTypesDialog(false);
        setSelectedAppointmentTypes(null);
        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Appointment Types Deleted',
            life: 3000,
        });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _appointmentType = { ...appointmentType };
        _appointmentType[`${name}`] = val;
        setAppointmentType(_appointmentType);
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
                    onClick={confirmDeleteSelectedAppointmentTypes}
                    disabled={!selectedAppointmentTypes || !selectedAppointmentTypes.length}
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
            <h4 className="m-0">Manage Appointment Types</h4>
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

    const appointmentTypeDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveAppointmentType} />
        </React.Fragment>
    );

    const deleteAppointmentTypeDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteAppointmentTypeDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteAppointmentType}
            />
        </React.Fragment>
    );

    const deleteAppointmentTypesDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                outlined
                onClick={hideDeleteAppointmentTypesDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                severity="danger"
                onClick={deleteSelectedAppointmentTypes}
            />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editAppointmentType(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => confirmDeleteAppointmentType(rowData)}
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
                    value={appointmentTypes}
                    selection={selectedAppointmentTypes}
                    onSelectionChange={(e) => setSelectedAppointmentTypes(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} appointment types"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="type" header="Type" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="description" header="Description" sortable style={{ minWidth: '20rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={appointmentTypeDialog} style={{  width: '450px' }} header="Appointment Type Details" modal className="p-fluid" footer={appointmentTypeDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="type">Type</label>
                    <InputText id="type" value={appointmentType.type} onChange={(e) => onInputChange(e, 'type')} required autoFocus className={classNames({ 'p-invalid': submitted && !appointmentType.type })} />
                    {submitted && !appointmentType.type && <small className="p-invalid">Type is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={appointmentType.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} className={classNames({ 'p-invalid': submitted && !appointmentType.description })} />
                    {submitted && !appointmentType.description && <small className="p-invalid">Description is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteAppointmentTypeDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAppointmentTypeDialogFooter} onHide={hideDeleteAppointmentTypeDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {appointmentType && <span>Are you sure you want to delete <b>{appointmentType.type}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteAppointmentTypesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAppointmentTypesDialogFooter} onHide={hideDeleteAppointmentTypesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {appointmentTypes && <span>Are you sure you want to delete the selected appointment types?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default ManageAppointmentTypes;
