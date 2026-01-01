import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()

const app = express()
const PORT = 3001

app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Backend email OK !')
})

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key']
apiKey.apiKey = process.env.BREVO_API_KEY
const senderEmail = process.env.SENDER_EMAIL

if (!process.env.BREVO_API_KEY) {
  console.error('ERREUR : La clé API Brevo (BREVO_API_KEY) est manquante dans le fichier .env')
} else {
  console.log('Clé API Brevo chargée :', process.env.BREVO_API_KEY.substring(0, 10) + '...')
}

app.post('/send-email', (req, res) => {
  const { nom, prenom, email, whatsapp, cartItems, totalPrice } = req.body
  const cart = cartItems || req.body.cart

  if (!nom || !prenom || !email) {
    return res.status(400).json({ success: false, message: 'Nom, prénom et email requis.' })
  }

  console.log('Reçu du frontend :', req.body)

  // 1. Répondre immédiatement au client pour ne pas bloquer l'interface
  res.json({ success: true, message: 'Commande reçue avec succès !' })

  // 2. Préparer et envoyer l'email en arrière-plan
  const itemsHtml =
    cart && cart.length > 0
      ? `
    <h3>Détails de la commande</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background-color: #f8f9fa; text-align: left;">
          <th style="padding: 12px; border-bottom: 2px solid #ddd;">Image</th>
          <th style="padding: 12px; border-bottom: 2px solid #ddd;">Article</th>
          <th style="padding: 12px; border-bottom: 2px solid #ddd;">Quantité</th>
          <th style="padding: 12px; border-bottom: 2px solid #ddd;">Prix Unitaire</th>
          <th style="padding: 12px; border-bottom: 2px solid #ddd;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${cart
          .map(
            (item) => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">
              ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">` : ''}
            </td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.price} FCFA</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.price * item.quantity} FCFA</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" style="padding: 12px; text-align: right; font-weight: bold;">Total Global :</td>
          <td style="padding: 12px; font-weight: bold; color: #da9a90;">${totalPrice} FCFA</td>
        </tr>
      </tfoot>
    </table>
  `
      : '<p>Aucun article dans le panier.</p>'

  apiInstance
    .sendTransacEmail({
      sender: { name: 'Ta Boutique', email: senderEmail },
      to: [{ email, name: prenom }],
      subject: 'Confirmation de votre commande',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1>Bonjour ${prenom} ${nom},</h1>
          <p>Merci pour votre commande. Voici le récapitulatif :</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <strong>Vos coordonnées :</strong><br>
            Email : ${email}<br>
            WhatsApp : ${whatsapp || 'Non renseigné'}
          </div>

          ${itemsHtml}
          <p style="margin-top: 20px;">Nous vous contacterons bientôt sur WhatsApp ou par email pour la livraison !</p>
        </div>
      `
    })
    .then((result) => {
      console.log('Email envoyé avec succès (Brevo) :', result)
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'envoi de l'email (Brevo) :",
        error.response ? error.response.body : error
      )
    })
})

app.listen(PORT, () => {
  console.log(`API Email OK → http://localhost:${PORT}`)
})
