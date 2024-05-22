import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import AppointmentService from '../../service/AppointmentService';
import { Calendar } from 'primereact/calendar';

export function ManageAppointments() {
    let emptyAppointment = {
        appointment_id: null,
        user_id: null,
        appointment_type_id: null,
        date: '',
        time: '',
        status: '',
        notes: '',
        created_at: '',
    };

    const [appointments, setAppointments] = useState(null);
    const [appointmentDialog, setAppointmentDialog] = useState(false);
    const [deleteAppointmentDialog, setDeleteAppointmentDialog] = useState(false);
    const [deleteAppointmentsDialog, setDeleteAppointmentsDialog] = useState(false);
    const [appointment, setAppointment] = useState(emptyAppointment);
    const [selectedAppointments, setSelectedAppointments] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const retrieveAppointments = () => {
        AppointmentService.getAppointments()
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        retrieveAppointments();
    }, []);

    const openNew = () => {
        setAppointment(emptyAppointment);
        setSubmitted(false);
        setAppointmentDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAppointmentDialog(false);
    };

    const hideDeleteAppointmentDialog = () => {
        setDeleteAppointmentDialog(false);
    };

    const hideDeleteAppointmentsDialog = () => {
        setDeleteAppointmentsDialog(false);
    };

    const saveAppointment = () => {
        setSubmitted(true);

        if (appointment.date.trim() && appointment.time.trim()) {
            let _appointments = [...appointments];
            let _appointment = { ...appointment };

            if (appointment.appointment_id) {
                const index = findIndexById(appointment.appointment_id);
                _appointments[index] = _appointment;
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Appointment Updated',
                    life: 3000,
                });
            } else {
                _appointment.appointment_id = createId();
                _appointments.push(_appointment);
                toast.current.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Appointment Created',
                    life: 3000,
                });
            }

            setAppointments(_appointments);
            setAppointmentDialog(false);
            setAppointment(emptyAppointment);
        }
    };

    const editAppointment = (appointment) => {
        setAppointment({ ...appointment });
        setAppointmentDialog(true);
    };

    const confirmDeleteAppointment = (appointment) => {
        setAppointment(appointment);
        setDeleteAppointmentDialog(true);
    };

    const deleteAppointment = () => {
        let _appointments = appointments.filter((val) => val.appointment_id !== appointment.appointment_id);

        setAppointments(_appointments);
        setDeleteAppointmentDialog(false);
        setAppointment(emptyAppointment);
        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Appointment Deleted',
            life: 3000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < appointments.length; i++) {
            if (appointments[i].appointment_id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteAppointmentsDialog(true);
    };

    const deleteSelectedAppointments = () => {
        let _appointments = appointments.filter((val) => !selectedAppointments.includes(val));

        setAppointments(_appointments);
        setDeleteAppointmentsDialog(false);
        setSelectedAppointments(null);
        toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Appointments Deleted',
            life: 3000,
        });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _appointment = { ...appointment };
        _appointment[`${name}`] = val;
        setAppointment(_appointment);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _appointment = { ...appointment };
        _appointment[`${name}`] = val;
        setAppointment(_appointment);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={confirmDeleteSelected}
                    disabled={!selectedAppointments || !selectedAppointments.length}
                />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editAppointment(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteAppointment(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Appointments</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const appointmentDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveAppointment} />
        </React.Fragment>
    );

    const deleteAppointmentDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAppointmentDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteAppointment} />
        </React.Fragment>
    );

    const deleteAppointmentsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAppointmentsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedAppointments} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    ref={dt}
                    value={appointments}
                    selection={selectedAppointments}
                    onSelectionChange={(e) => setSelectedAppointments(e.value)}
                    dataKey="appointment_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} appointments"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="appointment_id" header="Appointment ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="user_id" header="User ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="appointment_type_id" header="Type ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="date" header="Date" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="time" header="Time" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="status" header="Status" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="notes" header="Notes" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>

                <Dialog
                    visible={appointmentDialog}
                    style={{ width: '32rem' }}
                    breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    header="Appointment Details"
                    modal
                    className="p-fluid"
                    footer={appointmentDialogFooter}
                    onHide={hideDialog}
                >
                    <div className="field">
                        <label htmlFor="user_id" className="font-bold">
                            User ID
                        </label>
                        <InputText
                            id="user_id"
                            value={appointment.user_id}
                            onChange={(e) => onInputChange(e, 'user_id')}
                            required
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && !appointment.user_id })}
                        />
                        {submitted && !appointment.user_id && <small className="p-error">User ID is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="appointment_type_id" className="font-bold">
                            Appointment Type ID
                        </label>
                        <InputText
                            id="appointment_type_id"
                            value={appointment.appointment_type_id}
                            onChange={(e) => onInputChange(e, 'appointment_type_id')}
                            required
                            className={classNames({ 'p-invalid': submitted && !appointment.appointment_type_id })}
                        />
                        {submitted && !appointment.appointment_type_id && (
                            <small className="p-error">Appointment Type ID is required.</small>
                        )}
                    </div>
                    <div className="field">
                        <label htmlFor="date" className="font-bold">
                            Date
                        </label>
                        <Calendar
                            id="date"
                            value={appointment.date}
                            onChange={(e) => onInputChange(e, 'date')}
                            dateFormat="yy-mm-dd"
                            showIcon
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="time" className="font-bold">
                            Time
                        </label>
                        <InputText
                            id="time"
                            value={appointment.time}
                            onChange={(e) => onInputChange(e, 'time')}
                            required
                            className={classNames({ 'p-invalid': submitted && !appointment.time })}
                        />
                        {submitted && !appointment.time && <small className="p-error">Time is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="status" className="font-bold">
                            Status
                        </label>
                        <InputText
                            id="status"
                            value={appointment.status}
                            onChange={(e) => onInputChange(e, 'status')}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="notes" className="font-bold">
                            Notes
                        </label>
                        <InputTextarea
                            id="notes"
                            value={appointment.notes}
                            onChange={(e) => onInputChange(e, 'notes')}
                            rows={3}
                            cols={20}
                        />
                    </div>
                </Dialog>

                <Dialog
                    visible={deleteAppointmentDialog}
                    style={{ width: '32rem' }}
                    breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    header="Confirm"
                    modal
                    footer={deleteAppointmentDialogFooter}
                    onHide={hideDeleteAppointmentDialog}
                >
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {appointment && (
                            <span>
                                Are you sure you want to delete the appointment scheduled for{' '}
                                <b>{appointment.date}</b> at <b>{appointment.time}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>

                <Dialog
                    visible={deleteAppointmentsDialog}
                    style={{ width: '32rem' }}
                    breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                    header="Confirm"
                    modal
                    footer={deleteAppointmentsDialogFooter}
                    onHide={hideDeleteAppointmentsDialog}
                >
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {appointment && <span>Are you sure you want to delete the selected appointments?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default ManageAppointments;
