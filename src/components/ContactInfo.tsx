import { memo } from 'react';
import { PHONE, EMAIL, ADDRESS } from '../constants';

const ContactInfo = memo(function ContactInfo() {
  return (
    <>
      <a className="d-block" href={`tel:${PHONE.replace(/\D/g, '')}`}>{PHONE}</a>
      <a className="d-block" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <span className="d-block">{ADDRESS}</span>
    </>
  );
});

export default ContactInfo;