import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv"
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
apiKey.apiKey = process.env.BREVO_API_KEY;;
const senderEmail = process.env.SENDER_EMAIL;

app.post("/send-email", async (req, res) => {
  const { nom, prenom, email, cartItems, totalItems, totalPrice } = req.body;

  if (!nom || !prenom || !email) {
    return res.status(400).json({ success: false, message: "Nom, prénom et email requis." });
  }

  const cartHtml = cartItems.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)} €</td>
      <td>${(item.price * item.quantity).toFixed(2)} €</td>
    </tr>
  `).join("");

  const emailHtml = `
  div style="background:#2e7d32; padding:25px; color:white;">
  <h2 style="margin:0; font-size:22px;">
    Merci pour votre commande,<br>
    ${prenom} ${nom}
  </h2>
</div>
    <h2>Panier :</h2>
    <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>Article</th>
          <th>Quantité</th>
          <th>Prix unitaire</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${cartHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align: right;"><b>Total Articles :</b></td>
          <td><b>${totalItems}</b></td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: right;"><b>Total à payer :</b></td>
          <td><b>${totalPrice.toFixed(2)} €</b></td>
        </tr>
      </tfoot>
    </table>
  `;

  try {
    await apiInstance.sendTransacEmail({
      sender: { name: "Ta Boutique", email: senderEmail },
      to: [{ email, name: prenom }],
      subject: "Votre confirmation et contenu du panier",
      htmlContent: emailHtml
    });

    return res.json({ success: true, message: "Email envoyé avec succès !" });

  } catch (error) {
    console.error("Erreur Brevo :", error.response?.body || error);
    return res.status(500).json({ success: false, error });
  }
});

app.listen(PORT, () => {
  console.log(`API Email OK → http://localhost:${PORT}`);
});
