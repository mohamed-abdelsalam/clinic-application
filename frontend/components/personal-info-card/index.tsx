'use client';

import { useState } from 'react';

import { Gender, PatientDto, UpdatePatientDto } from '@clinic-application/shared';
import PatinetPhoneInput from '@components/patient-phone-input';
import SelectInput from '@components/select-input';
import { deletePatient } from '@actions/patient';
import toast from 'react-hot-toast';

export interface PersonalInfoCardProps {
  patient: PatientDto;
  onSave: (updatePatientDto: UpdatePatientDto) => void;
}

export default function PersonalInfoCard({ patient, onSave }: PersonalInfoCardProps) {
  const [updatePatientDto, setUpdatePatient] = useState<UpdatePatientDto>({
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    email: patient.email,
    phone: patient.phone,
    job: patient.job
  });
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleCancel = () => {
    setUpdatePatient({
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      email: patient.email,
      phone: patient.phone,
      job: patient.job
    });
    setEditMode(false);
  };

  const handleDelete = async () => {
    deletePatient(patient.id);
    toast.success('Patient deleted');
    
  };

  const handleSave = () => {
    setEditMode(false);
    onSave(updatePatientDto);
  };

  const PatientName = (
    <div className='flex flex-row gap-2'>
    <label className='font-semibold text-gray-600'>Patient Name:</label>
      {editMode ?
        (<input className='border w-9/12' value={updatePatientDto.name} onChange={(e) => setUpdatePatient({...updatePatientDto, name: e.target.value})} />)
        : 
        (<p>{patient.name}</p>)}
    </div>
  );

  const PatientGender = (
    <div className='flex flex-row gap-2'>
      <label className='font-semibold text-gray-600'>Gender:</label>
        {editMode ?
          (<SelectInput<Gender> 
            options={['Male', 'Female']}
            selected={updatePatientDto.gender}
            setSelected={(value) => {setUpdatePatient({...updatePatientDto, gender: value })}}
          />)
          : 
          (<p>{patient.gender}</p>)}
    </div>
  );

  return (
    <div className='border p-2 flex flex-col gap-2'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-xl font-semibold text-gray-700 mb-3'>Personal Information</h1>
        {PatientName}
        <p>Date Of Birth: {patient.dateOfBirth}</p>
        {PatientGender}
        <div className='flex flex-row gap-2'>
          <div className='font-semibold text-gray-600'>Phone Number:</div>
          {editMode ?
            (<PatinetPhoneInput phone={updatePatientDto.phone} setPhone={(phone) => {setUpdatePatient({...updatePatientDto, phone })}} />)
            : 
            (<p>{patient.phone}</p>)}
        </div>
        <div className='flex flex-row gap-2'>
          <label className='font-semibold text-gray-600'>Job:</label>
            {editMode ?
              (<input className='border w-9/12' value={updatePatientDto.job} onChange={(e) => setUpdatePatient({...updatePatientDto, job: e.target.value})} />)
              : 
              (<p>{patient.job}</p>)}
        </div>
        <div className='flex flex-row gap-2'>
          <label className='font-semibold text-gray-600'>Email:</label>
            {editMode ?
              (<input className='border w-9/12' value={updatePatientDto.email} onChange={(e) => setUpdatePatient({...updatePatientDto, email: e.target.value})} />)
              : 
              (<p>{patient.email}</p>)}
        </div>
        <div className='flex flex-row gap-2'>
          <label className='font-semibold text-gray-600'>Registered At:</label>
          <p>{patient.registeredAt.toString()}</p>
        </div>
      </div>
      <div className='flex flex-row-reverse gap-2'>
        {editMode ? (<button className='p-2 border bg-green-500 hover:bg-green-700 hover:shadow-sm rounded' onClick={handleSave}>Save</button>) : null}
        {editMode ? (<button className='p-2 border bg-blue-500 hover:bg-blue-700 hover:shadow-sm rounded' onClick={handleCancel}>Cancel</button>) : null}
        {!editMode ? (<button className='p-2 border bg-blue-500 hover:bg-blue-700 hover:shadow-sm rounded' onClick={(e) => setEditMode(true)}>Edit</button>) : null}
        <button className='p-2 border bg-gray-100 hover:bg-red-700 hover:shadow-sm rounded' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}