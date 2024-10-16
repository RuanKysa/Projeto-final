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
        <h1 className={styles.title}>Fale Conosco</h1>
        
        <div className={styles.contactDetails}>
          <h2 className={styles.subtitle}>Informações de Contato</h2>
          <p><strong>Telefone:</strong> {contactInfo.fone}</p>
          <p><strong>E-mail:</strong> {contactInfo.email}</p>
          <p><strong>Endereço:</strong> {contactInfo.endereço}</p>
        </div>
        
        <div className={styles.socialMedia}>
          <h2 className={styles.subtitle}>Redes Sociais</h2>
          <a className={styles.link} href={contactInfo.redesSociais.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a className={styles.link} href={contactInfo.redesSociais.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        
        <div className={styles.team}>
          <h2 className={styles.subtitle}>Responsáveis</h2>
          {contactInfo.responsáveis.map((person, index) => (
            <div key={index} className={styles.person}>
              <h3>{person.nome}</h3>
              <p><strong>Cargo:</strong> {person.cargo}</p>
              <p><strong>Telefone:</strong> {person.fone}</p>
              <p><strong>E-mail:</strong> {person.email}</p>
            </div>
          ))}
        </div>
        
        <button
          className={styles.whatsappButton}
          onClick={() => window.open(`https://wa.me/${contactInfo.fone}`, '_blank')}
        >
          Contato via WhatsApp
        </button>
      </div>
    </Layout>
  );
}
