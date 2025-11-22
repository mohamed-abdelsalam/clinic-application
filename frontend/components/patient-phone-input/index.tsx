'use client';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PatinetPhoneInput({
  phone,
  setPhone
}: {
  phone: string,
  setPhone: (phone: string) => void,
}) {
  return (
    <PhoneInput
      enableSearch
      country={'eg'}
      value={phone}
      onChange={phone => setPhone(phone)}
    />
  );
}