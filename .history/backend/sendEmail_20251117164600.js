import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend email OK !");
});

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;

app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, cart } = req.body;

  if (!nom || !prenom || !email) {
    return res.status(400).json({ success: false, message: "Nom, prénom et email requis." });
  }

  console.log("Reçu du frontend :", req.body);

  // Générer le HTML du panier
  let cartHtml = '';
  if (Array.isArray(cart) && cart.length > 0) {
    cartHtml = '<h2>Détails du panier :</h2><ul>';
    cart.forEach(item => {
      cartHtml += `<li>
        <strong>${item.name}</strong> - Quantité: ${item.quantity || 1} - Prix: ${item.price || '0'} €
      </li>`;
    });
    cartHtml += '</ul>';
  } else {
    cartHtml = '<p>Le panier est vide.</p>';
  }

  try {
    const result = await apiInstance.sendTransacEmail({
      sender: { name: "Ta Boutique", email: senderEmail },
      to: [
        { email, name: prenom },
        { email: "koudenoukpoabiola@gmail.com", name: "Client 1" },
        { email: "isbathkdi2000@gmail.com", name: "Client 2" },
      ],
      subject: "Merci pour votre commande",
      htmlContent: `
        <h1>Bonjour ${prenom} ${nom},</h1>
        <p>Merci d'avoir enregistré vos informations.</p>
        ${cartHtml}
        <p>Nous vous contacterons bientôt !</p>
      `
    });

    console.log("Réponse Brevo :", result);
    return res.json({ success: true, message: "Email envoyé avec succès !" });

  } catch (error) {
    console.error("Erreur Brevo :", error.response ? error.response.body : error);
    return res.status(500).json({ success: false, error });
  }
});

app.listen(PORT, () => {
  console.log(`API Email OK → http://localhost:${PORT}`);
});
