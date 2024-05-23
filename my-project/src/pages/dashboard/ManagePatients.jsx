import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { PatientService } from '../../data/PatientService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import PatientService from '../../service/PatientService';
import { Calendar } from 'primereact/calendar';
export function ManagePatients() {
    let emptyPatient = {
        patient_id: null,
        user_id:'',
        first_name: '',
        last_name: '',
        age: null,
        gender: '',
        date_of_birth: '',
        phone_number: '',
      };
      const [patients, setPatients] = useState(null);
      const [patientDialog, setPatientDialog] = useState(false);
      const [deletePatientDialog, setDeletePatientDialog] = useState(false);
      const [deletePatientsDialog, setDeletePatientsDialog] = useState(false);
      const [patient, setPatient] = useState(emptyPatient);
      const [selectedPatients, setSelectedPatients] = useState(null);
      const [submitted, setSubmitted] = useState(false);
      const [globalFilter, setGlobalFilter] = useState(null);
      const toast = useRef(null);
      const dt = useRef(null);
      const retrievePatients = () => {
        PatientService.getPatients()
          .then((response) => {
            setPatients(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const removePatient = (id) => {
          PatientService.deletePatient(id)
          .then((response) => {
            retrievePatients();
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      const updatePatient = (updatedPatient) => {
        PatientService.updatePatient(updatedPatient.id, updatedPatient)
          .then((response) => {
            console.log(response.data);
            retrievePatients();
          })
          .catch((error) => {
            console.log(error);
          });
      };
      useEffect(() => {
       retrievePatients();
      }, []);
      //JS for new btn
      const openNew = () => {
        setPatient(emptyPatient);
        setSubmitted(false);
        setPatientDialog(true);
      };
      const hideDialog = () => {
        setSubmitted(false);
        setPatientDialog(false);
      };
    
      const hideDeletePatientDialog = () => {
        setDeletePatientDialog(false);
      };
    
      const hideDeletePatientsDialog = () => {
        setDeletePatientsDialog(false);
      };
    
      //function for saving new patient
      const savePatient = () => {
        setSubmitted(true);
        if (patient.first_name.trim()) {
          let _patients = [...patients];
          let _patient = { ...patient };
    
          if (patient.patient_id) {
            const index = findIndexById(patient.patient_id);
    
            _patients[index] = _patient;
            console.log('update',_patient)
             updatePatient(index,_patient);
            toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Patient Updated',
              life: 3000,
            });
          } else {
            _patient.id = createId();
            _patients.push(_patient);
            toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Patient Created',
              life: 3000,
            });
          }
    
          setPatients(_patients);
          setPatientDialog(false);
          setPatient(emptyPatient);
        }
      };
    
      const editPatient = (patient) => {
        setPatient({ ...patient });
        setPatientDialog(true);
      };
    
      const confirmDeletePatient= (patient) =>{
        setPatient(patient);
        console.log(patient)
        setDeletePatientDialog(true);
      }
    
      const deletePatient = () => {
        let _patients = patients.filter(
          (val) => val.id !== patient.id,
        );
        console.log('78')
    
        setPatients(_patients);
        setDeletePatientDialog(false);
        setPatient(emptyPatient);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Patient Deleted',
          life: 3000,
        });
      };
      const findIndexById = (id) => {
        let index = -1;
    
        for (let i = 0; i < patients.length; i++) {
          if (patients[i].id === id) {
            index = i;
            break;
          }
        }
    
        return index;
      };
      const createId = () => {
        let id = '';
        let chars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return id;
      };
      const exportCSV = () => {
        dt.current.exportCSV();
      };
    
      const confirmDeleteSelected = () => {
        console.log("2")
     
        setDeletePatientsDialog(true);
        
      };
      const deleteSelectedPatients = () => {
        let _patients = patients.filter((val) => !selectedPatients.includes(val));
    
        setPatients(_patients);
        setDeletePatientsDialog(false);
        setSelectedPatients(null);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Patients Deleted',
          life: 3000,
        });
      };
    
      const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _patient = { ...patient };
    
        _patient[`${name}`] = val;
    
        setPatient(_patient);
      };
    
      const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _patient = { ...patient };
    
        _patient[`${name}`] = val;
    
        setPatient(_patient);
      };
    
      const onGenderChange = (e) => {
        let _patient = { ...patient };
    
        _patient['gender'] = e.value;
        setPatient(_patient);
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
              onClick={confirmDeleteSelected}
              disabled={!selectedPatients || !selectedPatients.length}
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
    
      const actionBodyTemplate = (rowData) => {
        return (
          <React.Fragment>
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              onClick={() => editPatient(rowData)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={() => confirmDeletePatient(rowData)}
            />
          </React.Fragment>
        );
      };
      const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 className="m-0">Manage Patients</h4>
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
      const patientDialogFooter = (
        <React.Fragment>
          <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" onClick={savePatient} />
        </React.Fragment>
      );
      const deletePatientDialogFooter = (
        <React.Fragment>
          <Button
            label="No"
            icon="pi pi-times"
            outlined
            onClick={hideDeletePatientDialog}
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            severity="danger"
            onClick={deletePatient}
          />
        </React.Fragment>
      );
      const deletePatientsDialogFooter = (
        <React.Fragment>
          <Button
            label="No"
            icon="pi pi-times"
            outlined
            onClick={hideDeletePatientsDialog}
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            severity="danger"
            onClick={deleteSelectedPatients}
          />
        </React.Fragment>
      );
    
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
            value={patients}
            selection={selectedPatients}
            onSelectionChange={(e) => setSelectedPatients(e.value)}
            dataKey="patient_id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} patients"
            globalFilter={globalFilter}
            header={header}
          >
            <Column selectionMode="multiple" exportable={false}></Column>
            <Column field="patient_id" header="Record Number" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="user_id" header="User ID" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="first_name" header="First Name" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="last_name" header="Last Name" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="age" header="Age" sortable style={{ minWidth: '8rem' }}></Column>
            <Column field="gender" header="Gender" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="date_of_birth" header="Date of Birth" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="phone_number" header="Phone Number" sortable style={{ minWidth: '12rem' }}></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
          </DataTable>
    
          <Dialog
          visible={patientDialog}
          style={{ width: '32rem' }}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
          header="Patient Details"
          modal
          className="p-fluid"
          footer={patientDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="user_id" className="font-bold">
              User ID
            </label>
            <InputText
              id="user_id"
              value={patient.user_id}
              onChange={(e) => onInputChange(e, 'user_id')}
              required
              autoFocus
              className={classNames({
                'p-invalid': submitted && !patient.user_id,
              })}
            />
            {submitted && !patient.user_id && (
              <small className="p-error">User ID is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="firstName" className="font-bold">
              First Name
            </label>
            <InputText
              id="first_name"
              value={patient.first_name}
              onChange={(e) => onInputChange(e, 'first_name')}
              required
              autoFocus
              className={classNames({
                'p-invalid': submitted && !patient.first_name,
              })}
            />
            {submitted && !patient.first_name && (
              <small className="p-error">First Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="last_name" className="font-bold">
              Last Name
            </label>
            <InputText
              id="last_name"
              value={patient.last_name}
              onChange={(e) => onInputChange(e, 'last_name')}
              required
              className={classNames({
                'p-invalid': submitted && !patient.last_name,
              })}
            />
            {submitted && !patient.last_name && (
              <small className="p-error">Last Name is required.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="age" className="font-bold">
              Age
            </label>
            <InputNumber
              id="age"
              value={patient.age}
              onValueChange={(e) => onInputNumberChange(e, 'age')}
            />
          </div>
          <div className="field">
            <label className="mb-3 font-bold">Gender</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="gender1"
                  name="gender"
                  value="Male"
                  onChange={onGenderChange}
                  checked={patient.gender === 'Male'}
                />
                <label htmlFor="gender1">Male</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="gender2"
                  name="gender"
                  value="Female"
                  onChange={onGenderChange}
                  checked={patient.gender === 'Female'}
                />
                <label htmlFor="gender2">Female</label>
              </div>
            </div>
          </div>
          <div className="field">
            <label htmlFor="date_of_birth" className="font-bold">
              Date of Birth
            </label>
            <Calendar
              id="date_of_birth"
              value={patient.date_of_birth}
              onChange={(e) => onInputChange(e, 'date_of_birth')}
              dateFormat="yy-mm-dd"
              showIcon
            />
          </div>
          <div className="field">
            <label htmlFor="phone_number" className="font-bold">
              Phone Number
            </label>
            <InputText
              id="phone_number"
              value={patient.phone_number}
              onChange={(e) => onInputChange(e, 'phone_number')}
            />
          </div>
        </Dialog>
            <Dialog
              visible={deletePatientDialog}
              style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }}
              header="Confirm"
              modal
              footer={deletePatientDialogFooter}
              onHide={hideDeletePatientDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: '2rem' }}
                />
                {patient && (
                  <span>
                    Are you sure you want to delete <b>{patient.firstName}</b>?
                  </span>
                )}
              </div>
            </Dialog>
    
            <Dialog
              visible={deletePatientsDialog}
              style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }}
              header="Confirm"
              modal
              footer={deletePatientsDialogFooter}
              onHide={hideDeletePatientsDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: '2rem' }}
                />
                {patient && (
                  <span>
                    Are you sure you want to delete the selected patients?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
  )
}

export default ManagePatients;