import ContactInfo from '../components/ContactInfo';

function ContactsPage() {
  return (
    <div className="container">
      <section className="contacts my-3">
        <h2 className="text-center">Контакты</h2>
        <ContactInfo />
      </section>
    </div>
  );
}

export default ContactsPage;