'use client';
import { useState } from 'react';

import AbstractFormContainer from '@components/abstract-form-container';
import DatePicker from '@components/date-picker';
import PatinetNameInput from '@components/patient-name-input';
import SelectInput from '@components/select-input';
import PatinetEmailInput from '@components/patient-email-input';
import { Gender, DayFormat } from '@clinic-application/shared';
import PatinetJobInput from '@components/patient-job-input';
import PatinetPhoneInput from '@components/patient-phone-input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createPatient } from '@actions/patient';

export default function NewPatient() {

  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<Gender>();
  const [dateOfBirth, setDateOfBirth] = useState<string>(DayFormat(new Date()));
  const [email, setEmail] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPatient({
      name,
      dateOfBirth,
      email,
      gender,
      job,
      phone,
    }).then((patient) => {
      toast.success(`Patient created ${patient.id}`, {
        duration: 2000,
      });
      router.push(`/patient/${patient.id}`);
    })
    .catch((error) => {
      toast.error(`Failed to create patient ${error}`, {
        duration: 2000,
      });
    });
  };

  return (
    <AbstractFormContainer
      title='New Patient'
      handleSubmit={handleSubmit}
    >
      <div className='text-gray-600'>Patient Name</div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='p-1 rounded-lg text-xl border border-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm'
        placeholder={name}
      />
      <div className='text-gray-600'>Phone</div>
      <PatinetPhoneInput phone={phone} setPhone={setPhone} />
      <div className='text-gray-600'>Gender</div>
      <SelectInput<Gender> options={['Male', 'Female']} selected={gender} setSelected={setGender} />
      <div className='text-gray-600'>Birth Date</div>
      <DatePicker
        initialDate={dateOfBirth}
        onSelect={setDateOfBirth}
        startMonth='1900-01-01'
        endMonth={DayFormat(new Date())}
      />
      <div className='text-gray-600'>Email</div>
      <PatinetEmailInput email={email} setEmail={setEmail} />
      <div className='text-gray-600'>Job</div>
      <PatinetJobInput job={job} setJob={setJob} />
      <button
        type='submit'
        className='py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700'
      >
        Save
      </button>
    </AbstractFormContainer>
  );
}