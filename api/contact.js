import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { name, email, company, type, message, website } = req.body;

    // Anti-spam honeypot: bots fill hidden fields, humans don't.
    if (website) {
      return res.status(200).json({ success: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Adresse email invalide' });
    }

    await resend.emails.send({
      from: 'Les Gawas <contact@lesgawas.com>',
      to: ['contact@lesgawas.com'],
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message via le site</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Entreprise :</strong> ${company || '—'}</p>
        <p><strong>Type de collaboration :</strong> ${type || '—'}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    await resend.emails.send({
      from: 'Les Gawas <contact@lesgawas.com>',
      to: [email],
      subject: 'Votre message a bien été reçu',
      html: `
        <h2>Merci pour votre message ✨</h2>
        <p>Bonjour ${name},</p>
        <p>Nous avons bien reçu votre message et reviendrons vers vous dans les meilleurs délais.</p>
        <p>À bientôt,<br>Les Gawas</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
