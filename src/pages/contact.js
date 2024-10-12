import Layout from "@/layout/layout";
import styles from "@/styles/Contact.module.css";

const contactInfo = {
  fone: '+55 42 12345-5678',
  email: 'contato@q-delicia.com.br',
  endereço: 'Rua Pinda Moiangaba, 123, Laranjeiras do Sul, PR',
  redesSociais: {
    facebook: 'https://www.facebook.com/qdelicia',
    instagram: 'https://www.instagram.com/qdelicia',
  },
  responsáveis: [
    {
      nome: 'Ruan Kysa Mendes Bueno',
      cargo: 'Gerente',
      fone: '+55 42 99999-9999',
      email: 'engs-ruanbueno@camporeal.edu.br',
    },
    {
      nome: 'Renann Felipe Volff',
      cargo: 'Assistente',
      fone: '+55 42 98419-0623',
      email: 'engs-renannvolff@camporeal.edu.br',
    },
  ],
};

export default function Contact() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Contato</h1>
        <ul className={styles.list}>
          <li className={styles.listItem}>Telefone: {contactInfo.fone}</li>
          <li className={styles.listItem}>E-mail: {contactInfo.email}</li>
          <li className={styles.listItem}>Endereço: {contactInfo.address}</li>
          <li className={styles.listItem}>Social Media:
            <ul className={styles.list}>
              {/* <li className={styles.listItem}>
                <a className={styles.link} href={contactInfo.socialMedia.facebook}>Facebook</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.link} href={contactInfo.socialMedia.instagram}>Instagram</a>
              </li> */}
            </ul>
          </li>
          <li className={styles.listItem}>Responsáveis:</li>
          <ul className={styles.list}>
            {contactInfo.responsáveis.map((person, index) => (
              <li key={index} className={styles.listItem}>
                {person.nome} ({person.cargo})
                <ul className={styles.list}>
                  <li className={styles.listItem}>Telefone: {person.fone}</li>
                  <li className={styles.listItem}>E-mail: {person.email}</li>
                </ul>
              </li>
            ))}
          </ul>
          <li className={styles.listItem}>
            <button className={styles.ctaButton}
              onClick={() => {
                window.open(`https://wa.me/${contactInfo.fone}`, '_blank');
              }}
            >
              Contato via WhatsApp
            </button>
          </li>
        </ul>
      </div>
    </Layout>
  );
}